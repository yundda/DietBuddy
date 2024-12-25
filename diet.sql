-- Active: 1732688622705@@127.0.0.1@3306@dietBuddy

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

INSERT INTO `user` (`email`, `pw`, `name`, `findPw`, `salt`, `createdAt`, `updatedAt`) 
VALUES (
  'aaaa',
  '1111qqqq',
  '홍길동',
  'recovery_code',
  'random_salt_value',
  NOW(),
  NOW()
);

