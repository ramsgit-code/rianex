-- Enable Row-Level Security on all tables
-- Prisma (postgres role) bypasses RLS, so this only blocks public Supabase REST API access

ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LeadSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PageView" ENABLE ROW LEVEL SECURITY;
