CREATE TABLE "test_answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attempt_id" uuid NOT NULL,
	"question_id" text NOT NULL,
	"answer" text,
	"is_correct" boolean,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "test_attempt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"test_slug" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"duration_ms" integer,
	"score" integer,
	"max_score" integer,
	"meta" jsonb
);

ALTER TABLE "test_answer" ADD CONSTRAINT "test_answer_attempt_id_test_attempt_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."test_attempt"("id") ON DELETE cascade ON UPDATE no action;