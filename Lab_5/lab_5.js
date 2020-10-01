const canvas = document.getElementById('canvas');
const btn = document.querySelector('.pain');
const fDepth = document.querySelector('.fractal_depth');
const rDepth = document.querySelector('.req_depth');
const fTime = document.querySelector('.fractal_time');

const ctx = canvas.getContext('2d');

const width = 500;
const height = 620;
const size = 450;
let val = 0;

function draw() {
  let d = fDepth.value - 1;
  clear();
  const t1 = performance.now();
  drawTriangle(d, ctx);
  const t2 = performance.now();
  fTime.value = t2 - t1; //Получение времени
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawTriangle(depth, ctx) {
  let midPointX = width / 2;
  let midPointY = height / 2;

  let ri = (size / 6) * Math.sqrt(3);
  let ru = (size / 3) * Math.sqrt(3);

  let pointAx = midPointX - size / 2;
  let pointAy = midPointY + ri;

  let pointBx = midPointX + size / 2;
  let pointBy = midPointY + ri;

  let pointCx = midPointX;
  let pointCy = midPointY - ru;

  sierpTriangle(
    pointAx,
    pointAy,
    pointBx,
    pointBy,
    pointCx,
    pointCy,
    depth,
    ctx
  );
}

function sierpTriangle(Ax, Ay, Bx, By, Cx, Cy, d, ctx) {
  rDepth.value = val++; //Глубина рекурсии
  if (d > 0) {
    let pointAx = (Bx + Cx) / 2;
    let pointAy = (By + Cy) / 2;

    let pointBx = (Ax + Cx) / 2;
    let pointBy = (Ay + Cy) / 2;

    let pointCx = (Ax + Bx) / 2;
    let pointCy = (Ay + By) / 2;

    sierpTriangle(Ax, Ay, pointBx, pointBy, pointCx, pointCy, d - 1, ctx);
    sierpTriangle(pointCx, pointCy, pointAx, pointAy, Bx, By, d - 1, ctx);
    sierpTriangle(pointBx, pointBy, pointAx, pointAy, Cx, Cy, d - 1, ctx);
  } else {
    ctx.moveTo(Ax, Ay);
    ctx.lineTo(Bx, By);
    ctx.lineTo(Cx, Cy);
    ctx.lineTo(Ax, Ay);
  }
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.resetTransform();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  val = 0;
}

btn.onclick = () => draw();
