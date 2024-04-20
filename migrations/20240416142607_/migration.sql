-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgotPasswordString" DROP NOT NULL,
ALTER COLUMN "forgotPasswordExpiration" DROP NOT NULL,
ALTER COLUMN "verifyTokenString" DROP NOT NULL,
ALTER COLUMN "verifyTokenExpiration" DROP NOT NULL;

-- CreateTable
CREATE TABLE "university" (
    "id" SERIAL NOT NULL,
    "college_name" VARCHAR(255),
    "is_private" VARCHAR(3),
    "num_apps" INTEGER,
    "num_accepted" INTEGER,
    "num_enrolled" INTEGER,
    "top10perc" INTEGER,
    "top25perc" INTEGER,
    "num_full_time_undergrad" INTEGER,
    "num_part_time_undergrad" INTEGER,
    "out_state_cost" INTEGER,
    "room_board_cost" INTEGER,
    "books_cost" INTEGER,
    "personal_cost" INTEGER,
    "phd_percentage" INTEGER,
    "terminal_percentage" INTEGER,
    "student_faculty_ratio" DOUBLE PRECISION,
    "alumni_percentage" INTEGER,
    "expenditure" INTEGER,
    "grad_rate" INTEGER,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);
