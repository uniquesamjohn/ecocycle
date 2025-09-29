const animationslides = {
  origin: "bottom",
  distance: "50px",
  duration: "1000",
};

ScrollReveal().reveal(".body-container", {
  ...animationslides,
  origin: "left",
});
ScrollReveal().reveal(".form-container", {
  ...animationslides,
  delay: 1000,
});
ScrollReveal().reveal(".submit-btn", {
  ...animationslides,
  delay: 1500,
});
