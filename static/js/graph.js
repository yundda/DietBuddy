document.addEventListener("DOMContentLoaded", () => {
  const monthSelect = document.getElementById("month-select");
  const chartContainer = document.querySelector("#chart");

  // 차트 초기화 함수
  const initChart = (data) => {
    const seriesData = {
      carbs: [],
      protein: [],
      fat: [],
      categories: [],
    };

    data.forEach((entry) => {
      seriesData.carbs.push(entry.cumCarbo || 0);
      seriesData.protein.push(entry.cumProtein || 0);
      seriesData.fat.push(entry.cumFat || 0);
      seriesData.categories.push(`${new Date(entry.intakeDate).getDate()}일`);
    });

    // ApexCharts 옵션
    const options = {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      series: [
        { name: "탄수화물", data: seriesData.carbs, color: "#FFCE56" },
        { name: "단백질", data: seriesData.protein, color: "#FF6384" },
        { name: "지방", data: seriesData.fat, color: "#36A2EB" },
      ],
      xaxis: {
        categories: seriesData.categories,
      },
    };

    chartContainer.innerHTML = "";
    const chart = new ApexCharts(chartContainer, options);
    chart.render();
  };

  // 유효한 달 불러오기
  fetch("/user/validMonths")
    .then((response) => response.json())
    .then((validMonths) => {
      monthSelect.innerHTML = "";

      // 유효한 달 추가
      validMonths.forEach(({ year, month }) => {
        const option = document.createElement("option");
        const monthValue = String(month).padStart(2, "0");
        option.value = `${year}-${monthValue}`;
        option.textContent = `${year}년 ${monthValue}월`;
        monthSelect.appendChild(option);
      });

      if (validMonths.length > 0) {
        const initialMonth = `${validMonths[0].year}-${String(
          validMonths[0].month
        ).padStart(2, "0")}`;
        monthSelect.value = initialMonth;

        fetch(`/user/intake/monthly?month=${initialMonth}`)
          .then((response) => response.json())
          .then((data) => initChart(data))
          .catch((err) => console.error("Error fetching initial data:", err));
      }
    })
    .catch((err) => console.error("Error fetching valid months:", err));

  // 월 선택 이벤트 처리
  monthSelect.addEventListener("change", () => {
    const selectedMonth = monthSelect.value;

    fetch(`/user/intake/monthly?month=${selectedMonth}`)
      .then((response) => response.json())
      .then((data) => initChart(data))
      .catch((err) => console.error("Error fetching data:", err));
  });
});
