-- SQL schema generated from extracted_schema.txt
-- Đảm bảo tạo bảng theo đúng thứ tự để tránh lỗi khóa ngoại

-- 1. No dependencies
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE auth_provider (
    id_provider SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    code_auth VARCHAR(50)
);

CREATE TABLE Companies (
    company_id SERIAL PRIMARY KEY,
    ticker_symbol VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    industry VARCHAR(100),
    market_cap BIGINT,
    exchange VARCHAR(50)
);

-- 2. References above
CREATE TABLE Account (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    id_auth_provider INT,
    email_verified BOOLEAN DEFAULT FALSE,
    opt_secret VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES Roles(id),
    FOREIGN KEY (id_auth_provider) REFERENCES auth_provider(id_provider)
);
CREATE TABLE StockPrices (
    price_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    date DATE NOT NULL,
    open_at DECIMAL(12, 2),
    close_at DECIMAL(12, 2),
    high DECIMAL(12, 2),
    low DECIMAL(12, 2),
    volume BIGINT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

CREATE TABLE FinancialReports (
    report_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    report_date DATE NOT NULL,
    revenue BIGINT,
    net_income BIGINT,
    eps FLOAT,
    pe_ratio FLOAT,
    dividend_yield FLOAT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

CREATE TABLE Signal_type (
    id_type SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Signal (
    signal_id SERIAL PRIMARY KEY,
    ticker_symbol VARCHAR(10) NOT NULL,
    indicator VARCHAR(100),
    type_id INT,
    value FLOAT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INT,
    confidence_score FLOAT,
    explanation TEXT,
    FOREIGN KEY (type_id) REFERENCES Signal_type(id_type),
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

-- 3. References Account/Companies
CREATE TABLE InvestorProfile (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    risk_tolerance VARCHAR(50),
    investment_goals TEXT,
    investment_horizon VARCHAR(50),
    income_level VARCHAR(50),
    net_worth BIGINT,
    experience_level VARCHAR(50),
    preferred_assets TEXT,
    profile_embedding TEXT,
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE Watchlist (
    invest_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    ticker_symbol VARCHAR(10) NOT NULL,
    quantity INT,
    avg_buy_price FLOAT,
    current_price FLOAT,
    weight_pct FLOAT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

CREATE TABLE Portfolio (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE PortfolioItem (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    company_id INT NOT NULL,
    ticker_symbol VARCHAR(10) NOT NULL,
    avg_buy_price FLOAT,
    FOREIGN KEY (portfolio_id) REFERENCES Portfolio(id),
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

CREATE TABLE PortfolioSignal (
    id SERIAL PRIMARY KEY,
    signal_id INT NOT NULL,
    portfolio_id INT NOT NULL,
    ticker_symbol VARCHAR(10) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avg_buy_price FLOAT,
    status VARCHAR(50),
    FOREIGN KEY (signal_id) REFERENCES Signal(signal_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolio(id)
);

CREATE TABLE InvestmentStrategy (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE BacktestResult (
    id SERIAL PRIMARY KEY,
    strategy_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_return FLOAT,
    annualized_return FLOAT,
    max_drawdown FLOAT,
    sharpe_ratio FLOAT,
    result_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (strategy_id) REFERENCES InvestmentStrategy(id)
);

CREATE TABLE ChatSession (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    ended_at TIMESTAMP,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_type VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE ChatMessage (
    id SERIAL PRIMARY KEY,
    session_id INT NOT NULL,
    sender VARCHAR(50) NOT NULL,
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT,
    FOREIGN KEY (session_id) REFERENCES ChatSession(id)
);

CREATE TABLE Alert (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    condition_json TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    triggered_at TIMESTAMP,
    message TEXT,
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE AI_Answer (
    id SERIAL PRIMARY KEY,
    ticker_symbol VARCHAR(10) NOT NULL,
    action VARCHAR(50),
    confidence_score FLOAT,
    rationale TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message_id INT,
    is_good BOOLEAN,
    FOREIGN KEY (message_id) REFERENCES ChatMessage(id)
);

CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    ticket_tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Account(user_id)
);

CREATE TABLE Comment (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES Account(user_id),
    FOREIGN KEY (post_id) REFERENCES Post(id)
);

-- 5. Junction table
CREATE TABLE RolePermissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES Roles(id),
    FOREIGN KEY (permission_id) REFERENCES Permissions(id)
); 