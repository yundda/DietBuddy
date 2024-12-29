-- Active: 1733117003929@@127.0.0.1@3306@dietbuddy

SHOW DATABASES;
-- 데이터베이스 확인할 때
USE mysql;
SELECT * FROM user;

CREATE DATABASE dietBuddy DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
-- 데이터베이스 생성
USE dietBuddy;

CREATE USER 'buddy'@'%' IDENTIFIED BY '1234';
-- 계정 및 비밀번호 생성
DROP USER 'buddy'@'%';
-- 문제가 있을 경우 사용자를 전체 삭제하고 다시 생성

GRANT ALL PRIVILEGES ON *.* TO 'buddy'@'%' WITH GRANT OPTION;
-- 권한 부여
-- REVOKE ALL PRIVILEGES ON *.* TO 'buddy'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
-- 권한 설정 변경사항 적용?

SHOW TABLES;

DROP TABLE user_goal;
DROP TABLE intake;
DROP Table user;

-- 칼럼명 확인
DESC user;
DESC user_goal;
DESC intake;

-- 테이블 조회
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
