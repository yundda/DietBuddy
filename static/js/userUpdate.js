console.log("update axios 정상작동");

function user_update() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pw = document.getElementById("password").value;
  const findPw = document.getElementById("security-answer").value;
  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name === "") {
    alert("이름을 입력해 주세요.");
    return false;
  }
  if (findPw === "") {
    alert("비밀번호 확인 답변을 입력해 주세요.");
    return false;
  }
  if (pw !== "" && !regPw.test(pw)) {
    alert("비밀번호는 영어 대소문자와 숫자를 포함한 8~20자리 글자여야 합니다.");
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
      if (result.data.success) {
        alert("회원 정보가 수정되었습니다.");
        document.location.href = "/user";
      } else {
        alert(result.data.msg);
        console.log("Update failed:", result.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
