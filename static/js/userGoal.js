// 사용자 이름
const goalMessageElement = document.getElementById("goal-message");
const username = goalMessageElement.getAttribute("data-username");
const isSettingGoals = goalMessageElement.getAttribute("data-is-setting-goal") === "true";
const goalSettingDate = goalMessageElement.getAttribute("data-goal-setting-date");

if (isSettingGoals) {
  // 목표 날짜가 설정된 경우
  const today = new Date();
  const goalDate = new Date(goalSettingDate);

  // D-Day 계산
  const remainingDays = Math.ceil((goalDate - today) / (1000 * 60 * 60 * 24));

  if (remainingDays > 0) {
    goalMessageElement.textContent = `${username} 님의 목표 달성까지 ${remainingDays}일 남았어요!`;
  } else if (remainingDays === 0) {
    goalMessageElement.textContent = `${username} 님의 목표 달성일이 오늘입니다!`;
  } else {
    goalMessageElement.textContent = `${username} 님의 목표 달성일이 지났습니다!`;
  }
} else {
  // 목표 날짜가 설정되지 않은 경우
  goalMessageElement.textContent = `${username} 님, 목표를 설정해주세요!`;
}

//목표 칼로리
document.addEventListener("DOMContentLoaded", () => {
  const kcalCard = document.querySelector(".goal-card.kcal-card");
  const calorieLabelsContainer = document.querySelector(".calorie-labels");
  const progressBar = document.querySelector(".calorie-progress");
  const indicator = document.querySelector(".calorie-indicator");

  // data-* 속성 값 가져오기
  const currentCalorie = parseInt(kcalCard.dataset.currentCalorie, 10) || 0;
  const maxCalorie = parseInt(kcalCard.dataset.maxCalorie, 10) || 0;
  const steps = 5; // 라벨 구간 수

  // 라벨 초기화
  calorieLabelsContainer.innerHTML = "";

  // 구간 간격 계산
  const interval = Math.round(maxCalorie / (steps - 1));

  // Label 추가
  for (let i = 0; i < steps; i++) {
    const labelValue = interval * i;
    const span = document.createElement("span");
    span.textContent = `${labelValue}kcal`;
    calorieLabelsContainer.appendChild(span);
  }

  // 진행률 계산
  const progressPercentage = maxCalorie ? (currentCalorie / maxCalorie) * 100 : 0;

  // 최대 진행률 제한
  const limitedProgress = Math.min(progressPercentage, 100);

  // Progress Bar 및 Indicator 업데이트
  progressBar.style.width = `${limitedProgress}%`; // Progress Bar 길이
  indicator.style.left = `${limitedProgress}%`; // Indicator 위치

  // 섭취량 초과 시 Indicator 색상 변경
  if (currentCalorie > maxCalorie) {
    indicator.style.background = "green";
  } else {
    indicator.style.background = "red";
  }
});

// 몸무게 그래프
document.addEventListener("DOMContentLoaded", () => {
  const weightCard = document.querySelector(".goal-card.weight-card");
  const weightLabelsContainer = weightCard.querySelector(".weight-labels");
  const weightIndicator = weightCard.querySelector(".weight-indicator");

  const currentWeight = parseFloat(weightCard.dataset.currentWeight) || 0;

  // ±5kg 범위 설정
  const minWeight = currentWeight - 5; // 현재 몸무게 - 5kg
  const maxWeight = currentWeight + 5; // 현재 몸무게 + 5kg

  // 그래프 초기화
  weightLabelsContainer.innerHTML = "";

  // 라벨 추가: 65kg, 70kg, 75kg
  const labels = [minWeight, currentWeight, maxWeight]; // 라벨 값 배열
  labels.forEach((weight) => {
    const span = document.createElement("span");
    span.textContent = `${weight}kg`;
    weightLabelsContainer.appendChild(span);
  });

  // 인디케이터 위치 계산 (0% ~ 100%)
  const range = maxWeight - minWeight;
  const currentPercentage = ((currentWeight - minWeight) / range) * 100;

  // 현재 몸무게 인디케이터
  weightIndicator.style.left = `${Math.min(Math.max(currentPercentage, 0), 100)}%`;
  weightIndicator.style.background = "red"; // 현재 몸무게 색상
});

// 모달 열기, 닫기
document.addEventListener("DOMContentLoaded", () => {
  const addMealBtn = document.getElementById("add-meal-btn");
  const modalOverlay = document.getElementById("modal-overlay");
  const cancelBtn = document.getElementById("cancel-btn");

  addMealBtn.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modalOverlay.style.display = "none";
    }
  });
});

//식단 추가
document.addEventListener("DOMContentLoaded", () => {
  const mealTypeButtons = document.querySelectorAll(".meal-type-group button");
  const mealForm = document.getElementById("meal-form");
  const overlay = document.getElementById("modal-overlay");
  let selectedMealType = null;

  // 식사 타입 버튼 클릭 이벤트
  mealTypeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // 모든 버튼에서 selected 클래스 제거
      mealTypeButtons.forEach((btn) => btn.classList.remove("selected"));

      // 클릭한 버튼에만 selected 클래스 추가
      button.classList.add("selected");

      // 선택된 식사 타입 설정
      const mealTypeMap = ["breakfast", "lunch", "dinner", "btwmeal"];
      selectedMealType = mealTypeMap[index]; // 인덱스로 mealtime 매핑
      console.log(`선택된 식사 타입: ${selectedMealType}`);
    });
  });

  // 폼 제출 처리
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 입력된 데이터 가져오기
    const carbohydrate = document.getElementById("carbohydrate").value.trim();
    const protein = document.getElementById("protein").value.trim();
    const fat = document.getElementById("fat").value.trim();

    // 유효성 검사
    if (!selectedMealType) {
      alert("식사 종류를 선택해주세요.");
      return;
    }
    if (!carbohydrate || !protein || !fat) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (
      isNaN(parseFloat(carbohydrate)) ||
      isNaN(parseFloat(protein)) ||
      isNaN(parseFloat(fat))
    ) {
      alert("모든 입력값을 숫자로 입력해주세요.");
      return;
    }

    const sessionId = document.body.dataset.sessionId;

    // 서버에 데이터 전송
    fetch("/user/dailyIntake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: sessionId,
        mealtime: selectedMealType,
        carbo: parseFloat(carbohydrate),
        protein: parseFloat(protein),
        fat: parseFloat(fat),
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("식사 정보가 추가되었습니다.");
          overlay.style.display = "none";
          window.location.reload();
        } else {
          throw new Error("데이터 전송 실패");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  });
});

// 식단 데이터 렌더링
const renderMealInfo = (data) => {
  const mealInfo = document.getElementById("meal-info");
  mealInfo.innerHTML = ""; // 초기화

  const mealTypes = {
    breakfast: { name: "아침", icon: "meal.png" },
    lunch: { name: "점심", icon: "meal.png" },
    dinner: { name: "저녁", icon: "meal.png" },
    btwmeal: { name: "간식", icon: "snack.png" },
  };

  Object.entries(data).forEach(([key, meals]) => {
    if (meals && meals.length > 0) {
      const section = document.createElement("div");
      section.className = "meal-section";

      const mealType = mealTypes[key] || {
        name: "알 수 없는 식사 유형",
        icon: "default.png",
      };

      // 섹션 제목과 아이콘 추가
      section.innerHTML = `
        <h3>
          <img src="../static/img/${mealType.icon}" alt="${mealType.name} 아이콘" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;">
          ${mealType.name}
        </h3>
      `;

      meals.forEach((meal) => {
        const mealItem = document.createElement("div");
        mealItem.className = "meal-item";
        mealItem.innerHTML = `
          <p>탄수화물: ${meal.carbo}g 단백질: ${meal.protein}g 지방: ${meal.fat}g</p>
          <p>칼로리: ${meal.cal}kcal</p>
        `;
        section.appendChild(mealItem);
      });

      mealInfo.appendChild(section);
    }
  });

  if (mealInfo.innerHTML === "") {
    mealInfo.innerHTML = "<p>등록된 식단이 없습니다.</p>";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const dateList = document.getElementById("date-list");
  const mealInfo = document.getElementById("meal-info");

  const bodyElement = document.body;
  const todayIntakeData = bodyElement.getAttribute("data-today-intake");
  const todayIntake = JSON.parse(todayIntakeData);

  renderMealInfo({
    breakfast: todayIntake.todayBreakfast,
    lunch: todayIntake.todayLunch,
    dinner: todayIntake.todayDinner,
    btwmeal: todayIntake.todayBtwmeal,
  });

  // 날짜 버튼 렌더링
  const renderDateButtons = (dates) => {
    const today = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }); // 한국 기준 날짜 YYYY-MM-DD

    dates.forEach((date) => {
      const dateButton = document.createElement("button");
      const formattedDate = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const buttonText = `${date.getMonth() + 1}/${date.getDate()}`;
      dateButton.textContent = buttonText;
      dateButton.dataset.date = formattedDate;

      // 오늘 날짜 버튼 활성화
      if (formattedDate === today) {
        dateButton.classList.add("active");
        fetchMealData(formattedDate);
      }

      dateButton.addEventListener("click", () => {
        Array.from(dateList.children).forEach((btn) => btn.classList.remove("active"));

        dateButton.classList.add("active");

        fetchMealData(formattedDate);
      });

      dateList.appendChild(dateButton);
    });
  };

  // 식단 데이터 가져오기
  const fetchMealData = (selectedDate) => {
    fetch(`/todayIntake?date=${selectedDate}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Server Error: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("API 응답 데이터:", data);
        renderMealInfo(data);
      })
      .catch((err) => {
        console.error("Error fetching meal data:", err.message);
        mealInfo.innerHTML = "<p>식단 데이터를 불러올 수 없습니다.</p>";
      });
  };

  // 날짜 버튼 생성
  const dates = generateDatesForMonth();
  renderDateButtons(dates);
});

// 날짜 생성 함수 (한 달 단위)
const generateDatesForMonth = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 해당 월의 첫 번째 날
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 해당 월의 마지막 날

  const dates = [];
  for (
    let d = new Date(firstDayOfMonth);
    d <= lastDayOfMonth;
    d.setDate(d.getDate() + 1)
  ) {
    dates.push(new Date(d));
  }

  return dates;
};
