function user_new_pw() {
  const form = document.forms["new-password"];

  axios({
    method: "post",
    url: "/newPassword",
    data: {
      //   email: form.email.value,
      findPw: form.findPw.value,
    },
  }).then((result) => {
    if (result.data.isReset) {
      //아직 미완성
      //새 비밀번호를 입력하는 모달 창을 띄우거나
      //페이지로 이동한다
    } else {
      alert("정답이 아닙니다.");
      return false;
    }
  });
}
