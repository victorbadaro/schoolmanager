DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  avatar_url TEXT NOT NULL,
  name TEXT NOT NULL,
  birth_date TIMESTAMP NOT NULL,
  education_level TEXT NOT NULL,
  class_type TEXT NOT NULL,
  subjects_taught TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT (NOW())
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  birth_date TIMESTAMP,
  email TEXT,
  school_year TEXT,
  hours_by_week INT,
  teacher_id INT REFERENCES teachers(id)
);
