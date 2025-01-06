function user_logout() {
  const ask = confirm("로그아웃 하시겠습니까?");

  if (ask) {
    axios({
      method: "post",
      url: "/user/logout",
    }).then((res) => {
      if (res.data.isOut) {
        document.location.href = "/";
      }
    });
  } else {
    return false;
  }
}
