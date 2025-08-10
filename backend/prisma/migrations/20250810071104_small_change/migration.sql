/*
  Warnings:

  - You are about to drop the column `diificulty` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `dificulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "diificulty",
ADD COLUMN     "dificulty" "Difficulty" NOT NULL,
ALTER COLUMN "hints" DROP NOT NULL;
