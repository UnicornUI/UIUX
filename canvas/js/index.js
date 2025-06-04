const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

function init() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = window.innerHeight * devicePixelRatio;
}

init();

/**
 * 获取 [min, max] 之间的随机整数
 * return { number }
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max+1 - min) + min)
}

class Point {
  constructor() {
    this.r = 6;
    this.x = getRandom(0, cvs.width - this.r / 2);
    this.y = getRandom(0, cvs.height - this.r / 2);
  }
  draw() {
    ctx.beginPath();
    // 前两个参数值圆心的位置
    // 第三个参数是半径
    // 第四个参数是起始角度
    // 第五个参数是结束角度
    // 第六个参数表示的是顺时针还是逆时针绘制，true 表示的是逆时针
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(200, 200, 200)";
    ctx.fill();
  }
}

class Graph {
  constructor(pointNumber = 30, maxDis = 700) {
    this.points = new Array(pointNumber)
        .fill(0)
        .map(() => new Point());
    this.maxDis = maxDis;
  }
  draw() {
    for(let i = 0; i < this.points.length; i++){
      const p1 = this.points[i];
      p1.draw();
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(200, 200, 200, ${1- d / this.maxDis})`;
        ctx.stroke();
      }
    }
  }
}

// 随机生成一批点
//
const graph = new Graph();
graph.draw();





