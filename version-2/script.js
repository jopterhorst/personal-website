const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
const storageKey = "portfolio-v2-theme";
let preference;
try {
  const saved = localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark") preference = saved;
} catch {
  /* Keep browser-local interactions available without storage. */
}
function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  toggle.textContent = dark ? "LIGHT ↗" : "DARK ↗";
  toggle.setAttribute(
    "aria-label",
    `Switch to ${dark ? "light" : "dark"} theme`,
  );
  toggle.setAttribute("aria-pressed", String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#1a211b"
    : "#f0eee6";
}
applyTheme(preference || (systemTheme.matches ? "dark" : "light"));
toggle.addEventListener("click", () => {
  preference = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(preference);
  try {
    localStorage.setItem(storageKey, preference);
  } catch {
    /* The preference still applies to this session. */
  }
});
systemTheme.addEventListener("change", (event) => {
  if (!preference) applyTheme(event.matches ? "dark" : "light");
});
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("local-time");
  clock.dateTime = now.toISOString();
  clock.textContent = `${new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now)} AMSTERDAM`;
}
updateClock();
setInterval(updateClock, 60000);
document.getElementById("current-year").textContent = new Date().getFullYear();
const filters = document.querySelector(".project-filters");
const projects = [...document.querySelectorAll(".project")];
filters.hidden = false;
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  const category = button.dataset.filter;
  document.querySelector(".project-grid").dataset.filter = category;
  let count = 0;
  projects.forEach((project) => {
    project.hidden =
      category !== "all" && project.dataset.category !== category;
    if (!project.hidden) count++;
  });
  filters.querySelectorAll("button").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("filter-status").textContent =
    `Showing ${count} ${category === "all" ? "" : category === "music" ? "music and production " : "Mendix and community "}projects.`;
});
