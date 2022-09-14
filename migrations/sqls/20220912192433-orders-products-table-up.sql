CREATE TABLE orders_products (
    product_id INTEGER REFERENCES products(id),
    order_id INTEGER REFERENCES orders(id),
    PRIMARY KEY (product_id, order_id),
    quantity INTEGER CHECK (quantity > 0)
);