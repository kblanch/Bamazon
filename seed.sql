create database bamazondb;

use bamazondb;

create table products (
	item_id int not null auto_increment,
    product_name varchar(100) NULL,
    department_name varchar(100) NULL,
    price decimal(10,2) NULL,
    stock_qty int NULL,
    primary key (item_id)
);

INSERT INTO PRODUCTS SET product_name = 'Soccer Ball', department_name = 'Fitness', price = '12.99', stock_qty = 93;
INSERT INTO PRODUCTS SET product_name = 'Notepad', department_name = 'Office Supplies', price = '8.37', stock_qty = 74;
INSERT INTO PRODUCTS SET product_name = 'Ice Cream Maker', department_name = 'Kitchen', price = '47.73', stock_qty = 30;
INSERT INTO PRODUCTS SET product_name = 'Headphones', department_name = 'Electronics', price = '33.99', stock_qty = 90;
INSERT INTO PRODUCTS SET product_name = 'Yoga Mat', department_name = 'Fitness', price = '10.99', stock_qty = 24;
INSERT INTO PRODUCTS SET product_name = 'Basketball', department_name = 'Fitness', price = '12.99', stock_qty = 56;
INSERT INTO PRODUCTS SET product_name = 'Socks', department_name = 'Apparel', price = '1.05', stock_qty = 100;
INSERT INTO PRODUCTS SET product_name = 'Shirt', department_name = 'Apparel', price = '10.00', stock_qty = 24;
INSERT INTO PRODUCTS SET product_name = 'Water Bottle', department_name = 'Fitness', price = '12.99', stock_qty = 33;
INSERT INTO PRODUCTS SET product_name = 'Backpack', department_name = 'Accessories', price = '60.00', stock_qty = 30;


create table departments (
	department_id int not null auto_increment,
    department_name varchar(100) NULL,
    over_head_costs decimal(10,2) NULL,
    stock_qty int NULL,
    primary key (item_id)
);