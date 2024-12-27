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
  
