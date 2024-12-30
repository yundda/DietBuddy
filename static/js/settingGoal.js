// 모달 관련 요소 가져오기
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

// 모달 보여주기 위한 함수
function showModal(message, onConfirm, severe = false) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");

  // 계산값에 따라 버튼을 숨기기 위해 버튼 display 스타일을 비워두는 것
  confirmBtn.style.display = severe ? "none" : "inline-block";
  cancelBtn.style.display = severe ? "none" : "inline-block";

  if (severe) {
    // 사용자가 목표 설정을 위해 입력한 값을 변경하기 위한 버튼 동작
    confirmBtn.style.display = "inline-block"; // 확인 버튼 재활용
    confirmBtn.textContent = "수정하기";
    confirmBtn.onclick = () => {
      modal.classList.add("hidden"); // 데이터 전송하지 않고 모달 닫기- 사용자가 입력한 값은 그대로 남는다
    };
  } else {
    // 기본 "확인", "취소" 버튼 동작 설정
    confirmBtn.textContent = "확인";
    confirmBtn.onclick = () => {
      modal.classList.add("hidden");
      onConfirm(); // 확인 버튼 눌렀을 때 실행
    };

    cancelBtn.onclick = () => {
      modal.classList.add("hidden"); // 취소 버튼 눌렀을 때 숨김
    };
  }
}

// BMR 계산 함수
const calc_BMR = (gender, weight, height, age) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// AMR 계산 함수
const calc_AMR = (BMR, activelevel) => {
  return Math.round(BMR * activelevel);
};

// 권장 섭취량 계산 함수
const calc_intake = (AMR, weight, goalWeight, period) => {
  return Math.round(AMR - ((weight - goalWeight) * 7000) / period);
};

// 제출버튼 함수
function handleSubmit(event) {
  const form = document.forms["goal-form"];
  if (!form) {
    console.error("폼을 찾을 수 없습니다.확인이 필요합니다");
    return;
  }
  const weight = parseFloat(form.weight.value.trim());
  const height = parseFloat(form.height.value.trim());
  const age = parseInt(form.age.value.trim());
  const gender = document.querySelector('input[name="gender"]:checked')?.value || null;
  const activeLevel = parseFloat(
    document.querySelector(".activity-levels .selected")?.getAttribute("value") || null
  );
  const goalWeight = parseFloat(form["target-weight"].value.trim());
  const period = parseInt(form["goal-date"].value.trim());

  const calcedBMR = calc_BMR(gender, weight, height, age);
  const calcedAMR = calc_AMR(calcedBMR, activeLevel);
  const calcedIntake = calc_intake(calcedAMR, weight, goalWeight, period);

  if (calcedBMR - calcedIntake > 300) {
    // 너무 과한 경우 경고문을 올려 입력값을 수정 버튼이 보인다
    showModal(
      "😥 감량 목표가 너무 과합니다\n" +
        "✔️활동량을 늘리거나, 목표 체중을 수정해보세요\n" +
        "✔️기간을 늘려 더 안전하게 진행할 수 있습니다😊",
      null, // onConfirm 없으므로 다음 단계 진행 없음
      true // severe=true: 버튼 하나만 표시
    );
  } else if (calcedIntake < calcedBMR) {
    // 조금 과한 경우 경고문을 올리고 사용자가 진행할지 최소할지 선택가능기능
    showModal(
      "🤔기초대사량보다 적은 섭취량은 건강에 해로울 수 있습니다\n" +
        "✔️ 확인 버튼을 누르면 목표 설정이 진행됩니다\n" +
        "✖️ 수정을 원하시면 최소 버튼을 눌러주세요😊\n" +
        "< 활동량/목표 기간을 늘리거나 목표 체중을 수정하시면 안전하게 진행할 수 있습니다 >",
      () => {
        console.log("사용자가 위험성을 확인하고 진행을 선택했습니다.");
        user_goal(); // 목표 설정 진행
      },
      false // severe=false: 기본 버튼 표시
    );
  } else {
    user_goal();
  }
}

// 데이터 처리 함수
function user_goal() {
  const form = document.forms["goal-form"];
  if (!form) {
    console.error("폼을 찾을 수 없습니다. 확인이 필요합니다");
    return;
  }

  const data = {
    weight: form.weight.value.trim(),
    height: form.height.value.trim(),
    age: form.age.value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.value || null,
    activeLevel:
      document.querySelector(".activity-levels .selected")?.getAttribute("value") || null,
    goalWeight: form["target-weight"].value.trim(),
    period: form["goal-date"].value.trim(),
    dietGoal:
      document.querySelector(".diet-goals .selected")?.getAttribute("value") || null,
  };

  console.log("저장된 데이터:", data);

  axios
    .post("/user/settingGoal", data)
    .then((result) => {
      if (result.data) {
        alert("목표 설정이 완료되었습니다.");
        document.location.href = "/mypage";
      } else {
        alert("목표 설정 실패.");
      }
    })
    .catch((err) => {
      console.error("오류가 발생했습니다:", err);
    });
}

// 버튼 선택 기능 초기화
const setupSingleSelect = (selector) => {
  const buttons = document.querySelectorAll(selector);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      console.log(`${selector} 목록에서 선택된 요소는: ${button.textContent}`);
    });
  });
};

// 초기화
setupSingleSelect(".diet-goal");
setupSingleSelect(".activity-level");
