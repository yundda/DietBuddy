
SHOW DATABASES;
USE mysql;
SELECT * FROM user;

CREATE DATABASE dietBuddy DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE dietBuddy;

CREATE USER 'buddy'@'%' IDENTIFIED BY '1234';
DROP USER 'buddy'@'%';

GRANT ALL PRIVILEGES ON *.* TO 'buddy'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

SHOW TABLES;

DROP TABLE user_goal;
DROP TABLE intake;
DROP Table user;

DESC user;
DESC user_goal;
DESC intake;

SELECT * FROM user;
SELECT * FROM user_goal;
SELECT * FROM intake;

INSERT INTO intake (mealtime, carbo, protein, fat, cal, createdAt, updatedAt, id)
VALUES 
('btwmeal', 53, 30, 10, 422, '2024-02-01 08:00:00', '2024-12-01 08:00:00', 1),
('btwmeal', 53, 30, 10, 422, '2024-03-11 08:00:00', '2024-12-01 08:00:00', 1),
('breakfast', 53, 30, 10, 422,'2024-04-01 08:00:00', '2024-12-01 08:00:00', 1),
('dinner', 53, 30, 10, 422,'2024-06-21 08:00:00', '2024-12-01 08:00:00', 1),
('breakfast', 53, 30, 10, 422,'2024-08-01 08:00:00', '2024-12-01 08:00:00', 1),
('dinner', 30, 30, 20, 420,'2024-09-01 08:00:00', '2024-12-01 08:00:00', 1),
('breakfast', 50, 10, 10, 330, '2024-11-01 08:00:00', '2024-12-01 08:00:00', 1),
('breakfast', 50, 30, 10, 330, '2024-11-24 08:00:00', '2024-12-01 08:00:00', 1),
('lunch', 60, 40, 15, 400,'2024-12-02 12:00:00', '2024-12-02 12:00:00', 1),
('dinner', 70, 50, 20, 500, '2024-12-03 18:00:00', '2024-12-03 18:00:00', 1),
('btwmeal', 40, 20, 10, 500, '2024-12-04 15:00:00', '2024-12-04 15:00:00', 1),
('dinner', 70, 20, 10, 700, '2024-12-05 15:00:00', '2024-12-05 15:00:00', 1),
('btwmeal', 100, 20, 10, 400, '2024-12-06 15:00:00', '2024-12-06 15:00:00', 1),
('btwmeal', 33, 10, 10, 400, '2024-12-07 15:00:00', '2024-12-07 15:00:00', 1),
('btwmeal', 60, 20, 10, 500,'2024-12-08 15:00:00', '2024-12-08 15:00:00', 1);

INSERT INTO intake (mealtime, carbo, protein, fat, cal, createdAt, updatedAt, id)
VALUES 
('breakfast', 53, 30, 10,422, '2024-12-27 08:00:00', '2024-12-27 08:00:00', 1),
('lunch', 53, 30, 10,422, '2024-12-27 15:00:00', '2024-12-27 15:00:00', 1),
('breakfast', 30, 20, 10, 300, '2024-12-27 10:00:00', '2024-12-27 10:00:00', 1),
('btwmeal', 60, 20, 10, 410,'2024-12-27 15:00:00', '2024-12-27 15:00:00', 1),
('dinner', 30, 30, 20, 420, '2024-12-27 22:00:00', '2024-12-27 22:00:00', 1);

INSERT INTO intake (mealtime, carbo, protein, fat, cal, createdAt, updatedAt, id)
VALUES 
('breakfast', 53, 30, 10,422, '2024-12-29 08:00:00', '2024-12-27 08:00:00', 1),
('lunch', 53, 30, 10,422, '2024-12-29 15:00:00', '2024-12-27 15:00:00', 1),
('breakfast', 30, 20, 10, 300, '2024-12-29 10:00:00', '2024-12-27 10:00:00', 1),
('btwmeal', 60, 20, 10, 410,'2024-12-29 15:00:00', '2024-12-27 15:00:00', 1),
('dinner', 30, 30, 20, 420, '2024-12-29 22:00:00', '2024-12-27 22:00:00', 1);
