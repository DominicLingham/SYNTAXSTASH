ALTER TABLE "resource" ALTER COLUMN "content" SET DATA TYPE jsonb USING content::jsonb;--> statement-breakpoint
ALTER TABLE "diary" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "diary" ADD COLUMN "createdAt" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "diary" ADD COLUMN "updatedAt" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "diary" ADD COLUMN "deletedAt" integer;--> statement-breakpoint
ALTER TABLE "resource" ADD COLUMN "deletedAt" integer;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_tag_name" ON "tag" USING btree ("userId","name");--> statement-breakpoint
ALTER TABLE "diary" ADD CONSTRAINT "diary_userId_unique" UNIQUE("userId");