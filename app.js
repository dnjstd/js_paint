const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //canvas의 context는 픽셀들을 컨트롤 함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE; //canvas사용 시 pixel modifier에 css에 적용한 사이즈를 알려줘야함 !!
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //기본 선 색상
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 굵기

let painting = false; //drawing 기본값
let filling = false; //채우기 기본값

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; // canvas의 좌표
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath(); // path = 선
    ctx.moveTo(x, y); // path를 만든 후 마우스의 좌표로 path 이동
  } else {
    ctx.lineTo(x, y); //좌표에서 부터 선을 연결
    ctx.stroke(); //선이 보여지게 함
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color ;
  ctx.fillStyle = color ;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
}

function handleCM(event){
  event.preventDefault();
} //마우스 우클릭 방지

function handleSaveClick(){
  const image = canvas.toDataURL(); //기본값 png
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);  //마우스가 캔버스 위에서 움직임
  canvas.addEventListener("mousedown", startPainting); //마우스 클릭
  canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 해제
  canvas.addEventListener("mouseleave", stopPainting); //마우스 캔버스 밖으로
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭 방지
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //Array.from 메소드는 객체로부터 배열을 만듦

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}