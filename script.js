
const canvas = document.getElementById("canvas");
const parts = document.querySelectorAll(".draggable");

parts.forEach(part => {
  part.addEventListener("dragstart", dragStart);
  part.addEventListener("touchstart", touchStart, { passive: false });
});

canvas.addEventListener("dragover", dragOver);
canvas.addEventListener("drop", drop);
canvas.addEventListener("touchmove", touchMove, { passive: false });
canvas.addEventListener("touchend", touchEnd);

let draggedPart = null;
let touchClone = null;

function dragStart(e) {
  draggedPart = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const img = draggedPart.cloneNode(true);
  img.style.left = e.offsetX + "px";
  img.style.top = e.offsetY + "px";
  canvas.appendChild(img);
}

function touchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  draggedPart = e.target;
  touchClone = draggedPart.cloneNode(true);
  touchClone.style.position = "absolute";
  touchClone.style.left = touch.pageX + "px";
  touchClone.style.top = touch.pageY + "px";
  touchClone.style.pointerEvents = "none";
  document.body.appendChild(touchClone);
}

function touchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  if (touchClone) {
    touchClone.style.left = touch.pageX + "px";
    touchClone.style.top = touch.pageY + "px";
  }
}

function touchEnd(e) {
  if (touchClone) {
    const rect = canvas.getBoundingClientRect();
    const x = parseInt(touchClone.style.left);
    const y = parseInt(touchClone.style.top);
    if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
      const img = draggedPart.cloneNode(true);
      img.style.left = (x - rect.left) + "px";
      img.style.top = (y - rect.top) + "px";
      canvas.appendChild(img);
    }
    document.body.removeChild(touchClone);
    touchClone = null;
  }
}

function resetCanvas() {
  canvas.innerHTML = "";
}
