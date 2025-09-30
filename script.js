// script.js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let fontSize = 5;
let textColor = "#000000";
let backgroundColor = "#ffffff";

// Set initial canvas background
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Event listeners for drawing
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);

// Drawing function
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = textColor;
  ctx.lineWidth = fontSize;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
}
// Text color picker
document.getElementById("colorpicker").addEventListener("input", function () {
  textColor = this.value;
});

// Background color picker
document.getElementById("canvasColor").addEventListener("input", function () {
  backgroundColor = this.value;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Font size selector
document.getElementById("Fontsize").addEventListener("change", function () {
  fontSize = parseInt(this.value);
});

// Clear canvas
document.getElementById("clearButton").addEventListener("click", function () {
  ctx.fillStyle = backgroundColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Save & Download
document.getElementById("saveButton").addEventListener("click", function () {
  const dataURL = canvas.toDataURL("image/png");
  localStorage.setItem("signature", dataURL);

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "signature.png";
  link.click();
});

// Retrieve Signature
document.getElementById("retriveButton").addEventListener("click", function () {
  const dataURL = localStorage.getItem("signature");
  if (dataURL) {
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  } else {
    alert("No signature found!");
  }
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

