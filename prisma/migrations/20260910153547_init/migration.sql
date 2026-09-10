-- CreateEnum
CREATE TYPE "OnboardingState" AS ENUM ('NOT_STARTED', 'FRAMEWORK_VIEWED', 'PRIORITIES_SET', 'JOURNEY_CREATED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('ESSENTIAL', 'IMPORTANT', 'FLEXIBLE', 'UNSURE');

-- CreateEnum
CREATE TYPE "JourneyStage" AS ENUM ('GETTING_TO_KNOW', 'SERIOUSLY_CONSIDERING', 'DECIDED_TO_MARRY', 'WEDDING_PREPARATION', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "GunaState" AS ENUM ('NOT_EXPLORED', 'TAKING_SHAPE', 'UNDERSTOOD', 'ALIGNED', 'DIFFERENT_BUT_OKAY', 'WORTH_DISCUSSING', 'IMPORTANT_UNRESOLVED');

-- CreateEnum
CREATE TYPE "ConfidenceLevel" AS ENUM ('GUESSING', 'SOME_SENSE', 'PRETTY_SURE', 'CLEAR');

-- CreateEnum
CREATE TYPE "PerspectiveType" AS ENUM ('MY_VIEW', 'MY_UNDERSTANDING_OF_THEM', 'THEIR_VIEW', 'SHARED_UNDERSTANDING');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "ConcernSeverity" AS ENUM ('EXPLORE', 'IMPORTANT', 'SERIOUS', 'SAFETY');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "SensitivityLevel" AS ENUM ('STANDARD', 'SENSITIVE', 'INTIMATE');

-- CreateEnum
CREATE TYPE "ConcernStatus" AS ENUM ('ACTIVE', 'DISMISSED', 'RESOLVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "timezone" TEXT DEFAULT 'Asia/Kolkata',
    "locale" TEXT DEFAULT 'en-IN',
    "onboardingState" "OnboardingState" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredName" TEXT,
    "broadLifeContext" TEXT,
    "relationshipStatus" TEXT,
    "profileVisibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_versions" (
    "id" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "retiredAt" TIMESTAMP(3),

    CONSTRAINT "framework_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kootas" (
    "id" TEXT NOT NULL,
    "frameworkVersionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "traditionalPointValue" INTEGER NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "modernDescription" TEXT NOT NULL,
    "wasReframe" TEXT,
    "nowReframe" TEXT,

    CONSTRAINT "kootas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gunas" (
    "id" TEXT NOT NULL,
    "kootaId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "guidanceText" TEXT,
    "sensitivityLevel" "SensitivityLevel" NOT NULL DEFAULT 'STANDARD',
    "orderIndex" INTEGER NOT NULL,
    "wasReframe" TEXT,
    "nowReframe" TEXT,

    CONSTRAINT "gunas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_guna_priorities" (
    "userId" TEXT NOT NULL,
    "gunaId" TEXT NOT NULL,
    "importance" "Importance" NOT NULL,
    "personalNote" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_guna_priorities_pkey" PRIMARY KEY ("userId","gunaId")
);

-- CreateTable
CREATE TABLE "journeys" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "partnerUserId" TEXT,
    "partnerDisplayName" TEXT NOT NULL,
    "sourceType" TEXT,
    "stage" "JourneyStage" NOT NULL DEFAULT 'GETTING_TO_KNOW',
    "decisionMadeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journey_guna_states" (
    "journeyId" TEXT NOT NULL,
    "gunaId" TEXT NOT NULL,
    "state" "GunaState" NOT NULL DEFAULT 'NOT_EXPLORED',
    "userConfidence" "ConfidenceLevel",
    "aiSummary" TEXT,
    "lastReflectedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journey_guna_states_pkey" PRIMARY KEY ("journeyId","gunaId")
);

-- CreateTable
CREATE TABLE "person_perspectives" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "gunaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "perspectiveType" "PerspectiveType" NOT NULL,
    "positionText" TEXT NOT NULL,
    "importance" "Importance",
    "confidence" "ConfidenceLevel",
    "source" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_perspectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflections" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "authorUserId" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "interactionDate" TIMESTAMP(3),
    "interactionType" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reflections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflection_analyses" (
    "id" TEXT NOT NULL,
    "reflectionId" TEXT NOT NULL,
    "frameworkVersionId" TEXT NOT NULL,
    "detectedGunaJson" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "clearerPointsJson" JSONB NOT NULL,
    "emergingPointsJson" JSONB NOT NULL,
    "differencesJson" JSONB NOT NULL,
    "selfDiscoveriesJson" JSONB NOT NULL,
    "areasWorthExploringJson" JSONB NOT NULL,
    "concernsJson" JSONB NOT NULL,
    "isMockAnalysis" BOOLEAN NOT NULL DEFAULT false,
    "modelMetadataJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reflection_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_invitations" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "inviterUserId" TEXT NOT NULL,
    "inviteeEmail" TEXT NOT NULL,
    "invitationTokenHash" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_items" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "targetUserId" TEXT,
    "objectType" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'SHARED',
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "shared_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vows" (
    "id" TEXT NOT NULL,
    "frameworkVersionId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "guidanceJson" JSONB NOT NULL,
    "connectedGunaNumbersJson" JSONB NOT NULL,
    "wasReframe" TEXT,
    "nowReframe" TEXT,

    CONSTRAINT "vows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vow_reflections" (
    "id" TEXT NOT NULL,
    "vowId" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "authorUserId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vow_reflections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concern_flags" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "reflectionId" TEXT,
    "reflectionAnalysisId" TEXT,
    "category" TEXT NOT NULL,
    "severity" "ConcernSeverity" NOT NULL,
    "text" TEXT NOT NULL,
    "status" "ConcernStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "concern_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "detailsJson" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "framework_versions_versionNumber_key" ON "framework_versions"("versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "kootas_slug_key" ON "kootas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "gunas_number_key" ON "gunas"("number");

-- CreateIndex
CREATE UNIQUE INDEX "gunas_slug_key" ON "gunas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "partner_invitations_invitationTokenHash_key" ON "partner_invitations"("invitationTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "vows_orderIndex_key" ON "vows"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "vows_slug_key" ON "vows"("slug");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kootas" ADD CONSTRAINT "kootas_frameworkVersionId_fkey" FOREIGN KEY ("frameworkVersionId") REFERENCES "framework_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gunas" ADD CONSTRAINT "gunas_kootaId_fkey" FOREIGN KEY ("kootaId") REFERENCES "kootas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_guna_priorities" ADD CONSTRAINT "user_guna_priorities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_guna_priorities" ADD CONSTRAINT "user_guna_priorities_gunaId_fkey" FOREIGN KEY ("gunaId") REFERENCES "gunas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journeys" ADD CONSTRAINT "journeys_partnerUserId_fkey" FOREIGN KEY ("partnerUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_guna_states" ADD CONSTRAINT "journey_guna_states_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journey_guna_states" ADD CONSTRAINT "journey_guna_states_gunaId_fkey" FOREIGN KEY ("gunaId") REFERENCES "gunas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_perspectives" ADD CONSTRAINT "person_perspectives_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_perspectives" ADD CONSTRAINT "person_perspectives_gunaId_fkey" FOREIGN KEY ("gunaId") REFERENCES "gunas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person_perspectives" ADD CONSTRAINT "person_perspectives_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflections" ADD CONSTRAINT "reflections_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflection_analyses" ADD CONSTRAINT "reflection_analyses_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "reflections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflection_analyses" ADD CONSTRAINT "reflection_analyses_frameworkVersionId_fkey" FOREIGN KEY ("frameworkVersionId") REFERENCES "framework_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_invitations" ADD CONSTRAINT "partner_invitations_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_invitations" ADD CONSTRAINT "partner_invitations_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_items" ADD CONSTRAINT "shared_items_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_items" ADD CONSTRAINT "shared_items_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_items" ADD CONSTRAINT "shared_items_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vows" ADD CONSTRAINT "vows_frameworkVersionId_fkey" FOREIGN KEY ("frameworkVersionId") REFERENCES "framework_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vow_reflections" ADD CONSTRAINT "vow_reflections_vowId_fkey" FOREIGN KEY ("vowId") REFERENCES "vows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vow_reflections" ADD CONSTRAINT "vow_reflections_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vow_reflections" ADD CONSTRAINT "vow_reflections_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concern_flags" ADD CONSTRAINT "concern_flags_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concern_flags" ADD CONSTRAINT "concern_flags_reflectionId_fkey" FOREIGN KEY ("reflectionId") REFERENCES "reflections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concern_flags" ADD CONSTRAINT "concern_flags_reflectionAnalysisId_fkey" FOREIGN KEY ("reflectionAnalysisId") REFERENCES "reflection_analyses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
