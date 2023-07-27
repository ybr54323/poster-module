import RectCanvasElement from "./RectCanvasElement.js";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.rect(0,0,100,100)
ctx.fill()

console.log(canvas.height);

function resetCoordinate(ctx) {}
