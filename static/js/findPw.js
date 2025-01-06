function user_new_pw() {
  const email = document.getElementById("email").value;
  const pwQuestion = document.getElementById("security-question").value;
  const findPw = document.getElementById("security-answer").value;

  if (email === "") {
    alert("이메일을 입력해주세요.");
    return false;
  }
  if (pwQuestion === "") {
    alert("질문을 선택해주세요.");
    return false;
  }
  if (findPw === "") {
    alert("답변을 입력해주세요.");
    return false;
  }

  axios({
    method: "post",
    url: "/doFindpw",
    data: {
      email: email,
      pwQuestion: pwQuestion,
      findPw: findPw,
    },
  }).then((res) => {
    if (res.data.isFind) {
      document.location.href = "/user/pwUpdate";
    } else {
      alert(res.data.msg);
      return false;
    }
  });
}
