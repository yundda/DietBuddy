function user_new_pw() {
  // 이메일과 답변이 서버에 저장된 값과 같다면
  // 새로운 비번 바꿀 수 있는 새 창을 보여주고 -> 확인 누르면 로그인화면으로
  // 만약 답변과 이메일이 맞지 않다면 얼럿 띄워주기

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
  //비번 찾고 다시 로그인 화면으로!
}
