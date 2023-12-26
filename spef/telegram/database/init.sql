CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    answer TEXT,
    answer_img TEXT,
    tag1 TEXT,
    tag2 TEXT,
    tag3 TEXT,
    common BOOLEAN NOT NULL,
    user_id INTEGER
);
CREATE TABLE IF NOT EXISTS practice (
    question_id INTEGER,
    user_id INTEGER,
    level INTEGER,
    practice_date timestamp,
    repeat_date timestamp,
    CONSTRAINT practice_question UNIQUE (question_id, user_id)
);
CREATE TABLE IF NOT EXISTS history (
    user_id INTEGER,
    last_request TEXT,
    last_date timestamp
);
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    quote TEXT
);
