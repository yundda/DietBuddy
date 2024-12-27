document.getElementById("infModalLink").addEventListener("click", function (event) {
  event.preventDefault(); // 링크 기본 동작 방지
  document.getElementById("infModal").style.display = "flex"; // 모달 열기
});

document.getElementById("infCloseModal").addEventListener("click", function () {
  document.getElementById("infModal").style.display = "none"; // 모달 닫기
});

document.getElementById("infModal").addEventListener("click", function (event) {
  if (event.target === this) {
    this.style.display = "none"; // 모달 외부 클릭 시 닫기
  }
});
