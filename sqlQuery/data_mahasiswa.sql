create database data_mahasiswa;
use data_mahasiswa;

create table mahasiswa(
id int auto_increment primary key,
nim varchar(20) unique not null,
nama_mahasiswa varchar(255) not null,
email_mahasiswa varchar(255) unique not null,
nomor_telpon varchar(20) unique,
alamat text
);

