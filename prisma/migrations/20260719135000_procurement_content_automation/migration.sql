-- Generated from the Task 2 pre-sync backup with Prisma migrate diff.
-- Prisma's SQLite table-redefinition blocks were normalized to additive
-- ALTER TABLE statements using the column definitions in that generated diff.

BEGIN TRANSACTION;

-- AlterTable
ALTER TABLE "News" ADD COLUMN "generatedBy" TEXT;
ALTER TABLE "News" ADD COLUMN "sourceDate" TEXT;
ALTER TABLE "News" ADD COLUMN "sourceFingerprint" TEXT;
ALTER TABLE "News" ADD COLUMN "sourceTitle" TEXT;
ALTER TABLE "News" ADD COLUMN "sourceUrl" TEXT;

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN "company" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "destinationPort" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "quantity" INTEGER;
ALTER TABLE "Inquiry" ADD COLUMN "useCase" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "configuration" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "selectionPayload" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Inquiry" ADD COLUMN "consent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Part" ADD COLUMN "compatibleModels" TEXT NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "normalizedSpecs" TEXT NOT NULL DEFAULT '{}';
ALTER TABLE "Product" ADD COLUMN "applicationTags" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Product" ADD COLUMN "marketTags" TEXT NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "NewsSource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL DEFAULT 'rss',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "pollIntervalMinutes" INTEGER NOT NULL DEFAULT 360,
    "dailyLimit" INTEGER NOT NULL DEFAULT 3,
    "allowImages" BOOLEAN NOT NULL DEFAULT false,
    "defaultCategory" TEXT,
    "defaultTags" TEXT NOT NULL DEFAULT '[]',
    "lastCursor" TEXT,
    "lastPolledAt" DATETIME,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContentJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT,
    "sourceUrl" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "sourceTitle" TEXT,
    "sourceDate" TEXT,
    "extractedFacts" TEXT NOT NULL DEFAULT '[]',
    "generatedPayload" TEXT,
    "errorStage" TEXT,
    "errorMessage" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "newsId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME,
    CONSTRAINT "ContentJob_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "NewsSource" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ContentJob_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsRevision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "newsId" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NewsRevision_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentJob_sourceUrl_key" ON "ContentJob"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ContentJob_fingerprint_key" ON "ContentJob"("fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "News_sourceUrl_key" ON "News"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "News_sourceFingerprint_key" ON "News"("sourceFingerprint");

COMMIT;
