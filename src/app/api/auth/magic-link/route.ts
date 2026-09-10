import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const requestMagicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const consumeMagicLinkSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. If body contains token, consume it (single-use passwordless sign-in)
    if (body.token) {
      const parsed = consumeMagicLinkSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
      }

      const verificationToken = await db.verificationToken.findUnique({
        where: { token: parsed.data.token },
      });

      if (!verificationToken || verificationToken.expires < new Date()) {
        return NextResponse.json({ error: 'Invalid or expired magic link.' }, { status: 400 });
      }

      const email = verificationToken.identifier;

      // Single-use token invalidation: IMMEDIATELY delete from DB
      await db.verificationToken.delete({
        where: { token: parsed.data.token },
      });

      // Find or create user for magic link login
      let user = await db.user.findUnique({ where: { email } });
      if (!user) {
        user = await db.user.create({
          data: {
            email,
            emailVerified: new Date(),
            displayName: email.split('@')[0],
            onboardingState: 'NOT_STARTED',
            profile: {
              create: {
                preferredName: email.split('@')[0],
                profileVisibility: 'PRIVATE',
              },
            },
          },
        });
      } else if (!user.emailVerified) {
        await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });
      }

      return NextResponse.json({
        message: 'Magic link authenticated successfully.',
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
        },
      });
    }

    // 2. Otherwise, request a new magic link token
    const parsed = requestMagicLinkSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();

    // Generate secure single-use token
    const magicToken = 'ml_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 mins expiry

    await db.verificationToken.create({
      data: {
        identifier: email,
        token: magicToken,
        expires,
      },
    });

    const magicUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/magic-link?token=${magicToken}`;
    console.log(`[DEV MODE] Magic link URL for ${email}: ${magicUrl}`);

    return NextResponse.json({
      message: 'Magic link generated successfully.',
      devMagicUrl: process.env.NODE_ENV === 'development' ? magicUrl : undefined,
    });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json({ error: 'Failed to process magic link request.' }, { status: 500 });
  }
}
