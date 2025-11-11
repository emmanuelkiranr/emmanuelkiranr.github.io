const sections = document.querySelectorAll("section");
const navigation = document.querySelector("nav").querySelectorAll("a");
const toggleBtn = document.querySelector(".toggle-menu");
const navlist = document.querySelector(".nav-list");
const iframe = document.getElementById("linkedin-embed");
const embedError = document.querySelector(".blocked");

let loaded = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navigation.forEach((nav) => {
          nav.classList.remove("active");
          if (nav.getAttribute("href") === `#${entry.target.id}`) {
            nav.classList.add("active");
          }
        });
        history.replaceState(null, "", `#${entry.target.id}`);
        if (toggleBtn.getAttribute("aria-expanded") === "true") {
          toggleBtn.setAttribute("aria-expanded", "false");
          navlist.classList.toggle("open");
        }
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((section) => observer.observe(section));

toggleBtn.addEventListener("click", () => {
  const isOpen = toggleBtn.getAttribute("aria-expanded") === "true" || false;
  toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  navlist.classList.toggle("open");
});

iframe.onload = () => {
  loaded = true;
};

iframe.onerror = () => {
  showError();
};

setTimeout(() => {
  if (!loaded) {
    showError();
  }
}, 4000);

function showError() {
  embedError.style.display = "block";
}
