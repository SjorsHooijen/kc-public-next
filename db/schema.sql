CREATE TABLE races (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  start_time VARCHAR(10),
  distance_km INTEGER,
  season INTEGER NOT NULL,
  is_finale BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'upcoming'
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  race_id INTEGER REFERENCES races(id),
  season INTEGER NOT NULL,
  position INTEGER NOT NULL,       -- uitslag / eindklassering in de koers
  rugnr INTEGER,                   -- rugnummer
  voornaam VARCHAR(100),
  tussenaam VARCHAR(50),           -- tussenvoegsel (van, de, van der, …)
  achternaam VARCHAR(100),
  rider_name VARCHAR(255),         -- legacy full-name veld
  finish_time VARCHAR(20),
  kc_punten INTEGER,               -- punten voor het KempenCup-klassement
  sprint1 INTEGER,                 -- bonuspunten sprint 1
  sprint2 INTEGER,                 -- bonuspunten sprint 2
  totaal INTEGER,                  -- kc_punten + sprint1 + sprint2
  points INTEGER                   -- legacy punten veld
);

CREATE TABLE standings (
  id SERIAL PRIMARY KEY,
  season INTEGER NOT NULL,
  position INTEGER NOT NULL,
  rider_name VARCHAR(255) NOT NULL,
  total_points INTEGER NOT NULL,
  races_entered INTEGER NOT NULL
);

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  content TEXT,
  image_url VARCHAR(500),
  published_at TIMESTAMP DEFAULT NOW()
);
