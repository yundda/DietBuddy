// document.querySelector(".hamburger").addEventListener("click", function () {
//   const navbar = document.querySelector(".navbar");
//   navbar.classList.toggle("show");
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleRightSection = document.getElementById("toggle-right-section");
//   const leftSection = document.querySelector(".left-section");
//   const rightSection = document.querySelector(".right-section");
//   const navbar = document.querySelector(".navbar");
//   const hamburger = document.querySelector(".hamburger");

//   if (!toggleRightSection || !leftSection || !rightSection || !navbar || !hamburger) {
//     console.error("Required elements not found:", {
//       toggleRightSection,
//       leftSection,
//       rightSection,
//       navbar,
//       hamburger,
//     });
//     return;
//   }

//   toggleRightSection.addEventListener("click", function (e) {
//     e.preventDefault(); // 기본 동작 방지
//     console.log("오늘의 식단 버튼 클릭됨"); // 디버그 로그

//     // 섹션 토글
//     if (rightSection.classList.contains("show")) {
//       rightSection.classList.remove("show");
//       leftSection.classList.remove("hidden");
//       console.log("왼쪽 섹션 표시, 오른쪽 섹션 숨김");
//     } else {
//       rightSection.classList.add("show");
//       leftSection.classList.add("hidden");
//       console.log("왼쪽 섹션 숨김, 오른쪽 섹션 표시");
//     }

//     // 메뉴 닫기 (모바일 환경에서만)
//     if (window.innerWidth <= 768) {
//       navbar.classList.remove("show"); // 메뉴 숨기기
//     }
//   });

//   // 윈도우 크기 변경 시 메뉴 상태 초기화
//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 768) {
//       navbar.classList.remove("show");
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleRightSection = document.getElementById("toggle-right-section");
//   if (toggleRightSection) {
//     const currentPath = window.location.pathname;

//     // "/mypage" 경로에서만 버튼 표시
//     if (currentPath === "/mypage") {
//       toggleRightSection.style.display = "inline-block";
//     }
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleRightSection = document.getElementById("toggle-right-section");
//   const leftSection = document.querySelector(".left-section");
//   const rightSection = document.querySelector(".right-section");
//   const navbar = document.querySelector(".navbar");
//   const hamburger = document.querySelector(".hamburger");

//   // "/mypage" 경로에서만 "오늘의 식단" 버튼 표시
//   const currentPath = window.location.pathname;
//   if (toggleRightSection && currentPath === "/mypage") {
//     toggleRightSection.style.display = "inline-block";
//   } else if (toggleRightSection) {
//     toggleRightSection.style.display = "none";
//   }

//   // 요소가 없으면 로그 출력 후 종료
//   if (!toggleRightSection || !leftSection || !rightSection || !navbar || !hamburger) {
//     console.error("Required elements not found:", {
//       toggleRightSection,
//       leftSection,
//       rightSection,
//       navbar,
//       hamburger,
//     });
//     return;
//   }

//   // 햄버거 메뉴 클릭 이벤트
//   hamburger.addEventListener("click", function () {
//     navbar.classList.toggle("show");
//   });

//   // "오늘의 식단" 버튼 클릭 이벤트
//   toggleRightSection.addEventListener("click", function (e) {
//     e.preventDefault(); // 기본 동작 방지
//     console.log("오늘의 식단 버튼 클릭됨"); // 디버그 로그

//     // 섹션 토글
//     if (rightSection.classList.contains("show")) {
//       rightSection.classList.remove("show");
//       leftSection.classList.remove("hidden");
//       console.log("왼쪽 섹션 표시, 오른쪽 섹션 숨김");
//     } else {
//       rightSection.classList.add("show");
//       leftSection.classList.add("hidden");
//       console.log("왼쪽 섹션 숨김, 오른쪽 섹션 표시");
//     }

//     // 모바일 환경에서 메뉴 닫기
//     if (window.innerWidth <= 768) {
//       navbar.classList.remove("show");
//     }
//   });

//   // 윈도우 크기 변경 시 메뉴 상태 초기화
//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 768) {
//       navbar.classList.remove("show");
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const currentPath = window.location.pathname;

//   const toggleRightSection = document.getElementById("toggle-right-section");
//   const leftSection = document.querySelector(".left-section");
//   const rightSection = document.querySelector(".right-section");
//   const navbar = document.querySelector(".navbar");
//   const hamburger = document.querySelector(".hamburger");

//   // "/mypage" 경로에서만 "오늘의 식단" 버튼 표시
//   if (toggleRightSection) {
//     toggleRightSection.style.display =
//       currentPath === "/mypage" ? "inline-block" : "none";
//   }

//   // 요소가 없으면 로그 출력 후 종료 ("/mypage" 이외의 페이지)
//   if (currentPath !== "/mypage") {
//     if (!navbar || !hamburger) {
//       console.error("Navbar elements not found:", {
//         navbar,
//         hamburger,
//       });
//     }
//     return;
//   }

//   // "/mypage" 전용 기능 - 요소 확인
//   if (!toggleRightSection || !leftSection || !rightSection) {
//     console.error("Required elements not found:", {
//       toggleRightSection,
//       leftSection,
//       rightSection,
//       navbar,
//       hamburger,
//     });
//     return;
//   }

//   // 햄버거 메뉴 클릭 이벤트
//   hamburger.addEventListener("click", function () {
//     navbar.classList.toggle("show");
//   });

//   // "오늘의 식단" 버튼 클릭 이벤트
//   toggleRightSection.addEventListener("click", function (e) {
//     e.preventDefault(); // 기본 동작 방지
//     console.log("오늘의 식단 버튼 클릭됨"); // 디버그 로그

//     // 섹션 토글
//     if (rightSection.classList.contains("show")) {
//       rightSection.classList.remove("show");
//       leftSection.classList.remove("hidden");
//       console.log("왼쪽 섹션 표시, 오른쪽 섹션 숨김");
//     } else {
//       rightSection.classList.add("show");
//       leftSection.classList.add("hidden");
//       console.log("왼쪽 섹션 숨김, 오른쪽 섹션 표시");
//     }

//     // 모바일 환경에서 메뉴 닫기
//     if (window.innerWidth <= 768) {
//       navbar.classList.remove("show");
//     }
//   });

//   // 윈도우 크기 변경 시 메뉴 상태 초기화
//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 768) {
//       navbar.classList.remove("show");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  const toggleRightSection = document.getElementById("toggle-right-section");
  const leftSection = document.querySelector(".left-section");
  const rightSection = document.querySelector(".right-section");
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");

  // "오늘의 식단" 버튼 가시성 처리
  if (toggleRightSection) {
    if (currentPath === "/mypage") {
      toggleRightSection.style.display = "inline-block"; // "/mypage"에서 버튼 표시
    } else {
      toggleRightSection.style.display = "none"; // 다른 경로에서 버튼 숨김
    }
  }

  // 모든 경로에서 햄버거 메뉴 작동
  if (hamburger && navbar) {
    hamburger.addEventListener("click", function () {
      navbar.classList.toggle("show");
    });

    // 윈도우 크기 변경 시 메뉴 상태 초기화
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navbar.classList.remove("show");
      }
    });
  } else {
    console.error("Navbar elements not found:", { navbar, hamburger });
  }

  // "/mypage" 경로에서만 "오늘의 식단" 기능 활성화
  if (currentPath === "/mypage") {
    if (!toggleRightSection || !leftSection || !rightSection) {
      console.error("Required elements not found:", {
        toggleRightSection,
        leftSection,
        rightSection,
      });
      return;
    }

    // "오늘의 식단" 버튼 클릭 이벤트
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

      // 모바일 환경에서 메뉴 닫기
      if (window.innerWidth <= 768) {
        navbar.classList.remove("show");
      }
    });
  }
});
