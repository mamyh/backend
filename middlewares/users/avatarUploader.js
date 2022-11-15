function avatarUploader() {
  const avatar = uploader(
    "avatar",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "jpeg,jpg or png are allowed"
  );
}
