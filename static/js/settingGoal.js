const calc_BMR = (gender, weight, height, age) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};
const calc_AMR = (BMR, activelevel) => {
  return Math.round(BMR * activelevel);
};

const calc_intake = (AMR, weight, goalWeight, period) => {
  return Math.round(AMR - ((weight - goalWeight) * 7000) / period);
};

// 유효성 검사
function handleSubmit(event) {
  // event.preventDefault();
  const form = document.forms["goal-form"];
  if (!form) {
    console.error("Form not found!");
    return false;
  }
  const weight = form.weight.value.trim();
  const height = form.height.value.trim();
  const age = form.age.value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value || null;
  const activeLevel =
    document.querySelector(".activity-levels .selected")?.getAttribute("value") || null;
  const goalWeight = form["target-weight"].value.trim();
  const period = form["goal-date"].value;
  const calcedBMR = calc_BMR(gender, weight, height, age);
  const calcedAMR = calc_AMR(calcedBMR, activeLevel);
  const calcedIntake = calc_intake(calcedAMR, weight, goalWeight, period);

  if (calcedBMR - calcedIntake > 300) {
    // alert 창 경고 후, 정보 제출 X (더 이상 진행 불가)
    alert(
      "무리한 감량 목표로 진행할 수 없습니다! 급격한 다이어트는 건강에 해로워요ㅠ^ㅠ 진행을 위해 3가지의 방법을 제안해드릴게요! 1. 활동량 늘리기 2. 감량 목표 낮추기 3. 감량 기간 늘리기 옵션 사항을 바꾼 후 다시 시도해주세요!"
    );
  } else if (calcedIntake < calcedBMR) {
    const userPesponse = confirm(
      "기초대사량보다 적게 섭취 시, 근손실, 탈모 등을 유발할 수 있으며 요요를 초래할 수 있습니다! 재설정을 원하시면 취소버튼을 눌러주세요! 확인을 누르시면 목표 설정이 완료됩니다!"
    );
    if (userPesponse) {
      user_goal();
    } else {
      alert(
        "3가지의 방법을 제안해드릴게요! 1. 활동량 늘리기 2. 감량 목표 낮추기 3. 감량 기간 늘리기 "
      );
    }
    // alert 창 띄우고 확인 누르면 진행, 취소 누르면 제출 x
    // alert("")
    // if(취소){ 정보 제출 x } else{ POST '/user/settingGoal' - axios - 모든 정보 전달}
  } else {
    user_goal();
  }
}

// 데이터 처리 함수
function user_goal() {
  try {
    const form = document.forms["goal-form"];
    if (!form) {
      console.error("Form not found!");
      return;
    }

    // const getSelectedActivityLevel = () => {
    //   const selectedButton = document.querySelector(".activity-levels .selected");
    //   return selectedButton ? selectedButton.getAttribute("value") : null;
    // };

    const data = {
      weight: form.weight.value.trim(),
      height: form.height.value.trim(),
      age: form.age.value.trim(),
      gender: document.querySelector('input[name="gender"]:checked')?.value || null,
      activeLevel:
        document.querySelector(".activity-levels .selected")?.getAttribute("value") ||
        null,

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
      url: "/user/settingGoal",
      data: data,
    })
      .then((result) => {
        if (result.data) {
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
const setupSingleSelect = (selector) => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      console.log(`Selected button in ${selector}: ${button.textContent}`);
    });
  });
};
setupSingleSelect(".diet-goal");
setupSingleSelect(".activity-level");

// DOM 로드 후 이벤트 리스너 등록
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM fully loaded and parsed.");

// const form = document.forms["goal-form"];
// if (!form) {
//   console.error("Form not found!");
//   return;
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("Form submitted!");
//   user_goal();
// });
