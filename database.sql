
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- create a database called "100ym-ideal-week"

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT false
);

CREATE TABLE "question" (
    "id" SERIAL PRIMARY KEY,
    "category_id" INT REFERENCES "category",
    "question_text" VARCHAR (1000)
);

CREATE TABLE "answer" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "question_id" INT REFERENCES "question",
    "response" VARCHAR (1000)
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100)
);

CREATE TABLE "priority" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "category_id" INT REFERENCES "category",
    "rank" INT
);

CREATE TABLE "ideal_week" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "day" VARCHAR (20),
    "start_time" time (6),
    "end_time" time (6),
    "category_id" INT REFERENCES "category"
);