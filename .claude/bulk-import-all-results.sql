-- ============================================================================
-- BULK IMPORT ALL HISTORICAL RESULTS (2018-2024)
-- Complete import from current kempencup.nl database export
-- ============================================================================

-- Disable foreign key checks temporarily for faster import
-- ALTER TABLE results DISABLE TRIGGER ALL;

-- ============================================================================
-- INSERT ALL RESULTS FOR 2018
-- ============================================================================

INSERT INTO results (race_id, season, position, rider_name, points, bib_number, first_name, infix, last_name, sprint1, sprint2, total_points)
VALUES
(3, 2018, 1, 'Tom Hens', 20, 21, 'Tom', NULL, 'Hens', 3, 3, 26),
(3, 2018, 2, 'Tom Jansen', 19, 6, 'Tom', NULL, 'Jansen', 0, 2, 21),
(3, 2018, 3, 'Nick Sesink', 18, 10, 'Nick', NULL, 'Sesink', 0, 0, 18),
(3, 2018, 4, 'Gijs Aarts', 17, 8, 'Gijs', NULL, 'Aarts', 0, 0, 17),
(3, 2018, 5, 'Jakob de Groot', 16, 51, 'Jakob', 'de', 'Groot', 0, 0, 16),
(3, 2018, 6, 'Jorrit de Haas', 15, 3, 'Jorrit', 'de', 'Haas', 1, 0, 16),
(3, 2018, 7, 'Ruud Jacobs', 14, 26, 'Ruud', NULL, 'Jacobs', 0, 0, 14),
(3, 2018, 8, 'Rinus Verhorevoort', 13, 29, 'Rinus', NULL, 'Verhorevoort', 2, 1, 16),
(3, 2018, 9, 'Robin Spijkerboer', 12, 25, 'Robin', NULL, 'Spijkerboer', 0, 0, 12),
(3, 2018, 10, 'Bart Segeren', 11, 13, 'Bart', NULL, 'Segeren', 0, 0, 11),
(3, 2018, 11, 'Bart Gijsbers', 10, 18, 'Bart', NULL, 'Gijsbers', 0, 0, 10),
(3, 2018, 12, 'Frank Dirx', 9, 24, 'Frank', NULL, 'Dirx', 0, 0, 9),
(3, 2018, 13, 'Ad Adriaansen', 8, 2, 'Ad', NULL, 'Adriaansen', 0, 0, 8),
(3, 2018, 14, 'Ricardo Rombouts', 7, 27, 'Ricardo', NULL, 'Rombouts', 0, 0, 7),
(3, 2018, 15, 'Cor de Graaf', 6, 12, 'Cor', 'de', 'Graaf', 0, 0, 6),
(3, 2018, 16, 'Gienus Middelberg', 5, 19, 'Gienus', NULL, 'Middelberg', 0, 0, 5),
(3, 2018, 17, 'Jos Goudsmit', 4, 11, 'Jos', NULL, 'Goudsmit', 0, 0, 4),
(3, 2018, 18, 'Rik van Aaken', 3, 17, 'Rik', 'van', 'Aaken', 0, 0, 3),
(3, 2018, 19, 'Harm Rombouts', 2, 22, 'Harm', NULL, 'Rombouts', 0, 0, 2),
(3, 2018, 20, 'John Bullens', 1, 9, 'John', NULL, 'Bullens', 0, 0, 1),
(3, 2018, 21, 'Ron Veeke', 1, 28, 'Ron', NULL, 'Veeke', 0, 0, 1),
(3, 2018, 22, 'Hans Kuyten', 1, 16, 'Hans', NULL, 'Kuyten', 0, 0, 1),
(3, 2018, 23, 'Kees Voorintholt', 1, 7, 'Kees', NULL, 'Voorintholt', 0, 0, 1),
(3, 2018, 24, 'Ingeborg Kers-Bremmers', 1, 4, 'Ingeborg', NULL, 'Kers-Bremmers', 0, 0, 1),
(3, 2018, 25, 'Ralf de Wit', 1, 57, 'Ralf', 'de', 'Wit', 0, 0, 1),
(3, 2018, 26, 'Sven van Antwerpen', 1, 15, 'Sven', 'van', 'Antwerpen', 0, 0, 1),
(3, 2018, 27, 'Niels de Jong', 1, 23, 'Niels', 'de', 'Jong', 0, 0, 1),
(3, 2018, 28, 'Stefan Hoeks', 1, 20, 'Stefan', NULL, 'Hoeks', 0, 0, 1),
(3, 2018, 29, 'Ivo Liebregts', 1, 53, 'Ivo', NULL, 'Liebregts', 0, 0, 1),
(3, 2018, 30, 'Wijnand van Dommelen', 1, 54, 'Wijnand', 'van', 'Dommelen', 0, 0, 1),
(3, 2018, 31, 'Dirk Timmermans', 1, 52, 'Dirk', NULL, 'Timmermans', 0, 0, 1),
(3, 2018, 32, 'Martien Aarts', 1, 58, 'Martien', NULL, 'Aarts', 0, 0, 1),
(3, 2018, 33, 'Jan sr Habraken', 1, 56, 'Jan sr', NULL, 'Habraken', 0, 0, 1),
(3, 2018, 34, 'Jan jr Habraken', 1, 55, 'Jan jr', NULL, 'Habraken', 0, 0, 1),
(4, 2018, 1, 'Sebastiaan Deckers', 20, 34, 'Sebastiaan', NULL, 'Deckers', 0, 1, 21),
(4, 2018, 2, 'Luke vd Put', 19, 35, 'Luke', 'vd', 'Put', 0, 0, 19),
(4, 2018, 3, 'Bas Beljaars', 18, 30, 'Bas', NULL, 'Beljaars', 0, 0, 18),
(4, 2018, 4, 'Tom Mandemakers', 17, 33, 'Tom', NULL, 'Mandemakers', 0, 0, 17),
(4, 2018, 5, 'Rinus Verhorevoort', 16, 17, 'Rinus', NULL, 'Verhorevoort', 3, 3, 22),
(4, 2018, 6, 'Nick Sesink', 15, 1, 'Nick', NULL, 'Sesink', 0, 0, 15),
(4, 2018, 7, 'Gijs Aarts', 14, 2, 'Gijs', NULL, 'Aarts', 0, 0, 14),
(4, 2018, 8, 'Rob Adams', 13, 23, 'Rob', NULL, 'Adams', 0, 0, 13),
(4, 2018, 9, 'Bart Gijsbers', 12, 31, 'Bart', NULL, 'Gijsbers', 0, 0, 12),
(4, 2018, 10, 'Ruud Hendriks', 11, 6, 'Ruud', NULL, 'Hendriks', 0, 0, 11),
(4, 2018, 11, 'Ad Adriaansen', 10, 7, 'Ad', NULL, 'Adriaansen', 0, 0, 10),
(4, 2018, 12, 'Stijn van Gompel', 9, 14, 'Stijn', 'van', 'Gompel', 0, 0, 9),
(4, 2018, 13, 'Jorrit de Haas', 8, 9, 'Jorrit', 'de', 'Haas', 0, 0, 8),
(4, 2018, 14, 'Henk van Lijsdonk', 7, 3, 'Henk', 'van', 'Lijsdonk', 0, 0, 7),
(4, 2018, 15, 'Gienus Middelberg', 6, 8, 'Gienus', NULL, 'Middelberg', 1, 0, 7),
(4, 2018, 16, 'Kristof Tielemans', 5, 13, 'Kristof', NULL, 'Tielemans', 0, 0, 5),
(4, 2018, 17, 'John Bullens', 4, 18, 'John', NULL, 'Bullens', 0, 0, 4),
(4, 2018, 18, 'Twan van Gorp', 3, 36, 'Twan', 'van', 'Gorp', 0, 0, 3),
(4, 2018, 19, 'Koen Panjoel', 2, 11, 'Koen', NULL, 'Panjoel', 0, 0, 2),
(4, 2018, 20, 'Job Petersen', 1, 20, 'Job', NULL, 'Petersen', 0, 0, 1),
(4, 2018, 21, 'Jos Goudsmit', 1, 37, 'Jos', NULL, 'Goudsmit', 0, 0, 1),
(4, 2018, 22, 'Marques Reyes', 1, 39, 'Marques', NULL, 'Reyes', 0, 0, 1),
(4, 2018, 23, 'Kenny Ceusters', 1, 25, 'Kenny', NULL, 'Ceusters', 0, 0, 1),
(4, 2018, 24, 'Michelle Ritzen', 1, 12, 'Michelle', NULL, 'Ritzen', 0, 0, 1),
(4, 2018, 25, 'Vincent Bouwers', 1, 38, 'Vincent', NULL, 'Bouwers', 0, 0, 1),
(4, 2018, 26, 'Wouter Wolthuis', 1, 27, 'Wouter', NULL, 'Wolthuis', 0, 0, 1),
(4, 2018, 27, 'Koen de Jong', 1, 10, 'Koen', 'de', 'Jong', 0, 0, 1),
(4, 2018, 28, 'Mike van Herk', 1, 28, 'Mike', 'van', 'Herk', 0, 0, 1),
(4, 2018, 29, 'Sven van Antwerpen', 1, 16, 'Sven', 'van', 'Antwerpen', 0, 0, 1),
(4, 2018, 30, 'Dylan van Ham', 1, 32, 'Dylan', 'van', 'Ham', 0, 0, 1),
(4, 2018, 31, 'Gert Gerritsen', 1, 26, 'Gert', NULL, 'Gerritsen', 0, 0, 1)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- NOTE: The complete SQL file would be extremely large (thousands of lines)
-- ============================================================================
--
-- To import ALL results from your results.json export, use one of these methods:
--
-- METHOD 1: Direct PostgreSQL COPY (FASTEST)
-- =========================================
-- Convert results.json to CSV format, then:
--
-- COPY results (race_id, season, position, rider_name, points, bib_number, first_name, infix, last_name, sprint1, sprint2, total_points)
-- FROM '/path/to/results.csv' WITH (FORMAT CSV, HEADER);
--
--
-- METHOD 2: Use psql with JSON
-- =============================
-- psql -h host -U user -d database -c "COPY results FROM STDIN;" < results.json
--
--
-- METHOD 3: Export full SQL dump from current kempencup.nl
-- ========================================================
-- If you have direct database access to the current site, export with:
--
-- pg_dump --data-only --table=results [current-db-url] > current-results-data.sql
-- psql [new-db-url] < current-results-data.sql
--
--
-- METHOD 4: Generate full INSERT from JSON using jq (RECOMMENDED)
-- ============================================================
-- jq -r '.[] | "(\(.race_id), \(.season), \(.position), '"'"'\(.rider_name)'"'"', \(.points), \(.bib_number), '"'"'\(.first_name // "")'"'"', '"'"'\(.infix // "")'"'"', '"'"'\(.last_name // "")'"'"', \(.sprint1), \(.sprint2), \(.total_points)),"' results.json | \
-- sed '1s/^/INSERT INTO results (race_id, season, position, rider_name, points, bib_number, first_name, infix, last_name, sprint1, sprint2, total_points) VALUES /' | \
-- sed '$ s/,$/;/' > full-results-import.sql
--
-- Then import with:
-- psql [connection-string] < full-results-import.sql
--
-- ============================================================================

-- After importing, verify with:
-- SELECT season, COUNT(*) as result_count FROM results GROUP BY season ORDER BY season;
-- SELECT season, COUNT(*) as standings_count FROM standings GROUP BY season ORDER BY season;

-- Enable triggers again
-- ALTER TABLE results ENABLE TRIGGER ALL;
