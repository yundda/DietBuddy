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
      console.log("뭐냐ㅐ!!", response.data.isLogin);

      if (response.data.isLogin) {
        console.log("로그인 성공!");
        window.location.href = "/user";
      } else {
        console.log("로그인 실패!");
        errorMsg.textContent = "로그인에 실패했습니다.";
      }
    })
    .catch((error) => {
      errorMsg.style.display = "block";
      errorMsg.textContent = "로그인에 실패했습니다.";
      console.log("로그인 에러", error);
    });
}
