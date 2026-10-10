const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let preference;
try {
  preference = localStorage.getItem("theme");
} catch {
  /* Storage may be unavailable. */
}
function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(dark));
  toggle.setAttribute(
    "aria-label",
    `Switch to ${dark ? "light" : "dark"} theme`,
  );
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#17161c"
    : "#f6f5f8";
}
applyTheme(
  preference === "light" || preference === "dark"
    ? preference
    : systemTheme.matches
      ? "dark"
      : "light",
);
toggle.addEventListener("click", () => {
  preference = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(preference);
  try {
    localStorage.setItem("theme", preference);
  } catch {
    /* Keep the session preference. */
  }
});
systemTheme.addEventListener("change", (event) => {
  if (!preference) applyTheme(event.matches ? "dark" : "light");
});
// Local time is public context; no schedules or availability are inferred.
function updateLocalTime() {
  const now = new Date();
  const clock = document.getElementById("local-time");
  clock.dateTime = now.toISOString();
  clock.textContent = `${new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now)} Amsterdam`;
}
document.getElementById("current-year").textContent = new Date().getFullYear();
updateLocalTime();
setInterval(updateLocalTime, 60000);
const navLinks = document.querySelectorAll("nav a");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      }
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}
