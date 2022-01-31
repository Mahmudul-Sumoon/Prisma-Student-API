/*
  Warnings:

  - Added the required column `teacherId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roll" INTEGER NOT NULL,
    "reg" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("id", "name", "reg", "roll") SELECT "id", "name", "reg", "roll" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_roll_key" ON "Student"("roll");
CREATE UNIQUE INDEX "Student_reg_key" ON "Student"("reg");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
