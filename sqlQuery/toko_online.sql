create database if not exists toko_online;
use toko_online;
create table if not exists product(
product_id int auto_increment primary key,
product_name varchar(255) not null,
category varchar(255) not null,
price int not null,
stock int not null,
description text
);