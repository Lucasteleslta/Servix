ALTER TABLE providers ADD COLUMN city VARCHAR(100);
CREATE INDEX idx_providers_city ON providers (city) WHERE city IS NOT NULL;
