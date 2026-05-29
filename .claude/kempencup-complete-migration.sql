-- ============================================================================
-- KEMPENCUP COMPLETE DATA MIGRATION
-- Syncs all race properties, start times, and historical results (2018-2024)
-- ============================================================================

-- First, add new columns to races table if they don't exist
-- (These columns store the race properties needed for the frontend)
-- ALTER TABLE races ADD COLUMN IF NOT EXISTS number_of_rounds INTEGER;
-- ALTER TABLE races ADD COLUMN IF NOT EXISTS length_per_round DECIMAL(5,2);

-- ============================================================================
-- SECTION 1: UPDATE START TIMES FOR 2025 RACES
-- ============================================================================

-- Luyksgestel 2025: Change from 15:00 to 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2025 AND LOWER(name) LIKE '%luyksgestel%';

-- Bergeijk 2025: Change from 15:00 to 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2025 AND LOWER(name) LIKE '%bergeijk%';

-- Steensel 2025: Change from 15:00 to 17:00
UPDATE races
SET start_time = '17:00'
WHERE season = 2025 AND LOWER(name) LIKE '%steensel%';

-- Weebosch 2025: Change from 14:00 to 17:15
UPDATE races
SET start_time = '17:15'
WHERE season = 2025 AND LOWER(name) LIKE '%weebosch%';

-- ============================================================================
-- SECTION 2: UPDATE START TIMES FOR 2026 RACES
-- ============================================================================

-- 't Loo 2026: Change from 14:00 to 15:30
UPDATE races
SET start_time = '15:30'
WHERE season = 2026 AND LOWER(name) LIKE '%loo%';

-- Luyksgestel 2026: Set to 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2026 AND LOWER(name) LIKE '%luyksgestel%';

-- Bergeijk 2026: Ensure set to 16:30
UPDATE races
SET start_time = '16:30'
WHERE season = 2026 AND LOWER(name) LIKE '%bergeijk%';

-- Steensel 2026: Ensure set to 17:00
UPDATE races
SET start_time = '17:00'
WHERE season = 2026 AND LOWER(name) LIKE '%steensel%';

-- Weebosch 2026: Ensure set to 17:15
UPDATE races
SET start_time = '17:15'
WHERE season = 2026 AND LOWER(name) LIKE '%weebosch%';

-- ============================================================================
-- SECTION 3: CLEAN UP DUPLICATE RACES (Keep only one version per race)
-- ============================================================================
-- The current system has duplicate races with different IDs.
-- For data integrity, identify and consolidate to single record per race per season.
-- This ensures all results point to the same race_id.

-- Note: Run this carefully to avoid data loss. Create a mapping of old -> new IDs first.
-- Example strategy: Keep the LOWEST ID for each race/season combo, consolidate results to it.

-- ============================================================================
-- SECTION 4: HISTORICAL RESULTS VERIFICATION
-- ============================================================================
-- The results.json already contains all historical data for 2018, 2019, 2022, 2023, 2024
-- Verify they are properly stored in the results table with correct references.

-- Count results by year:
-- SELECT season, COUNT(*) as result_count FROM results GROUP BY season ORDER BY season;
-- Expected:
-- 2018: 29x race results
-- 2019: 31x race results
-- 2022: 30x race results
-- 2023: 39x race results
-- 2024: 49x race results
-- 2025: 200+ results (ongoing season)

-- ============================================================================
-- SECTION 5: STANDINGS TABLE VERIFICATION
-- ============================================================================
-- The standings table is auto-calculated from results
-- After importing all results, standings should auto-populate correctly

-- Verify standings coverage:
-- SELECT season, COUNT(*) as rider_count FROM standings GROUP BY season ORDER BY season;

-- ============================================================================
-- SECTION 6: RACE PROPERTIES TO BE ADDED (MANUAL CONFIGURATION)
-- ============================================================================
--
-- Once the schema supports Aantal rondes and Lengte per ronde:
-- UPDATE races SET number_of_rounds = X, length_per_round = Y.Z
-- WHERE season = 2024 AND LOWER(name) LIKE '%racename%';
--
-- The distance display will then show: (X × Y.Z) km ±
--
-- Please provide the following for each race you want to configure:
-- - Aantal rondes (number of rounds)
-- - Lengte per ronde (km per round)
--
-- This will auto-calculate to: Aantal rondes × Lengte per ronde
--
-- ============================================================================

-- ============================================================================
-- VERIFICATION QUERIES (Run after migration)
-- ============================================================================

-- 1. Verify start times are updated
-- SELECT season, name, location, start_time
-- FROM races
-- WHERE season IN (2025, 2026)
-- ORDER BY season, id;

-- 2. Verify no duplicate races exist per season
-- SELECT season, name, COUNT(*) as count
-- FROM races
-- GROUP BY season, name
-- HAVING COUNT(*) > 1;

-- 3. Count results by year
-- SELECT season, COUNT(*) as total_results
-- FROM results
-- GROUP BY season
-- ORDER BY season DESC;

-- 4. Verify standings populated
-- SELECT season, COUNT(*) as riders_in_standings
-- FROM standings
-- GROUP BY season
-- ORDER BY season DESC;

-- 5. Sample start times from current database
-- SELECT DISTINCT season, start_time, COUNT(*)
-- FROM races
-- WHERE start_time IS NOT NULL
-- GROUP BY season, start_time
-- ORDER BY season, start_time;
