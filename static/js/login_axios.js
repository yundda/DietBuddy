function user_login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  if (email === "") {
    alert("아이디(이메일)를 입력해주세요.");
    return false;
  }
  if (password === "") {
    alert("비밀번호를 입력해주세요.");
    return false;
  }

  axios({
    method: "post",
    url: "/doLogin",
    data: {
      email: email,
      pw: password,
    },
  })
    .then((response) => {
      if (response.data.isLogin) {

        window.location.href = "/mypage";

      } else {
        errorMsg.style.display = "block";
        errorMsg.textContent = response.data.msg;
      }
    })
    .catch((error) => {
      errorMsg.style.display = "block";
      errorMsg.textContent = "로그인에 실패했습니다.";
      console.log("로그인 에러", error);
    });
}
