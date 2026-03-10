document.querySelectorAll(".icons").forEach((icon) => {
  icon.addEventListener("click", function () {
    document
      .querySelectorAll(".icons")
      .forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});
