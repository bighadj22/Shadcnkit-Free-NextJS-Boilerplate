-- Disable foreign key constraint checks
PRAGMA foreign_keys = OFF;

-- Drop all tables 

DROP TABLE IF EXISTS users;

-- Re-enable foreign key constraint checks
PRAGMA foreign_keys = ON;

-- Create tables
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT,
  createdAt NUMERIC DEFAULT CURRENT_TIMESTAMP,
  role TEXT DEFAULT 'Demo admin'
);


-- Insert seed data
INSERT INTO users (id, email, role)
VALUES ('m94yswhs17ke', 'srogjegdh@gmail.com', 'admin');

