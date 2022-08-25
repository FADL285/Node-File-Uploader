const filePickerEl = document.getElementById("avatar");
const imagePreviewEl = document.getElementById("image-preview");

const showPreview = () => {
  const files = filePickerEl.files;
  if (!files || files.length === 0) {
    imagePreviewEl.style.display = "none";
    return;
  }

  const filePicked = files[0];
  imagePreviewEl.src = URL.createObjectURL(filePicked);
  imagePreviewEl.style.display = "block";
};

filePickerEl.addEventListener("change", showPreview);
