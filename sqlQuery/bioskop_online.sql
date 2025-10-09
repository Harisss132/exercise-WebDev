create database bioskop_online;
use bioskop_online;

create table movies(
movie_id int auto_increment primary key,
title varchar(255) not null,
release_year smallint,
director varchar(255),
genre varchar(100),
rating decimal(3, 1),
duration_minutes int,
createdAt timestamp default current_timestamp
);
