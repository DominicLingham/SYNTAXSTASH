CREATE TABLE "resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"content" text,
	"url" text,
	"icon" text NOT NULL,
	"isExternal" boolean NOT NULL,
	"isFavourite" boolean DEFAULT false NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"createdAt" integer NOT NULL,
	"updatedAt" integer NOT NULL,
	CONSTRAINT "resource_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "resourceTag" (
	"resourceId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	"createdAt" integer NOT NULL,
	CONSTRAINT "resourceTag_resourceId_tagId_pk" PRIMARY KEY("resourceId","tagId")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "resourceTag" ADD CONSTRAINT "resourceTag_resourceId_resource_id_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."resource"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resourceTag" ADD CONSTRAINT "resourceTag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;