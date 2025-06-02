const audioEle = document.querySelector("audio");
const cvs = document.querySelector("canvas");

const ctx = cvs.getContext("2d");

// 初始化 canvas 的尺寸
function initCvs() {
  cvs.width = window.innerWidth * devicePixelRatio - 5;
  cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}

initCvs()


// control global initializer, actual once
let isInit = false;

let dataArr, analyzer;
// initializer 
audioEle.onplay = function() {
  if (isInit) {
    return;
  }

  const audCtx = new AudioContext(); // audio context
  // set audio source node
  const source = audCtx.createMediaElementSource(audioEle);
  // analyzer node 
  analyzer = audCtx.createAnalyser();
  // send source to analyzer
  source.connect(analyzer);
  // send analyzer result to  output device
  analyzer.connect(audCtx.destination);

  // finally get number of details in per second
  analyzer.fftSize = 512;
  // create a data array to store analyzer data
  dataArr = new Uint8Array(analyzer.frequencyBinCount);

  // set flag success
  isInit = true;
}

function draw() {
  requestAnimationFrame(draw);
  const { width, height } = cvs;
  // clear canvas
  ctx.clearRect(0, 0, width, height);

  if (!isInit) {
    return;
  }
  // get data from analyzer
  analyzer.getByteFrequencyData(dataArr);

  // high Hz no wave, cut over 
  const len = dataArr.length / 2.0;

  // set mirror as samea, width half
  const barWidth = width / len / 2;

  ctx.fillStyle = "#78C5F7";

  for (let i = 0; i < len; i++) {
    const data = dataArr[i];  // < 256
    const barHeight = (data / 255) * height;
    // right half
    const x1 = i * barWidth + width / 2;
    // left half
    const x2 = width / 2 - (i + 1) * barWidth;
    // same height
    const y = height - barHeight;
    ctx.fillRect(x1, y, barWidth - 2, barHeight);
    ctx.fillRect(x2, y, barWidth - 2, barHeight);
  }
}

draw();
