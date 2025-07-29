CREATE TABLE "diary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"userId" text NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diaryEntry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" jsonb,
	"diaryId" uuid NOT NULL,
	"createdAt" integer NOT NULL,
	"updatedAt" integer NOT NULL,
	"deletedAt" integer
);
--> statement-breakpoint
ALTER TABLE "diary" ADD CONSTRAINT "diary_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diaryEntry" ADD CONSTRAINT "diaryEntry_diaryId_diary_id_fk" FOREIGN KEY ("diaryId") REFERENCES "public"."diary"("id") ON DELETE no action ON UPDATE no action;