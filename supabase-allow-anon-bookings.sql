-- ============================================================
-- OPTIONAL PATCH — allow anonymous (guest) booking creation
-- ============================================================
-- Because bookings has `customer_id REFERENCES profiles(id)`, the
-- original INSERT policy only applies to signed-in users:
--     bookings_customer_insert ... WITH CHECK (customer_id = auth.uid())
--
-- For a marketing site without login (guest wizard bookings that
-- still save to the DB), run this ONCE in the Supabase SQL Editor.
-- It is safe, minimal, and reversible.

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY bookings_guest_insert ON bookings
    FOR INSERT TO anon
    WITH CHECK (status = 'pending' AND customer_id IS NULL);

-- NOTE: no guest SELECT policy is granted — guests cannot read bookings.
-- (A token-based read/verification flow, if ever needed, must be designed explicitly.)

-- To revert later:
--   DROP POLICY bookings_guest_insert ON bookings;
