CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price FLOAT CHECK (price > 0),
    category VARCHAR(100)
);