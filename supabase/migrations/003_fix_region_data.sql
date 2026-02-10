-- FIX REGION DATA
-- Updates placeholder region data to match actual company contact info
-- Run this in Supabase SQL Editor

UPDATE regions SET
  phone = '+44 7438 381906',
  address = '71-75 Shelton Street, Covent Garden, London WC2H 9JQ',
  timezone = 'Europe/London',
  updated_at = NOW()
WHERE code = 'UK';

UPDATE regions SET
  phone = '+971 50 693 4001',
  address = 'Dubai',
  timezone = 'Asia/Dubai',
  updated_at = NOW()
WHERE code = 'UAE';

UPDATE regions SET
  phone = '+91 8660023218',
  address = '5/13 Milton Street, Wheeler Rd Ext, Balaji Layout, Cooke Town, Bengaluru, Karnataka 560005',
  timezone = 'Asia/Kolkata',
  updated_at = NOW()
WHERE code = 'IND';
