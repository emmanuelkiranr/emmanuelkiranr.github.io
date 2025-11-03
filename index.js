const sections = document.querySelectorAll("section");
const navigation = document.querySelector("nav").querySelectorAll("a");

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
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));
