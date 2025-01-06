document.getElementById("infModalLink").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("infModal").style.display = "flex";
});

document.getElementById("infCloseModal").addEventListener("click", function () {
  document.getElementById("infModal").style.display = "none";
});

document.getElementById("infModal").addEventListener("click", function (event) {
  if (event.target === this) {
    this.style.display = "none";
  }
});
