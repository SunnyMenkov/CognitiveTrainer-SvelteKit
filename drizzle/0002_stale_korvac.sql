ALTER TABLE "test_answer" ADD COLUMN "reaction_time_ms" integer;
ALTER TABLE "test_answer" ADD COLUMN "meta" jsonb;
ALTER TABLE "test_attempt" ADD COLUMN "normalized_score" integer;