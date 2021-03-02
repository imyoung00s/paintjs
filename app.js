const canvas = document.getElementById("jsCanvas");//canvas는 픽셀을 다룰 수 있는 요소
const ctx = canvas.getContext("2d");//canvas의 context는 convas 안에서 픽셀들을 컨트롤 함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"//반복적으로 사용되는 것을 상수로 선언해줌
const CANVAS_SIZE = 700;
//canvas 객체 자체의 픽셀과 별개로 넓이 적어줘야함(css와 동일한 width height 적기)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//초기 배경색 흰색 설정 (설정하지 않으면 배경색 없는 png 파일)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)//x,y,w,h

//선 색과 굵기 기본값
ctx.stokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false; // 기본값 false mousedown일 때 true가 됨
let filling = false;
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {//모든 움직임을 감지하고 라인을 만드는 함수
  //console.log(event) canvas와 관련 있는 offsetX 값과 offsetY값을 확인할 수 있음!
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x,y); x, y가 제대로 찍혀있는지 확인
  if (!painting) {//마우스를 누르지 않고 canvas 안에서 움직일 때
    ctx.beginPath();//context의 path 시작
    ctx.moveTo(x, y)// context를 x,y 좌표로 이동 path를 해당 xy에서 시작
  } else {//마우스를 움직이는 내내 동작
    ctx.lineTo(x, y);//path x,y까지 선을 만들어
    ctx.stroke();// 선을 그어
  }
}

function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() { // 모드를 클릭했을 때 filling 값 변경
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick() {
  if (filling) {// filling이 ture인 상태
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)//x,y,w,h
  }
}

function handleCM(event){
  event.preventDefault();//event 막기
}

function handleSaveClick(){
  //toData : canvas image를 데이터처럼 얻기
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJS[🎨]"; 
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);//마우스 우클릭 방지
}

Array.from(colors).forEach(color => //이때 color라는 단어는 array 안의 각각 아이템들을 대표하는 말일 뿐이므로 다른 단어를 사용해도 됨 아무거나 ㅇㅋ
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick)
}
