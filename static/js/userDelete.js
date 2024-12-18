function delete_user() {
  const ask = confirm("탈퇴하시겠습니까?");

  if (ask) {
    axios({
      method: "delete",
      url: "/deleteUser",
    })
      .then((res) => {
        if (res.data.isDelete) {
          alert("탈퇴되었습니다.");
        } else {
          alert("탈퇴 실패.");
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return false;
  }
}
