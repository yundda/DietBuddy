SHOW DATABASES;
-- 데이터베이스 확인할 때
USE mysql;
SELECT * FROM user;
-- user 명 확인할 때
DESC user;

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

-- DROP TABLE user;
/