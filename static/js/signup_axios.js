console.log("signup axios 정상작동");

function user_signup() {
  //유효성 체크
  //이름, 이메일, 비밀번호, 보안문자를 전부 입력했는지 확인한다.

  const form = document.forms["signup-form"];
  const regPw = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (form.name.value === "") {
    alert("이름을 입력해 주세요.");
    return false;
  }
  if (form.email.value === "") {
    alert("이메일을 입력해 주세요.");
    return false;
  }
  if (form.pw.value === "") {
    alert("비밀번호를를 입력해 주세요.");
    return false;
  }
  if (!form.pw.value.test(regPw)) {
    alert("비밀번호는 영어대소문자와 숫자 중 하나를 포함하고 있어야 합니다.");
  }
  if (form.pw.value.length < 8 || form.pw.value.length > 20) {
    alert("비밀번호는 8자리 이상 20자리 이하여야 합니다.");
  }
  if (form.findPw.value === "") {
    alert("보안문자를를 입력해 주세요.");
    return false;
  }
  axios({
    method: "post",
    url: "/doSignup", //임시로 지은 url 이름
    data: {
      name: form.name.value,
      email: form.email.value,
      pw: form.pw.value,
      findPw: form.secureStr.value,
    },
  })
    .then((result) => {
      //이 안에는 create 결과로 전송된 데이터가 담긴다.
      if (result.data.isCreate) {
        alert("회원가입이 완료되었습니다.");
        document.location.href = "/login";
      } else {
        alert("회원가입 실패.");
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
