console.log("update axios 정상작동");

function user_update() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pw1 = document.getElementById("password1").value;
  const pw2 = document.getElementById("password2").value;

  const findPw = document.getElementById("security-answer").value;
  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name === "") {
    alert("이름을 입력해 주세요.");
    return false;
  }
  // if (findPw === "") {
  //   alert("비밀번호 확인 답변을 입력해 주세요.");
  //   return false;
  // }
  if (pw1 !== "" && !regPw.test(pw1)) {
    alert("비밀번호는 영어 대소문자와 숫자를 포함한 8~20자리 글자여야 합니다.");
    return false;
  }
  if (!pw1 === pw2) {
    alert("비밀번호가 일치하지 않습니다.다시 확인해주세요.");
    return false;
  }

  // Axios 요청
  axios({
    method: "patch",
    url: "/user/patch",
    data: {
      name: name,
      pw: pw,
      findPw: findPw,
    },
  })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
