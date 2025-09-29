const backButton = document.querySelector('.back-btn');
if (backButton) {
    backButton.addEventListener('click', function() {
        // Lead back to the sign-in page
        window.location.href = 'screen3.html';
    });
}

/**
 * description: This file contains the JavaScript code for the sign-up page.
 * It uses the ScrollReveal library to create scroll animations for various elements on the page.
 * The animations are configured to originate from the bottom and slide in from the left for the body container.
 * The form container and submit button have delayed animations to create a staggered effect.
 */
const animationslides = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};
/**
 * description: The following code uses the ScrollReveal library to create scroll animations for various elements on the sign-up page.
 * The animations are configured to originate from the bottom and slide in from the left for the body container.
 * The form container and submit button have delayed animations to create a staggered effect.
 */
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
