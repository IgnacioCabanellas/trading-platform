-- =====================================================
-- TRADING PLATFORM DATABASE - POSTGRESQL SCHEMA
-- =====================================================
-- Creates all tables, columns, and indexes from scratch
-- Includes support for partial order matching
-- PostgreSQL specific syntax
-- =====================================================

-- Create database (run this separately if needed)
-- CREATE DATABASE trading_platform;

-- Connect to database
-- \c trading_platform;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- Create custom types
-- =====================================================
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE order_type AS ENUM ('BUY', 'SELL');
CREATE TYPE order_status AS ENUM ('PENDING', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED');
CREATE TYPE match_status AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');
create type movement_type as enum ('D', 'W');

-- =====================================================
-- TABLE: users (avoiding reserved word 'user')
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role user_role DEFAULT 'USER' NOT NULL,
    limit_id UUID,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_enabled ON users(enabled);
CREATE INDEX idx_users_limit ON users(limit_id);

-- =====================================================
-- TABLE: limits
-- =====================================================
CREATE TABLE limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    max_amount DECIMAL(20,8) NOT NULL,
    max_daily_orders INTEGER NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_limits_enabled ON limits(enabled);
CREATE INDEX idx_limits_created_by ON limits(created_by);

-- =====================================================
-- TABLE: assets
-- =====================================================
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_assets_symbol ON assets(symbol);
CREATE INDEX idx_assets_enabled ON assets(enabled);
CREATE INDEX idx_assets_created_by ON assets(created_by);

-- =====================================================
-- TABLE: trading_pairs
-- =====================================================
CREATE TABLE trading_pairs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    base_asset_id UUID NOT NULL,
    quote_asset_id UUID NOT NULL,
    created_by UUID,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uk_trading_pairs UNIQUE (base_asset_id, quote_asset_id)
);

CREATE INDEX idx_trading_pairs_base ON trading_pairs(base_asset_id);
CREATE INDEX idx_trading_pairs_quote ON trading_pairs(quote_asset_id);
CREATE INDEX idx_trading_pairs_enabled ON trading_pairs(enabled);
CREATE INDEX idx_trading_pairs_created_by ON trading_pairs(created_by);

-- =====================================================
-- TABLE: orders
-- =====================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    type order_type NOT NULL,
    trading_pairs_id UUID NOT NULL,
    quote_price DECIMAL(20,8) NOT NULL,
    base_quantity DECIMAL(20,8) NOT NULL,
    base_remaining DECIMAL(20,8) NOT NULL,
    cancelled BOOLEAN DEFAULT TRUE NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraints
    CONSTRAINT chk_filled_quantity CHECK (filled_quantity >= 0 AND filled_quantity <= base_quantity),
    CONSTRAINT chk_base_available CHECK (base_available >= 0 AND base_available <= base_quantity),
    CONSTRAINT chk_quantities_consistent CHECK (base_available = base_quantity - filled_quantity)
);

-- Indexes for performance
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_type ON orders(type);
CREATE INDEX idx_orders_trading_pairs ON orders(trading_pairs_id);
CREATE INDEX idx_orders_created_by ON orders(created_by);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Composite indexes for matching engine
CREATE INDEX idx_orders_matching ON orders(trading_pairs_id, type, status, base_available, quote_price, created_at);
CREATE INDEX idx_orders_status_pair ON orders(trading_pairs_id, status, type);
CREATE INDEX idx_orders_price ON orders(quote_price, created_at);
CREATE INDEX idx_orders_available ON orders(base_available, status);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_user_recent ON orders(user_id, created_at DESC);

-- =====================================================
-- TABLE: orders_match
-- =====================================================
CREATE TABLE orders_match (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buy_order UUID NOT NULL,
    sell_order UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_orders_match_buy ON orders_match(buy_order);
CREATE INDEX idx_orders_match_sell ON orders_match(sell_order);
CREATE INDEX idx_orders_match_status ON orders_match(status);
CREATE INDEX idx_orders_match_created ON orders_match(created_at);

-- Composite indexes
CREATE INDEX idx_orders_match_orders ON orders_match(buy_order, sell_order);
CREATE INDEX idx_orders_match_buy_created ON orders_match(buy_order, created_at);
CREATE INDEX idx_orders_match_sell_created ON orders_match(sell_order, created_at);

-- =====================================================
-- TABLE: balances
-- =====================================================
CREATE TABLE balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    asset_id UUID NOT NULL,
    amount DECIMAL(20,8) DEFAULT 0 NOT NULL,
    enabled BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT uk_user_asset UNIQUE (user_id, asset_id),
    CONSTRAINT chk_balances_amount CHECK (amount >= 0)
);

CREATE INDEX idx_balances_user ON balances(user_id);
CREATE INDEX idx_balances_asset ON balances(asset_id);
CREATE INDEX idx_balances_enabled ON balances(enabled);
CREATE INDEX idx_balances_created_by ON balances(created_by);

-- =====================================================
-- TABLE: movements
-- =====================================================
CREATE TABLE movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount DECIMAL(20,8) NOT NULL,
    movement_type movement_type not null,
    order_match_id UUID,
    balance_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_movement_wallets ON movement(wallets_id);
CREATE INDEX idx_movement_created ON movement(created_at);
CREATE INDEX idx_movement_wallets_created ON movement(wallets_id, created_at);

-- =====================================================
-- FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Users foreign keys
ALTER TABLE users
    ADD CONSTRAINT fk_users_limit 
    FOREIGN KEY (limit_id) REFERENCES limits(id) ON DELETE SET NULL;

-- Trading pair foreign keys
ALTER TABLE trading_pairs
    ADD CONSTRAINT fk_trading_pairs_base_asset 
    FOREIGN KEY (base_asset_id) REFERENCES asset(id) ON DELETE RESTRICT,
    ADD CONSTRAINT fk_trading_pairs_quote_asset 
    FOREIGN KEY (quote_asset_id) REFERENCES asset(id) ON DELETE RESTRICT,
    ADD CONSTRAINT fk_trading_pairs_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Orders foreign keys
ALTER TABLE orders
    ADD CONSTRAINT fk_orders_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_orders_trading_pairs 
    FOREIGN KEY (trading_pairs_id) REFERENCES trading_pairs(id) ON DELETE RESTRICT,
    ADD CONSTRAINT fk_orders_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Order match foreign keys
ALTER TABLE orders_match
    ADD CONSTRAINT fk_orders_match_buy 
    FOREIGN KEY (buy_order) REFERENCES orders(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_orders_match_sell 
    FOREIGN KEY (sell_order) REFERENCES orders(id) ON DELETE CASCADE;

-- wallets foreign keys
ALTER TABLE balances
    ADD CONSTRAINT fk_wallets_user 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_wallets_asset 
    FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE RESTRICT,
    ADD CONSTRAINT fk_wallets_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Movement foreign keys
ALTER TABLE movements
    ADD CONSTRAINT fk_movement_wallets 
    FOREIGN KEY (wallets_id) REFERENCES wallets(id) ON DELETE CASCADE;

-- Asset foreign keys
ALTER TABLE assets
    ADD CONSTRAINT fk_asset_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Limits foreign keys
ALTER TABLE limits
    ADD CONSTRAINT fk_limits_created_by 
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- =====================================================
-- Create updated_at trigger function
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- Apply updated_at triggers to all tables
-- =====================================================
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_limits_updated_at BEFORE UPDATE ON limits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_asset_updated_at BEFORE UPDATE ON asset
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trading_pairs_updated_at BEFORE UPDATE ON trading_pairs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE QUERIES FOR APPLICATION LOGIC
-- =====================================================

/*
-- Find matching orders for a new BUY order
SELECT 
    id,
    quote_price,
    base_available,
    user_id
FROM orders
WHERE trading_pairs_id = $1
    AND type = 'SELL'
    AND quote_price <= $2  -- Buy price limit
    AND base_available > 0
    AND status IN ('PENDING', 'PARTIALLY_FILLED')
ORDER BY 
    quote_price ASC,      -- Best price first
    created_at ASC        -- FIFO for same price
FOR UPDATE;              -- Lock rows during matching

-- Insert match record
INSERT INTO orders_match (buy_order, sell_order, base_amount, execution_price)
VALUES ($1, $2, $3, $4);

-- Update orders after match
UPDATE orders 
SET 
    filled_quantity = filled_quantity + $1,
    base_available = base_available - $1,
    average_price = CASE 
        WHEN average_price IS NULL THEN $2
        ELSE ((average_price * filled_quantity + $2 * $1) / (filled_quantity + $1))
    END,
    status = CASE
        WHEN (filled_quantity + $1) >= base_quantity THEN 'FILLED'
        ELSE 'PARTIALLY_FILLED'
    END
WHERE id = $3;
*/

-- =====================================================
-- END OF DATABASE SCHEMA
-- =====================================================