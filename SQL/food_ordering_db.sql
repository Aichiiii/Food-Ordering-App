CREATE DATABASE food_order_db;
USE food_order_db;

-- 1. Roles Table
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(20) NOT NULL
);

INSERT INTO roles (role_name) 
VALUES 
	('Admin'), 
    ('Staff'), 
    ('Customer');

-- 2. Users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL DEFAULT 3, 
    FOREIGN KEY (role_id) REFERENCES roles(role_id) 
);

-- 3. Menus Table
CREATE TABLE menus (
    product_id INT PRIMARY KEY AUTO_INCREMENT, 
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL
);

-- 4. Orders Table
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL, 
    payment_status VARCHAR(50) DEFAULT 'Pending', 
    delivery_status VARCHAR(50) DEFAULT 'Preparing', 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 5. Order Details Table
CREATE TABLE order_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES menus(product_id)
);