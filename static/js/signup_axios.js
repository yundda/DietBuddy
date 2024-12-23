console.log("signup axios 정상작동");

function user_signup() {
  //유효성 체크
  //이름, 이메일, 비밀번호, 보안문자를 전부 입력했는지 확인한다.

  // const form = document.forms["signup-form"];
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;
  const confirmPw = document.getElementById("confirm-password").value;
  const findPw = document.getElementById("security-answer").value;
  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name === "") {
    alert("이름을 입력해 주세요.");
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
  if (findPw === "") {
    alert("보안문자를 입력해 주세요.");
    return false;
  }
  axios({
    method: "post",
    url: "/doSignup",
    data: {
      name: name,
      email: email,
      pw: pw,
      findPw: findPw,
    },
  })
    .then((result) => {
      //이 안에는 create 결과로 전송된 데이터가 담긴다.
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
