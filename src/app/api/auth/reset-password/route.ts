import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const resetRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If body contains token and password, execute reset
    if (body.token && body.password) {
      const parsed = resetPasswordSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
      }

      const verificationToken = await db.verificationToken.findUnique({
        where: { token: parsed.data.token },
      });

      if (!verificationToken || verificationToken.expires < new Date()) {
        return NextResponse.json({ error: 'Invalid or expired password reset link.' }, { status: 400 });
      }

      const passwordHash = await bcrypt.hash(parsed.data.password, 10);

      await db.user.update({
        where: { email: verificationToken.identifier },
        data: { passwordHash },
      });

      await db.verificationToken.delete({
        where: { token: parsed.data.token },
      });

      return NextResponse.json({ message: 'Password updated successfully. You can now sign in.' });
    }

    // Otherwise, request reset link
    const parsed = resetRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await db.user.findUnique({ where: { email } });

    // Always respond with success to prevent user enumeration
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link has been created.',
      });
    }

    const resetToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await db.verificationToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires,
      },
    });

    // Mock link for dev/testing
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    console.log(`[DEV MODE] Password reset URL for ${email}: ${resetUrl}`);

    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been created.',
      devResetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
