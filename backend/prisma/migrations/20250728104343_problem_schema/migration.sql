-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diificulty" "Difficulty" NOT NULL,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "constraints" TEXT NOT NULL,
    "hints" TEXT NOT NULL,
    "editorail" TEXT,
    "testcases" JSONB NOT NULL,
    "codeSnippets" JSONB NOT NULL,
    "refereanceSolutions" JSONB NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
