# javarushTestTask
Test task for internship

index at localhost:8081

db mysql 
user root
pass Trabara1

sample database script

create table book (
id INT(11) NOT NULL AUTO_INCREMENT,
title VARCHAR(100),
description VARCHAR(255),
author VARCHAR(100),
isbn VARCHAR(20),
printYear INT(11),
readAlready BOOLEAN,
PRIMARY KEY(id));


insert into book
(title, description, author, isbn, printYear, readAlready)
values
('Руслан и Людмила','Сказки','Пушкин','PSHK-276',1998,0),
('Мцыри','Поэма','Лермонтов','P3f-333',1993,0),
('12','Поэма','Маяковский','MYAK-37563',1988,0),
('Ромео и Джульетта','Мыльная опера','Шейкспир','SHK-363',1970,0),
('Какой я великий','Мемуары','Путин','PTNPNH-363',2018,0),
('Как завести друзей','Бизнес-книга','Сусанин','SUS-865',2013,0),
('Как заработать миллиард','Бизнес-книга','Сечин','OZERO-363',2017,0),
('Тестирование в действии','Тестовая книга','Тестов','TEST-001',2046,0),
('Cracking the coding interview','Погромирование','МакДауэл','CRACK1234',2017,0),
('Спринг ин экшн','Погромирование','Погромистов','SPRING0001',2017,0);
