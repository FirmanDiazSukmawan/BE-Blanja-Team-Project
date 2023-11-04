-- Active: 1692600013165@@localhost@5432@blanja_db

CREATE TABLE
    seller (
        seller_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(14) NOT NULL,
        password VARCHAR(255) NOT NULL,
        store_name VARCHAR(255) NOT NULL,
        store_description VARCHAR(255),
        image VARCHAR(255),
        role VARCHAR(10)
    )

CREATE TABLE
    product (
        product_id SERIAL PRIMARY KEY,
        name_product VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        color VARCHAR(255),
        size VARCHAR(255),
        stock VARCHAR(255),
        condition VARCHAR(255),
        image_product VARCHAR(255),
        description TEXT,
        users_id INT,
        category_id INT
    )

DROP TABLE product 

INSERT INTO
    product (
        name_product,
        price,
        color,
        size,
        stock,
        condition,
        image_product,
        description,
        users_id,
        category_id
    )
VALUES (
        'Nama Produk 1',
        49.99,
        'Merah',
        'M',
        '100',
        'Baru',
        'gambar1.jpg',
        'Deskripsi Produk 1',
        1,
        2
    )

CREATE TABLE
    category (
        category_id SERIAL PRIMARY KEY,
        name_category VARCHAR(255) NOT NULL,
        image VARCHAR (255),
    )

CREATE TABLE
    customer(
        customer_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255),
        gender VARCHAR(255),
        birthday VARCHAR(255),
        image VARCHAR(255),
        role VARCHAR(255)
    )

INSERT INTO
    customer (
        name,
        email,
        password,
        phone_number,
        gender,
        birthday,
        image,
        role
    )
VALUES (
        'John Doe',
        'john.doe@example.com',
        'password123',
        '1234567890',
        'Male',
        '1990-01-01',
        'image.jpg',
        'Customer'
    );

CREATE TABLE
    addres(
        addres_id SERIAL PRIMARY KEY,
        home_addres VARCHAR(255) NOT NULL,
        recipients_name VARCHAR(255),
        phone VARCHAR(255),
        addres VARCHAR(255),
        postal_code INT,
        city VARCHAR(255),
        users_id INT
    )

CREATE TABLE
    orders (
        order_id SERIAL PRIMARY KEY,
        order_size VARCHAR(255),
        order_color VARCHAR(255),
        quantity INT,
        customer_id INT,
        seller_id INT,
        product_id INT,
        address_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

DROP TABLE order 

ALTER TABLE orders
ADD status VARCHAR(255);
