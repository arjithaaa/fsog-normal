var no;
var totalNo = 20; //setting default mode to easy
document.querySelector(".easy").classList.add("selected");
dispBestTime();

//making the grids

for (var i = 1; i <= 20; i++) {
  div = document.createElement("div");

  var cont = document.getElementsByClassName("container")[0];
  cont.appendChild(div);
  var addAtt = document.querySelectorAll(".container div")[i - 1];
  addAtt.setAttribute("id", 'div' + (i - 1));
  addAtt.setAttribute("onclick", 'changeNum(' + (i - 1) + ')');
}

//to display the best time acc to mode

function dispBestTime() {
  var checkExist;

  if (totalNo == '20') checkExist = JSON.parse(localStorage.getItem("scoreE"));
  else if (totalNo == '40') checkExist = JSON.parse(localStorage.getItem("scoreM"));
  else checkExist = JSON.parse(localStorage.getItem("scoreH"));


  if (checkExist == null) document.querySelector("#best").textContent = "BEST TIME : 0.000";
  else document.querySelector("#best").textContent = "BEST TIME : " + checkExist[0];
}

//integer array with no 1-20

var numArray = [];
for (var i = 1; i <= 20; i++) numArray.push(i);

//to generate random index numbers

function genIndex(n) {
  var indexNo = Math.floor(Math.random() * n);
  return indexNo;
}

//to generate numbers inside grid

var randomArray = [];

function genGrid(n) {
  for (var j = 0; j < 20; j++) {
    var x = genIndex(n);
    randomArray.push(numArray[x]);
    document.getElementById("div" + j).textContent = randomArray[j];
    numArray.splice(x, 1);
    n--;
    bgColor(document.getElementById("div" + j));
  }
}

//generate background color

function bgColor(val){
  var i;
  if(totalNo=='20')i=10;
  else if(totalNo=='40')i=6;
  else i =4;
  var ind = val.innerHTML *i;
  val.style.backgroundColor = 'rgb(' +ind+ ','+ind+','+ind+')';
}


var inName = document.getElementsByClassName("start")[0];

//select mode

function easyMode(){
  if(totalNo=='40')document.querySelector(".med").classList.remove("selected");
  else if (totalNo=='60')document.querySelector(".hard").classList.remove("selected");
  totalNo=20;
  document.querySelector(".easy").classList.add("selected");
  dispBestTime();
}

function medMode(){
  if(totalNo=='20')document.querySelector(".easy").classList.remove("selected");
  else if (totalNo=='60')document.querySelector(".hard").classList.remove("selected");
  totalNo=40;
  document.querySelector(".med").classList.add("selected");
  dispBestTime();
}

function hardMode(){
  if(totalNo=='40')document.querySelector(".med").classList.remove("selected");
  else if (totalNo=='20')document.querySelector(".easy").classList.remove("selected");
  totalNo=60;
  document.querySelector(".hard").classList.add("selected");
  dispBestTime();
}

//to display starting message

function cards() {
  genGrid(20);
  no = 1;
  var aud = new Audio("Sparkle-sound-effect.mp3");
  aud.play();
  document.querySelector("#timer").textContent = "TIME : 0.000";
  inName.textContent = "3";
  inName.style.color = "white";
  inName.style.fontSize = "700%";
  inName.style.left = "45%";
  inName.style.top = "35%";
  setTimeout(function() {
    inName.textContent = "2";
  }, 1000);

  setTimeout(function() {
    inName.textContent = "1";
  }, 2000);

  setTimeout(function() {
    inName.textContent = "";
    document.querySelector(".container").style.zIndex = 10;
    triggerTimer();
  }, 3000);

}

//to start timer

var timeToStop;

function triggerTimer() {
  var start = Date.now();
  timeToStop = setInterval(function() {
    document.getElementById("timer").textContent = "TIME : " + (parseInt(Date.now() - start) / 1000).toString();
  }, 1);
  console.log(start);
}


//to change the number in each cell when clicked

var a = document.querySelectorAll(".container div");

function changeNum(i) {

  if (a[i].textContent == no) {
    a[i].classList.add("pressed");
    setTimeout(function() {
      a[i].classList.remove("pressed");
    }, 150);
    var aud = new Audio("kick-bass.mp3");
    aud.play();
    var x = (parseInt(a[i].textContent) + 20).toString();
    if (x <= totalNo) {a[i].textContent = x; bgColor(a[i]);}
    else {a[i].textContent = ""; a[i].style.backgroundColor = "black";}
    if (x == totalNo + 20) gameOver();
    no++;
  }
}

//to end game

function gameOver() {
  clearInterval(timeToStop);
  var score = document.getElementById("timer").textContent.substring(7, 13);
  document.querySelector(".container").style.zIndex = -1;
  inName.innerHTML = "Your score is : <strong>" + score + "</strong><br><h3 class='restart'>Click To Restart</h3>";
  inName.style.fontSize = "200%";
  inName.style.left = "23%";
  inName.style.top = "35%";
  inName.style.textAlign = "center";
  var top;

  if (totalNo == '20') top = easyLdb(score);
  else if (totalNo == '40') top = medLdb(score);
  else top = hardLdb(score);
  document.getElementById("best").textContent = "BEST TIME : " + top;
}

//maintaining top scores

function easyLdb(s) {
  if (JSON.parse(localStorage.getItem("scoreE")) == null) var easyScore = [];
  else var easyScore = JSON.parse(localStorage.getItem("scoreE"));
  easyScore.push(s);
  easyScore.sort();
  if (easyScore.length == 6) easyScore.pop();
  localStorage.setItem("scoreE", JSON.stringify(easyScore));
  return easyScore[0];
}

function medLdb(s) {
  if (JSON.parse(localStorage.getItem("scoreM")) == null) var medScore = [];
  else var medScore = JSON.parse(localStorage.getItem("scoreM"));
  medScore.push(s);
  medScore.sort();
  if (medScore.length == 6) medScore.pop();
  localStorage.setItem("scoreM", JSON.stringify(medScore));
  return medScore[0];
}

function hardLdb(s) {
  if (JSON.parse(localStorage.getItem("scoreH")) == null) var hardScore = [];
  else var hardScore = JSON.parse(localStorage.getItem("scoreH"));
  hardScore.push(s);
  hardScore.sort();
  if (hardScore.length == 6) hardScore.pop();
  localStorage.setItem("scoreH", JSON.stringify(hardScore));
  return hardScore[0];
}

function viewLdb() {
  document.querySelector(".container").style.zIndex = -1;
  var dispScores = [];
  if (totalNo == '20')
    dispScores = JSON.parse(localStorage.getItem("scoreE"));
  else if (totalNo == '40') dispScores = JSON.parse(localStorage.getItem("scoreM"));
  else if (totalNo == '60') dispScores = JSON.parse(localStorage.getItem("scoreH"));

  inName.innerHTML = "Leaderboard<br>  1)  " + dispScores[0] + "<br>  2)  " + dispScores[1] + "<br>  3)  " + dispScores[2] + "<br>  4)  " + dispScores[3] + "<br>  5)  " + dispScores[4];
  inName.style.fontSize = "200%";
  inName.style.left = "34%";
  inName.style.top = "25%";

  setTimeout(function() {
    inName.style.fontSize = "300%";
    inName.style.left = "25%";
    inName.style.top = "43%";
    inName.style.color = "#FF2E63";
    inName.textContent = "Click To Start!";
  }, 5000);
}
