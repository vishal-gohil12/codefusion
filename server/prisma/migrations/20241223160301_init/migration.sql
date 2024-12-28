/*
  Warnings:

  - Added the required column `projectLanguage` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectLanguage" TEXT NOT NULL;
