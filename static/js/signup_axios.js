function isClick() {
  const pw = document.getElementById("password");
  const confirmPw = document.getElementById("confirm-password");
  const caution = document.getElementById("caution");
  if (pw.value.trim() === "") {
    caution.innerText = "※새 비밀번호를 먼저 입력해주세요.";
    confirmPw.disabled = true;
  } else {
    caution.innerText = "";
    confirmPw.disabled = false;
  }
}
function user_signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value.trim();
  const confirmPw = document.getElementById("confirm-password").value.trim();
  const pwQuestion = document.getElementById("security-question").value.trim();
  const findPw = document.getElementById("security-answer").value.trim();
  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name === "") {
    alert("이름을 입력해 주세요.");
    return false;
  }
  if (name.length > 15) {
    alert("이름은 15자 이하로 설정해 주세요.");
    return false;
  }
  if (email === "") {
    alert("이메일을 입력해 주세요.");
    return false;
  }
  if (pw === "") {
    alert("비밀번호를를 입력해 주세요.");
    return false;
  }
  if (pw !== confirmPw) {
    alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
    return false;
  }
  if (!regPw.test(pw)) {
    alert(
      "비밀번호는 영어대소문자와 숫자 중 하나를 포함하고 있는 8자리 이상 20자리 이하 글자여야야 합니다."
    );
    return false;
  }
  if (pwQuestion === "") {
    alert("질문을 선택해주세요.");
    return false;
  }
  if (findPw === "") {
    alert("보안문자를 입력해 주세요.");
    return false;
  }
  if (findPw.length > 255) {
    alert("질문은은 255자 이하로 답변해주세요.");
    return false;
  }
  axios({
    method: "post",
    url: "/doSignup",
    data: {
      name: name,
      email: email,
      pw: pw,
      pwQuestion: pwQuestion,
      findPw: findPw,
    },
  })
    .then((result) => {
      if (result.data.isCreate) {
        alert("회원가입이 완료되었습니다.");
        document.location.href = "/login";
      } else {
        alert(result.data.msg);
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
