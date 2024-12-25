function delete_user() {
  const ask = confirm(
    "탈퇴하시겠습니까?\n회원 탈퇴시 이전 회원 정보 복구가 어려운 점 주위하시기 바랍니다"
  );

  if (ask) {
    axios({
      method: "delete",
      url: "user/delete",
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
