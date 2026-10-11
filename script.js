const root = document.documentElement;
const palette = document.getElementById("palette");
const devicePalette = window.matchMedia("(prefers-color-scheme: dark)");
let evening = devicePalette.matches;
function apply() {
  root.dataset.evening = String(evening);
  palette.setAttribute("aria-pressed", String(evening));
  palette.setAttribute(
    "aria-label",
    `Switch to ${evening ? "daytime" : "evening"} colors`,
  );
  palette.innerHTML = evening
    ? 'Daytime colors <span aria-hidden="true">◐</span>'
    : 'Evening colors <span aria-hidden="true">◐</span>';
  document.querySelector('meta[name="theme-color"]').content = evening
    ? "#302135"
    : "#e2eee6";
}
apply();
palette.hidden = false;
palette.addEventListener("click", () => {
  evening = !evening;
  apply();
});
// Follow device changes, including after a temporary manual palette choice.
devicePalette.addEventListener("change", (event) => {
  evening = event.matches;
  apply();
});
document.getElementById("year").textContent = new Date().getFullYear();
