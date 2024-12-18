function user_login() {
  const form = document.forms["login-form"];

  if (form.email.value === "") {
    alert("아이디(이메일)를 입력해주세요.");
    return false;
  }
  if (form.pw.value === "") {
    alert("비밀번호를 입력해주세요.");
    return false;
  }

  axios({
    method: "post",
    url: "/doLogin",
    data: {
      email: form.email.value,
      pw: form.pw.value,
    },
  }).then((result) => {
    if (result.data.isLogin) {
      alert("로그인 성공");
    } else {
      alert("로그인 실패!");
      return false;
    }
  });
}
