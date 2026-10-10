const projects = [...document.querySelectorAll(".project")];
const expand = document.getElementById("expand-projects");
expand.hidden = false;
function reflect() {
  const allOpen = projects.every((project) => project.open);
  expand.setAttribute("aria-expanded", String(allOpen));
  expand.textContent = allOpen ? "Close all notes −" : "Open all notes +";
}
expand.addEventListener("click", () => {
  const open = !projects.every((project) => project.open);
  projects.forEach((project) => (project.open = open));
  reflect();
});
projects.forEach((project) => project.addEventListener("toggle", reflect));
document.getElementById("year").textContent = new Date().getFullYear();
