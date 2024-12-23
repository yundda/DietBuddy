// 데이터 처리 함수
function user_goal() {
  try {
    const form = document.forms["goal-form"];
    if (!form) {
      console.error("Form not found!");
      return;
    }

    const getSelectedActivityLevel = () => {
      const selectedButton = document.querySelector(".activity-levels .selected");
      return selectedButton ? selectedButton.getAttribute("value") : null;
    };

    const data = {
      weight: form.weight.value.trim(),
      height: form.height.value.trim(),
      age: form.age.value.trim(),
      gender: document.querySelector('input[name="gender"]:checked')?.value || null,
      activeLevel: getSelectedActivityLevel(),
      goalWeight: form["target-weight"].value.trim(),
      period: form["goal-date"].value,
      dietGoal:
        document.querySelector(".diet-goals .selected")?.getAttribute("value") || null,
    };

    console.log("Collected Form Data:", data);

    if (!data.activeLevel) {
      alert("활동 수준을 선택해주세요.");
      console.log("Activity level not selected.");
      return;
    }

    axios({
      method: "post",
      url: "/user/settingGoal", // 라우터에 맞춘 경로
      data: data,
    })
      .then((result) => {
        if (result.data.isCreate) {
          alert("목표 설정이 완료되었습니다.");
          console.log("Server response:", result.data);
          document.location.href = "/user";
        } else {
          alert("목표 설정 실패.");
          console.log("Server response (failure):", result.data);
        }
      })
      .catch((err) => {
        console.error("오류 발생:", err);
      });
  } catch (error) {
    console.error("Error in user_goal function:", error);
  }
}

// DOM 로드 후 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");

  const form = document.forms["goal-form"];
  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", (e) => {
    //e.preventDefault();
    console.log("Form submitted!");
    user_goal();
  });

  // 버튼 선택 로직
  const setupSingleSelect = (selector) => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        //e.preventDefault();
        buttons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        console.log(`Selected button in ${selector}: ${button.textContent}`);
      });
    });
  };
  setupSingleSelect(".diet-goal");
  setupSingleSelect(".activity-level");
});

