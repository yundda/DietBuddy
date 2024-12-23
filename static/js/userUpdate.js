console.log("update axios 정상작동");
const originalName = document.getElementById("name").value;
function isClick() {
  const pw1 = document.getElementById("password1");
  const pw2 = document.getElementById("password2");
  if (pw1.value.trim() === "") {
    pw2.placeholder = "새 비밀번호를 먼저 입력해주세요";
    pw2.disabled = true;
  } else {
    pw2.placeholder = "비밀번호를 동일하게 입력해주세요";
    pw2.disabled = false;
  }
}
function user_update() {
  const name = document.getElementById("name").value.trim();
  const pw1 = document.getElementById("password1").value.trim();
  const pw2 = document.getElementById("password2").value.trim();

  // const findPw = document.getElementById("security-answer").value;
  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name == originalName && pw1 === "" && pw2 === "") {
    alert("수정 사항이 없습니다.");
    document.location.href = "/user";
    return;
  }
  if (name === "") {
    alert("이름을 입력해주세요.");
    return false;
  }
  if (pw1 !== "" && !regPw.test(pw1)) {
    alert("비밀번호는 영어 대소문자와 숫자를 포함한 8~20자리 글자여야 합니다.");
    return false;
  }
  if (pw1 !== pw2) {
    alert("비밀번호가 일치하지 않습니다.다시 확인해주세요.");
    return false;
  }

  // Axios 요청
  axios({
    method: "patch",
    url: "/user/patch",
    data: {
      name: name,
      pw: pw1,
    },
  })
    .then(() => {
      alert("수정이 완료되었습니다.");
      document.location.href = "/user";
    })
    .catch((err) => {
      console.log(err);
    });
}
