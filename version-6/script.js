const turn = document.getElementById("turn-photo");
const front = document.getElementById("photo-front");
const back = document.getElementById("photo-back");
turn.hidden = false;
turn.addEventListener("click", () => {
  const showBack = back.hidden;
  front.hidden = showBack;
  back.hidden = !showBack;
  turn.setAttribute("aria-pressed", String(showBack));
  turn.textContent = showBack ? "Turn photo back ↷" : "Turn photo over ↶";
});
document.getElementById("year").textContent = new Date().getFullYear();
