ALTER TABLE "diary" ALTER COLUMN "createdAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "diary" ALTER COLUMN "updatedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "diary" ALTER COLUMN "deletedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "diaryEntry" ALTER COLUMN "createdAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "diaryEntry" ALTER COLUMN "updatedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "diaryEntry" ALTER COLUMN "deletedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "resource" ALTER COLUMN "createdAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "resource" ALTER COLUMN "updatedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "resource" ALTER COLUMN "deletedAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "resourceTag" ALTER COLUMN "createdAt" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "tag" ALTER COLUMN "createdAt" SET DATA TYPE bigint;