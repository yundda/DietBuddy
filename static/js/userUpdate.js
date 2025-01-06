const originalName = document.getElementById("name").value;
function isClick() {
  const pw1 = document.getElementById("password1");
  const pw2 = document.getElementById("password2");
  const caution = document.getElementById("caution");
  if (pw1.value.trim() === "") {
    caution.innerText = "※새 비밀번호를 먼저 입력해주세요.";
    pw2.disabled = true;
  } else {
    caution.innerText = "";
    pw2.disabled = false;
  }
}
function user_update() {
  const name = document.getElementById("name").value.trim();
  const pw1 = document.getElementById("password1").value.trim();
  const pw2 = document.getElementById("password2").value.trim();
  const date = new Date().toISOString().split("T")[0];

  const regPw = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  if (name == originalName && pw1 === "" && pw2 === "") {
    alert("수정 사항이 없습니다.");
    document.location.href = `/mypage`;
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
    .then((res) => {
      if (res.data.isSuccess) {
        alert("수정이 완료되었습니다.");
        document.location.href = `/mypage`;
      } else {
        document.location.href = "/404";
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          alert("요청 데이터가 잘못되었습니다. 다시 확인해주세요.");
        } else if (status === 404) {
          alert("요청한 리소스를 찾을 수 없습니다. URL을 확인해주세요.");
        } else if (status === 500) {
          alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert(`알 수 없는 오류가 발생했습니다. (상태 코드: ${status})`);
        }
      } else if (err.request) {
        alert(
          "서버에서 응답이 없습니다. 인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요."
        );
      } else {
        alert("요청을 처리하는 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
      }
    });
}
