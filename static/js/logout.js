function user_logout() {
  const ask = confirm("로그아웃 하시겠습니까?");

  if (ask) {
    axios({
      method: "get", //세션 지우는 건데 이걸로 보내는 게 맞나? delete로 보내야 하나?
      url: "/logout",
    }).then((res) => {
      if (res.data.isOut) {
        alert("로그아웃이 완료되었습니다.");
        document.location.href = "/logout"; //로그아웃 페이지로 이동
      }
    });
  } else {
    return false;
  }
}