ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS password_hash TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname='public' AND indexname='ux_customers_email'
  ) THEN
    CREATE UNIQUE INDEX ux_customers_email ON customers (lower(email));
  END IF;
END$$;