create database online_book;
use online_book;

create table books(
book_id char(36) primary key,
book_name varchar(255) not null,
genre varchar(50),
price int not null,
stock int not null,
description text,
createdAt timestamp default current_timestamp
);