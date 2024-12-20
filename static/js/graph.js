var options = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "20%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "탄수화물",
      data: [
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80, 20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
      ],
      color: "#FFCE56",
    },
    {
      name: "단백질",
      data: [
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80, 20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
      ],
      color: "#FF6384",
    },
    {
      name: "지방",
      data: [
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80, 20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
        20, 30, 25, 35, 50, 40, 50, 60, 70, 80,
      ],
      color: "#36A2EB",
    },
  ],
  xaxis: {
    categories: [
      "1일",
      "2월",
      "3월",
      "4월",
      "5월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
    ],
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "bottom",
    horizontalAlign: "left",
    offsetX: -20,
    offsetY: 10,
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
