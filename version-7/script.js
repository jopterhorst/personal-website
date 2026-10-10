const root = document.documentElement;
const themeButton = document.getElementById("theme");
const key = "portfolio-v7-theme";
let theme = "dark";
try {
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") theme = saved;
} catch {}
function apply() {
  root.dataset.theme = theme;
  const light = theme === "light";
  themeButton.setAttribute("aria-pressed", String(light));
  themeButton.setAttribute(
    "aria-label",
    `Switch to ${light ? "dark" : "light"} theme`,
  );
  themeButton.textContent = light ? "DARK ↗" : "LIGHT ↗";
  document.querySelector('meta[name="theme-color"]').content = light
    ? "#f1efe8"
    : "#131313";
}
apply();
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  apply();
  try {
    localStorage.setItem(key, theme);
  } catch {}
});
document.getElementById("year").textContent = new Date().getFullYear();
