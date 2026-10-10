const board = document.getElementById("desktop");
const windows = [...board.querySelectorAll(".window")];
const desktopMode = matchMedia("(min-width: 761px)");
const reset = document.getElementById("reset");
const status = document.getElementById("desktop-status");
let highest = 10;
const positions = new Map(windows.map((win) => [win, { x: 0, y: 0 }]));
function place(win, x, y) {
  const old = positions.get(win);
  const box = win.getBoundingClientRect();
  const bounds = board.getBoundingClientRect();
  const originX = box.left - bounds.left - old.x;
  const originY = box.top - bounds.top - old.y;
  const next = {
    x: Math.max(-originX, Math.min(x, bounds.width - box.width - originX)),
    y: Math.max(-originY, Math.min(y, bounds.height - box.height - originY)),
  };
  positions.set(win, next);
  win.style.transform = `translate(${next.x}px,${next.y}px)`;
}
function tidy() {
  windows.forEach((win) => {
    positions.set(win, { x: 0, y: 0 });
    win.style.removeProperty("transform");
    win.style.removeProperty("z-index");
  });
}
function mode() {
  reset.hidden = !desktopMode.matches;
  document.querySelector(".drag-hint").hidden = !desktopMode.matches;
  windows.forEach(
    (win) => (win.querySelector(".move").hidden = !desktopMode.matches),
  );
  tidy();
}
windows.forEach((win) => {
  const handle = win.querySelector(".move");
  let drag;
  handle.addEventListener("pointerdown", (event) => {
    if (!desktopMode.matches || event.button !== 0) return;
    const position = positions.get(win);
    drag = {
      clientX: event.clientX,
      clientY: event.clientY,
      x: position.x,
      y: position.y,
    };
    win.style.zIndex = ++highest;
    win.classList.add("dragging");
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (drag)
      place(
        win,
        drag.x + event.clientX - drag.clientX,
        drag.y + event.clientY - drag.clientY,
      );
  });
  const end = () => {
    drag = null;
    win.classList.remove("dragging");
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
  handle.addEventListener("lostpointercapture", end);
  handle.addEventListener("keydown", (event) => {
    if (!desktopMode.matches) return;
    const delta = {
      ArrowLeft: [-20, 0],
      ArrowRight: [20, 0],
      ArrowUp: [0, -20],
      ArrowDown: [0, 20],
    }[event.key];
    if (event.key === "Home") {
      event.preventDefault();
      place(win, 0, 0);
      status.textContent = `${win.querySelector("h2").textContent} position reset.`;
    } else if (delta) {
      event.preventDefault();
      const p = positions.get(win);
      win.style.zIndex = ++highest;
      place(win, p.x + delta[0], p.y + delta[1]);
      status.textContent = `${win.querySelector("h2").textContent} moved.`;
    }
  });
});
reset.addEventListener("click", () => {
  tidy();
  status.textContent = "Desktop tidied. All windows are back in place.";
});
desktopMode.addEventListener("change", mode);
window.addEventListener("resize", tidy);
mode();
document.getElementById("year").textContent = new Date().getFullYear();
