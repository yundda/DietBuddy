document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  const toggleRightSection = document.getElementById("toggle-right-section");
  const leftSection = document.querySelector(".left-section");
  const rightSection = document.querySelector(".right-section");
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  const handleToggleRightSectionVisibility = () => {
    if (toggleRightSection) {
      if (window.innerWidth > 768) {
        toggleRightSection.style.display = "none";
      } else if (currentPath === "/mypage") {
        toggleRightSection.style.display = "inline-block";
      } else {
        toggleRightSection.style.display = "none";
      }
    }
  };

  handleToggleRightSectionVisibility();
  window.addEventListener("resize", handleToggleRightSectionVisibility);

  if (hamburger && navbar) {
    hamburger.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navbar.style.display = "flex";
      } else {
        navbar.style.display = "none";
      }
    });
  } else {
    console.error("메뉴를 찾을 수 없습니다", { navbar, hamburger });
  }

  if (currentPath === "/mypage" && toggleRightSection && leftSection && rightSection) {
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

      if (window.innerWidth <= 768 && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
      }
    });
  } else if (currentPath === "/mypage") {
    console.error("마이페이지를 찾을 수 없습니다", {
      toggleRightSection,
      leftSection,
      rightSection,
    });
  }
});
