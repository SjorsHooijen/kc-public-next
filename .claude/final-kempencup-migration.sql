-- ============================================================================
-- KEMPENCUP FINAL DATA MIGRATION
-- Complete sync with current kempencup.nl website
-- Includes: Race properties, start times, and historical results (2018-2024)
-- ============================================================================

-- ============================================================================
-- SECTION 1: ADD MISSING RACE PROPERTIES COLUMNS TO RACES TABLE
-- ============================================================================

ALTER TABLE races ADD COLUMN IF NOT EXISTS number_of_rounds INTEGER;
ALTER TABLE races ADD COLUMN IF NOT EXISTS length_per_round DECIMAL(5,2);

-- ============================================================================
-- SECTION 2: UPDATE RACE PROPERTIES WITH DATA FROM KEMPENCUP.NL
-- ============================================================================

-- VELDHOVEN: 1.4 km × 28 = 39.2 km
UPDATE races
SET length_per_round = 1.4, number_of_rounds = 28
WHERE LOWER(name) LIKE '%veldhoven%';

-- WESTERHOVEN: 1.5 km × varies by class (use 20 as standard)
UPDATE races
SET length_per_round = 1.5, number_of_rounds = 20
WHERE LOWER(name) LIKE '%westerhoven%';

-- RIETHOVEN: 2.7 km × 15 = 40.5 km
UPDATE races
SET length_per_round = 2.7, number_of_rounds = 15
WHERE LOWER(name) LIKE '%riethoven%';

-- LUYKSGESTEL: 2.0 km × 18 = 36 km
UPDATE races
SET length_per_round = 2.0, number_of_rounds = 18
WHERE LOWER(name) LIKE '%luyksgestel%';

-- GELDROP: 1.9 km × ? (data incomplete - verify from website)
UPDATE races
SET length_per_round = 1.9, number_of_rounds = NULL
WHERE LOWER(name) LIKE '%geldrop%';

-- BLADEL: 4.1 km × 10 = 41 km
UPDATE races
SET length_per_round = 4.1, number_of_rounds = 10
WHERE LOWER(name) LIKE '%bladel%';

-- BERGEIJK: Data incomplete - needs website verification
-- UPDATE races SET length_per_round = ?, number_of_rounds = ? WHERE LOWER(name) LIKE '%bergeijk%';

-- DUIZEL: Data incomplete - needs website verification
-- UPDATE races SET length_per_round = ?, number_of_rounds = ? WHERE LOWER(name) LIKE '%duizel%';

-- STEENSEL: 1.6 km × 25 = 40 km
UPDATE races
SET length_per_round = 1.6, number_of_rounds = 25
WHERE LOWER(name) LIKE '%steensel%';

-- WEEBOSCH: 0.9 km × 54 = 48.6 km
UPDATE races
SET length_per_round = 0.9, number_of_rounds = 54
WHERE LOWER(name) LIKE '%weebosch%';

-- HAPERT: 2.7 km × 15 = 40.5 km
UPDATE races
SET length_per_round = 2.7, number_of_rounds = 15
WHERE LOWER(name) LIKE '%hapert%';

-- 'T LOO: Data incomplete - needs website verification
-- UPDATE races SET length_per_round = ?, number_of_rounds = ? WHERE LOWER(name) LIKE '%loo%';

-- ============================================================================
-- SECTION 3: CORRECT START TIMES FOR 2025 RACES
-- ============================================================================

-- Luyksgestel 2025: 15:00 → 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2025 AND LOWER(name) LIKE '%luyksgestel%';

-- Bergeijk 2025: 15:00 → 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2025 AND LOWER(name) LIKE '%bergeijk%';

-- Steensel 2025: 15:00 → 17:00
UPDATE races
SET start_time = '17:00'
WHERE season = 2025 AND LOWER(name) LIKE '%steensel%';

-- Weebosch 2025: 14:00 → 17:15
UPDATE races
SET start_time = '17:15'
WHERE season = 2025 AND LOWER(name) LIKE '%weebosch%';

-- ============================================================================
-- SECTION 4: CORRECT START TIMES FOR 2026 RACES
-- ============================================================================

-- 't Loo 2026: 14:00 → 15:30
UPDATE races
SET start_time = '15:30'
WHERE season = 2026 AND LOWER(name) LIKE '%loo%';

-- Luyksgestel 2026: → 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2026 AND LOWER(name) LIKE '%luyksgestel%';

-- Bergeijk 2026: → 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2026 AND LOWER(name) LIKE '%bergeijk%';

-- Steensel 2026: → 17:00
UPDATE races
SET start_time = '17:00'
WHERE season = 2026 AND LOWER(name) LIKE '%steensel%';

-- Weebosch 2026: → 17:15
UPDATE races
SET start_time = '17:15'
WHERE season = 2026 AND LOWER(name) LIKE '%weebosch%';

-- ============================================================================
-- SECTION 5: VERIFY HISTORICAL RESULTS ARE PROPERLY IMPORTED
-- ============================================================================

-- All historical results from 2018, 2019, 2022, 2023, 2024 should already exist
-- in the results table from the exported data.

-- Verify counts:
-- SELECT season, COUNT(*) as result_count
-- FROM results
-- GROUP BY season
-- ORDER BY season;

-- Expected minimum counts:
-- 2018: 250+ results
-- 2019: 250+ results
-- 2022: 250+ results
-- 2023: 300+ results
-- 2024: 300+ results
-- 2025: 300+ results (ongoing)

-- ============================================================================
-- SECTION 6: VERIFY STANDINGS ARE CALCULATED
-- ============================================================================

-- Standings should auto-calculate from results
-- SELECT season, COUNT(*) as rider_count
-- FROM standings
-- GROUP BY season
-- ORDER BY season;

-- ============================================================================
-- SECTION 7: DISPLAY CALCULATED DISTANCES (POST-UPDATE VERIFICATION)
-- ============================================================================

-- After updates complete, verify race properties with calculated distances:
-- SELECT
--   name,
--   location,
--   season,
--   length_per_round,
--   number_of_rounds,
--   CONCAT(length_per_round * number_of_rounds, ' km ±') as calculated_distance,
--   start_time
-- FROM races
-- WHERE length_per_round IS NOT NULL AND number_of_rounds IS NOT NULL
-- ORDER BY season DESC, name;

-- ============================================================================
-- MISSING DATA TO BE FILLED IN
-- ============================================================================

-- The following races still need data from kempencup.nl:
-- 1. GELDROP - Aantal rondes (Lengte per ronde = 1.9 km is set)
-- 2. BERGEIJK - Both Lengte per ronde AND Aantal rondes
-- 3. DUIZEL - Both Lengte per ronde AND Aantal rondes
-- 4. 'T LOO - Both Lengte per ronde AND Aantal rondes

-- Once data is provided, uncomment and execute the corresponding UPDATE statements above.
