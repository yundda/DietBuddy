<a href="http://43.203.249.128:8081/" target="_blank">
<img src="https://github.com/user-attachments/assets/e11ef409-a2c9-4bdf-88a4-377130bd5b1d" alt="배너" width="100%"/>
</a>

<br/>
<br/>

# 0. Getting Started (시작하기)

### **설명**

- `npm start`는 **프로덕션 모드**에서 `pm2`를 사용해 애플리케이션을 실행하도록 설정되었습니다.
```bash
$ npm start
```
- `npm run dev`는 **개발 모드**로 실행되며, **`nodemon`**을 사용해 코드 변경 시 자동으로 서버를 재시작합니다.
```bash
$ npm run dev
```

[서비스 링크](http://43.203.249.128:8081/)

---

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: DietBuddy
- 프로젝트 설명: 건강한 삶을 꿈꾸는 모든 사람들을 위해 설계된 맞춤형 식단 관리 플랫폼

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 윤다선(리더) | 이혜민 | 심소영 | 아미나 |
|:------:|:------:|:------:|:------:|
| <img src="https://github.com/user-attachments/assets/9042ccb3-5ac2-4c94-8cc6-d540ab3ff42a" alt="윤다선" width="150"> | <img src="https://github.com/user-attachments/assets/86ec2098-8e5b-40d7-9fbc-bcf6a36cd5f4" alt="이혜민" width="150"> | <img src="https://github.com/user-attachments/assets/e4bcf65e-bdc6-4a12-b9ea-d8b70af6404a" alt="심소영" width="150"> | <img src="https://github.com/user-attachments/assets/c634ab0c-57c0-40c1-8ba6-8eb54afef5cd" alt="아미나" width="150"> |
| PL/BE | BE | FE | FE |
| [GitHub](https://github.com/yundda) | [GitHub](https://github.com/abcbinch) | [GitHub](https://github.com/simsoyung) | [GitHub](https://github.com/aminaakh1680) |

<br/>
<br/>

# 3. Key Features (주요 기능)

### **반응형 웹 지원**
- **모바일 버전**: 화면 크기에 따라 레이아웃이 변경되며, **헤더에 햄버거 메뉴(삼단바)**가 표시됩니다.
- **PC 버전**: **전체 메뉴가 펼쳐진 형태**로 표시되며, **삼단바 대신 네비게이션 바**를 제공합니다.

### **식단 추가 페이지 구성**
- **모바일 버전**: 삼단바 메뉴를 통해 식단 추가 페이지로 이동할 수 있습니다.
- **PC 버전**: 좌측에 **고정 메뉴**가 표시되어 클릭 시 페이지 전환이 가능합니다.

- **회원가입 기능**
- **입력 항목**:  
  이름, 이메일(아이디), 비밀번호, 비밀번호 확인, 비밀번호 확인 질문, 비밀번호 확인 답변을 입력합니다.

- **유효성 검사**:
  - **이름**:  
    - 최대 15자 이내  
    - 한글, 영문, 숫자만 허용  
  - **이메일 중복 체크**:  
    - 2~15자 이내  
    - 한글, 영문, 숫자만 허용  
    - **이미 데이터베이스에 동일한 이메일이 존재하면 가입 불가**  
  - **비밀번호**:  
    - 8~20자 이내  
    - 영어 대소문자, 숫자 중 **최소 1개** 포함  
  - **비밀번호 확인 질문**:  
    - 반드시 선택해야 하며, 선택하지 않으면 진행할 수 없습니다.  
  - **비밀번호 확인 답변**:  
    - 최대 255자 이내 작성 가능합니다.

  - **비밀번호 확인 질문과 답변의 역할**:  
    - 비밀번호 찾기 시 입력된 질문과 답변을 통해 본인 확인 절차를 진행합니다.

---

- **로그인**
- **유효성 검사 및 오류 처리**:
  - **이메일 또는 비밀번호 미기재 시**:  
    - 경고창을 표시하여 사용자에게 입력을 요청합니다.  
  - **이메일 또는 비밀번호 오류 시**:  
    - 로그인 버튼 하단에 **빨간색 경고 메시지**를 표시합니다.  
    - 예시: `"이메일 또는 비밀번호가 올바르지 않습니다."`
    
---

- **비밀번호 찾기 기능**
- **입력 항목**  
  - 이메일  
  - 비밀번호 확인 질문  
  - 비밀번호 확인 답변  

- **기능 동작**
  1. 사용자가 입력한 **세 가지 정보(이메일, 확인 질문, 답변)**를 데이터베이스에 저장된 정보와 대조합니다.  
  2. **모두 일치할 경우**, 비밀번호 재설정 페이지로 이동합니다.  
  3. 사용자가 새 비밀번호를 입력하여 **데이터베이스에 비밀번호가 업데이트**됩니다.

---

- **목표 설정**
- **입력 항목**
  - 키(cm)
  - 현재 체중(kg)
  - 나이
  - 성별
  - 목표 체중(kg)
  - 목표 기간(일)
  - 식단 관리 목적 (체중 감량/유지/증량)

- **기능 동작**

1. **유저 목표 설정**:
   - 사용자가 입력한 정보를 바탕으로 사용자 목표를 설정합니다.
   - 설정된 목표는 데이터베이스에 저장됩니다.

2. **기초대사량을 기준으로 한 검증**:
   - 기초대사량을 계산하여 목표 설정의 적절성을 검증합니다:
     - **기초대사량 대비 일일 섭취량이 -300kcal 미만**:
       - 경고창을 표시하며 **과도한 체중 감량으로 목표 설정이 불가**하다는 알림을 제공합니다.
     - **기초대사량 대비 0~300kcal 미만**:
       - 경고창을 표시하며 **기초대사량보다 적게 섭취**하므로, 계속 진행할지 또는 새로 목표를 설정할지 선택하도록 안내합니다.
     - **기초대사량 기준 정상 범위**:
       - 목표 설정이 정상적으로 완료됩니다.

3. **맞춤형 식단 플랜 제공**:
   - 목표 설정이 완료되면 해당 유저에 대한 **맞춤형 하루 섭취량(탄수화물, 단백질, 지방)**을 계산하여 데이터베이스에 저장합니다.
   - 계산된 결과를 기반으로 **맞춤형 식단 플랜**을 제공합니다.

---

- **목표 설정 전, 후 **

**1. 목표 설정 전 페이지**
### **기능 설명**
- 사용자 입력 폼이 제공되며, 항목별로 데이터를 입력받습니다.
- **입력되지 않은 항목**은 기본값으로 `--`이 표시됩니다.
- 모든 항목을 입력 후 **"목표 설정" 버튼**을 클릭하여 다음 단계로 이동합니다.

---

**2. 목표 설정 후 페이지**

**화면 구성 및 기능 설명**

**1) 좌측 상단 - 권장 섭취량**
- 설정된 목표를 기준으로 계산된 하루 **권장 섭취 칼로리** 및 **영양소(탄수화물, 단백질, 지방)**의 권장 섭취량을 표시합니다.

**2) 우측 상단 - 현재 체중**
- 사용자가 입력한 **현재 체중** 정보를 표시합니다.

**3) 중앙 - 영양소별 권장 섭취량 시각화**
- **식단 기록에 따른 영양소 섭취량**을 시각적으로 확인할 수 있는 **인디케이터 바**가 표시됩니다.
- **전체 섭취 칼로리의 120%**까지 바 형태로 시각화되며, 현재 섭취량을 **빨간색 점**으로 표시하여 과잉 섭취 여부를 알 수 있습니다.

**4) 우측 - 날짜별 식단 기록 기능**
- **날짜 선택**을 통해 해당 날짜의 식단 기록을 작성할 수 있습니다.
- 식사 유형별로 입력 가능:
  - 아침, 점심, 저녁, 간식으로 나누어 입력.
- **지난 날짜 기록 기능**:
  - 날짜 선택 기능을 통해 **지난 날짜**에도 데이터를 추가 기입할 수 있습니다.

**5) 하단 - 월별 섭취 그래프**
- **유저의 데이터가 존재하는 월**만 조회하여 그래프 데이터를 표시합니다.
- 페이지 로드 시 사용자의 기록을 바탕으로 **해당 월의 리스트**만 상단에 표시됩니다.
- **ApexCharts** 라이브러리를 사용하여 그래프를 시각화합니다.

---

- **회원정보 수정**

**1. 기능 설명**
- 사용자는 **이름**, **새 비밀번호**, **새 비밀번호 확인**을 입력하여 회원 정보를 수정할 수 있습니다.
- **이메일**은 수정할 수 없으며, 읽기 전용으로 고정된 값으로 표시됩니다.
- **수정된 정보는 데이터베이스에 저장**되며 업데이트됩니다.

**2. 입력 항목**
- **이름**: 변경할 사용자 이름
- **새 비밀번호**: 변경할 비밀번호
- **새 비밀번호 확인**: 비밀번호 검증을 위한 재입력 필드
- **이메일**: 읽기 전용 필드 (수정 불가)

**3. 기능 동작 방식**

1. 사용자가 **이름, 새 비밀번호, 새 비밀번호 확인**을 입력합니다.
2. **이메일** 필드는 읽기 전용으로 고정되어 표시됩니다.
3. **수정하기 버튼 클릭 시 동작**:
   - 입력된 정보가 유효성 검사를 통과해야 합니다:
     - **이름**: 최대 15자 이내, 한글, 영문, 숫자만 허용
     - **새 비밀번호**: 8~20자 이내, 영어 대소문자 및 숫자 중 **최소 1개** 포함
     - **새 비밀번호 확인**: 새 비밀번호와 동일해야 함
4. 모든 조건을 충족하면 데이터베이스에 변경된 정보가 저장됩니다.
5. 저장 성공 시 **"수정이 완료되었습니다."**라는 알림 메시지를 표시합니다.

---

# 4. Tasks & Responsibilities (작업 및 역할 분담)
|  |  |  |
|-----------------|-----------------|-----------------|
| 윤다선    |  <img src="https://github.com/user-attachments/assets/9042ccb3-5ac2-4c94-8cc6-d540ab3ff42a" alt="윤다선" width="100"> | <ul><li>프로젝트 계획 및 관리</li><li>데이터베이스 구축</li><li>회원정보 수정 기능</li><li>비밀번호 재설정 기능</li><li>목표설정 기능</li><li>일일 섭취 정보 저장</li><li>권장 섭취량 계산</li><li>섭취 정보 삭제</li></ul> |
| 이혜민   |  <img src="https://github.com/user-attachments/assets/86ec2098-8e5b-40d7-9fbc-bcf6a36cd5f4" alt="이혜민" width="100">| <ul><li>로그인 기능</li><li>회원가입 기능</li><li>로그아웃 기능</li><li>회원탈퇴 기능</li></ul> |
| 심소영   |  <img src="https://github.com/user-attachments/assets/e4bcf65e-bdc6-4a12-b9ea-d8b70af6404a" alt="심소영" width="100">    | <ul><li>기본 홈페이지</li><li>메인 user 페이지</li><li>로그인 페이지</li><li>비밀번호 찾기 페이지</li><li>식단 추가 모달</li><li>메인 user 그래프</li></ul> |
| 아미나   |  <img src="https://github.com/user-attachments/assets/c634ab0c-57c0-40c1-8ba6-8eb54afef5cd" alt="아미나" width="100">    | <ul><li>반응형 페이지 개발</li><li>비밀번호 재설정 페이지</li><li>목표설정 페이지</li><li>회원가입 페이지</li><li>회원 정보 수정 페이지</li></ul> |

<br/>
<br/>

# 5. Technology Stack (기술 스택)

## **기술 스택**

## 5.1 Language (언어)  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  

---

## 5.2 Frontend (프론트엔드) 
![EJS](https://img.shields.io/badge/EJS-68A063?style=for-the-badge&logo=express&logoColor=white)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)  
![ApexCharts](https://img.shields.io/badge/ApexCharts-5C5CFF?style=for-the-badge&logo=apexcharts&logoColor=white)  

---

## 5.3 Backend (백엔드) 
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)  
![Express-Session](https://img.shields.io/badge/Express%20Session-000000?style=for-the-badge&logo=express&logoColor=white)  
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)  
![Dotenv](https://img.shields.io/badge/Dotenv-E4DCCF?style=for-the-badge&logo=dotenv&logoColor=black)  
![Cross-Env](https://img.shields.io/badge/Cross%20Env-555555?style=for-the-badge&logo=nodedotjs&logoColor=white)  

---

## 5.4 Cooperation (협업 도구) 
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)  
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)  
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)  

## 5.5 Design (디자인 도구) 
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)   
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white)  


<br/>

# 6. Project Structure (프로젝트 구조)
## 6.1 Project Structure
```plaintext
DietBuddy/
├── config/                  # 환경설정 관련 파일
│   └── config.js            # DB 및 기타 설정 파일
├── controller/              # 컨트롤러(비즈니스 로직 처리)
│   ├── Cmain.js             # 메인 페이지 관련 컨트롤러
│   ├── Cmypage.js           # 마이 페이지 관련 컨트롤러
│   └── Cuser.js             # 사용자 관련 컨트롤러
├── models/                  # 데이터베이스 모델 정의
│   ├── index.js             # 모델 초기화 파일
│   ├── Intake.js            # 섭취량 관련 모델
│   ├── User.js              # 사용자 관련 모델
│   └── UserGoal.js          # 사용자 목표 관련 모델
├── routes/                  # 라우터 정의
│   ├── index.js             # 메인 라우트
│   ├── mypage.js            # 마이 페이지 라우트
│   └── user.js              # 사용자 관련 라우트
├── static/                  # 정적 파일(스타일, 이미지 등)
│   ├── css/                 # 스타일시트(CSS) 파일
│   │   ├── 404.css          # 404 페이지 스타일
│   │   ├── base.css         # 기본 스타일
│   │   ├── findPw.css       # 비밀번호 찾기 페이지 스타일
│   │   ├── index.css        # 메인 페이지 스타일
│   │   ├── login.css        # 로그인 페이지 스타일
│   │   ├── setting-goal.css # 목표 설정 페이지 스타일
│   │   ├── signup.css       # 회원가입 페이지 스타일
│   │   └── user.css         # 사용자 페이지 스타일
│   └── img/                 # 이미지 파일
├── js/                      # 클라이언트 사이드 JS 파일
│   ├── findPw.js            # 비밀번호 찾기 관련 JS
│   ├── graph.js             # 그래프 관련 JS
│   ├── login.js             # 로그인 관련 JS
│   ├── navbar.js            # 네비게이션 바 관련 JS
│   ├── settingGoal.js       # 목표 설정 관련 JS
│   └── userUpdate.js        # 사용자 정보 업데이트 관련 JS
├── utils/                   # 유틸리티 함수 모음
│   └── utils.js             # 섭취량 계산 함수 / 로그인, 회원가입 공용 함수
├── views/                   # 뷰 템플릿(EJS)
│   ├── partials/            # 재사용 가능한 뷰 컴포넌트(헤더, 푸터 등)
│   │   ├── footer.ejs       # 푸터 뷰 파일
│   │   ├── header.ejs       # 헤더 뷰 파일
│   │   └── title.ejs        # 타이틀 뷰 파일
│   ├── 404page.ejs          # 404 페이지
│   ├── findPw.ejs           # 비밀번호 찾기 페이지
│   ├── index.ejs            # 메인 페이지
│   ├── login.ejs            # 로그인 페이지
│   ├── settingGoal.ejs      # 목표 설정 페이지
│   └── signup.ejs           # 회원가입 페이지
├── .env                     # 환경변수 파일
├── .env.example             # 환경변수 샘플 파일
├── .gitignore               # Git 무시할 파일 및 디렉토리 목록
├── .prettierrc              # 코드 포맷 설정 파일
├── app.js                   # 메인 애플리케이션 파일
├── diet.sql                 # DB 초기화 SQL 파일
├── package-lock.json        # 정확한 종속성 버전 기록 파일
├── package.json             # 프로젝트 종속성 및 스크립트 정의 파일
└── README.md                # 프로젝트 설명서(리드미)

```

## 6.2 ERD (Entity-Relationship Diagram)

 <img src="https://github.com/user-attachments/assets/06cb44af-c5a4-4e80-9407-7a6b8028b41e" alt="ERD" width="100%">

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)

### **1. 브랜치 관리 정책**
- `develop` 브랜치에 **push**하도록 설정하였으며,  
  `main` 브랜치에는 **직접 push 불가**하도록 설정되어 있습니다.

### **2. Commit Convention **

| **타입** | **설명** |
|:---------|:--------|
| **Feature** | 새로운 기능 추가 |
| **Fix** | 버그 수정 |
| **Env** | 개발 환경 관련 설정 |
| **Style** | 코드 스타일 수정 (세미콜론, 인덴트 등) |
| **Refactor** | 코드 리팩토링 (더 효율적인 코드로 변경) |
| **Design** | CSS 및 디자인 추가/수정 |
| **Comment** | 주석 추가/수정 |
| **Docs** | 내부 문서 추가/수정 |
| **Test** | 테스트 코드 추가/수정 |
| **Chore** | 빌드 관련 코드 수정 |
| **Rename** | 파일 및 폴더명 수정 |
| **Remove** | 파일 삭제 |

---

### **커밋 메시지 예시**
```bash
git commit -m "[Fix] 로그인 화면 버그 수정"
git commit -m "[Feature] 회원가입 API 추가"
<br/>
<br/>
```

<br/>

### **3. 명명 규칙 (Naming Convention) **


### **1. 함수**
- **스네이크 케이스(SNAKE_CASE)** 형식을 사용합니다.
```javascript
const camelCase;
```

### **1. 변수**
- **스네이크 케이스(SNAKE_CASE)** 형식을 사용합니다.
```javascript
const snake_case;
```

### **4. API Documentation (API 문서)**  
- [API 문서 보러 가기](https://github.com/user-attachments/assets/19485e48-4e09-4ce9-a9a5-a259cd9e5dbe)  



