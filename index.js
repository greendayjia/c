
var dir ="environment";

function video(){
  dir=(dir=="environment")?"user":"environment";
  // constraints = {
  //   audio: false,
  //   video: {
  //     facingMode: dir
  //   }
  // };
  document.getElementById("app").onload = init();
}
const getFrameFromVideo = (video, canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(video.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore();
  requestAnimationFrame(() => getFrameFromVideo(video, canvas));
};

const getCameraStream = video => {
  var constraints = {
    audio: false,
    video: {
      facingMode: dir
    }
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function success(stream) {
      video.srcObject = stream;
    });
    console.log(constraints)
};

const createVideo = (id, width, height) => {
  const video = document.createElement("video");
  video.id = id;
  video.width = width;
  video.height = height;
  video.autoplay = true;
  video.controls = true;
  return video;
};

const createCanvas = (id, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const init = () => {
  const video = createVideo("vid", 480, 360);
  // const canvas = createCanvas("canvas", 480, 360);
  const app = document.getElementById("app");
  getCameraStream(video);
 // getFrameFromVideo(video, canvas);
  app.innerHTML="";
  app.appendChild(video);
 // app.appendChild(canvas);
  console.log("init");
};

document.getElementById("app").onload = init();
