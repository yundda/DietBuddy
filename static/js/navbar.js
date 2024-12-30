document.querySelector(".hamburger").addEventListener("click", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleRightSection = document.getElementById("toggle-right-section");
  const leftSection = document.querySelector(".left-section");
  const rightSection = document.querySelector(".right-section");
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  if (!toggleRightSection || !leftSection || !rightSection || !navbar || !hamburger) {
    console.error("Required elements not found:", {
      toggleRightSection,
      leftSection,
      rightSection,
      navbar,
      hamburger,
    });
    return;
  }

  toggleRightSection.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    console.log("오늘의 식단 버튼 클릭됨"); // 디버그 로그

    // 섹션 토글
    if (rightSection.classList.contains("show")) {
      rightSection.classList.remove("show");
      leftSection.classList.remove("hidden");
      console.log("왼쪽 섹션 표시, 오른쪽 섹션 숨김");
    } else {
      rightSection.classList.add("show");
      leftSection.classList.add("hidden");
      console.log("왼쪽 섹션 숨김, 오른쪽 섹션 표시");
    }

    // 메뉴 닫기 (모바일 환경에서만)
    if (window.innerWidth <= 768) {
      navbar.classList.remove("show"); // 메뉴 숨기기
    }
  });

  // 윈도우 크기 변경 시 메뉴 상태 초기화
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("show");
    }
  });
});
