document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  const toggleRightSection = document.getElementById("toggle-right-section");
  const leftSection = document.querySelector(".left-section");
  const rightSection = document.querySelector(".right-section");
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  // 오늘의 식단 버튼 가시성 설정
  const handleToggleRightSectionVisibility = () => {
    if (toggleRightSection) {
      if (window.innerWidth > 768) {
        toggleRightSection.style.display = "none";
      } else if (currentPath === "/mypage/main") {
        toggleRightSection.style.display = "inline-block";
      } else {
        toggleRightSection.style.display = "none";
      }
    }
  };

  // 햄버거 메뉴 상태 초기화
  const initializeNavbar = () => {
    if (window.innerWidth > 768) {
      navbar.style.display = "flex"; // 데스크탑 환경
      navbar.classList.remove("show"); // 모바일 상태 초기화
    } else {
      navbar.style.display = "none"; // 모바일 환경
    }
  };

  // 초기 실행 및 화면 크기 변경 이벤트 리스너 등록
  handleToggleRightSectionVisibility();
  initializeNavbar();

  window.addEventListener("resize", () => {
    handleToggleRightSectionVisibility();
    initializeNavbar();
  });

  // 햄버거 버튼 클릭 이벤트
  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("show");
      navbar.style.display = navbar.classList.contains("show") ? "flex" : "none";
    });
  } else {
    console.error("햄버거 메뉴를 찾을 수 없습니다", { navbar, hamburger });
  }

  // "/mypage/main"에서 오늘의 식단 버튼 동작
  if (
    currentPath === "/mypage/main" &&
    toggleRightSection &&
    leftSection &&
    rightSection
  ) {
    toggleRightSection.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("오늘의 식단 버튼 클릭됨");

      const isRightSectionVisible = rightSection.classList.toggle("show");
      leftSection.classList.toggle("hidden", isRightSectionVisible);

      console.log(
        isRightSectionVisible
          ? "오른쪽 섹션 표시, 왼쪽 섹션 숨김"
          : "왼쪽 섹션 표시, 오른쪽 섹션 숨김"
      );

      // 모바일 환경에서 메뉴 닫기
      if (window.innerWidth <= 768 && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
        navbar.style.display = "none";
      }
    });
  } else if (currentPath === "/mypage/main") {
    console.error("마이페이지 관련 요소를 찾을 수 없습니다", {
      toggleRightSection,
      leftSection,
      rightSection,
    });
  }
});
