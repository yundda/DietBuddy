function user_new_pw() {
  const form = document.forms["new-password"];

  axios({
    method: "post",
    url: "/doFindpw",
    data: {
      email: form.email.value,
      findPw: form.findPw.value,
    },
  }).then((res) => {
    if (res.data.isFind) {
      //아직 미완성
      //새 비밀번호를 입력하는 모달 창을 띄우거나
      //페이지로 이동한다
      alert(res.data.msg);
      return false;
    } else {
      alert(res.data.msg);
      return false;
    }
  });
  //비번 찾고 다시 로그인 화면으로!
}
