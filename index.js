document.querySelector("#best").innerHTML = "BEST TIME : " + JSON.parse(localStorage.getItem("scores"))[0];

//to change the number in each cell when clicked

var a = document.querySelectorAll(".container div");
function changeNum(i){
  a[i].classList.add("pressed");
  setTimeout(function(){
    a[i].classList.remove("pressed");
  },150);
  var x = (parseInt(a[i].innerHTML) + 20).toString();
  if(x<=40)a[i].innerHTML = x;
  else a[i].innerHTML = "";
  if(x==60)gameOver();
}

//integer array with no 1-20

var numArray = [];
for(var i = 1; i<=20;i++)numArray.push(i);

//to generate random index numbers

function genIndex(n){
  var indexNo = Math.floor(Math.random()*n);
  return indexNo;
}

//to generate numbers inside grid

var randomArray = [];
function genGrid(n){
  for(var j=0;j<20;j++)
  {var x=genIndex(n);
  randomArray.push(numArray[x]);
  document.getElementById("div"+j).innerHTML = randomArray[j];
  numArray.splice(x,1);
  n--;}
}

var inName = document.getElementsByClassName("start")[0];

//to display starting message

function cards(){
  genGrid(20);
  document.querySelector("#timer").innerHTML = "TIME : 0.000";
  inName.innerHTML = "3";
  inName.style.color = "white";
  inName.style.fontSize = "700%";
  inName.style.left = "45%";
  inName.style.top = "35%";
  setTimeout(function(){
    inName.innerHTML = "2";
  },1000);

  setTimeout(function(){
    inName.innerHTML = "1";
  },2000);

  setTimeout(function(){
    inName.innerHTML = "";
    document.querySelector(".container").style.zIndex=10;
    triggerTimer();
  },3000);

}



//to start timer

var timeToStop;
function triggerTimer(){
  var start = Date.now();
 timeToStop = setInterval(function(){
      document.getElementById("timer").innerHTML = "TIME : " + (parseInt(Date.now()-start)/1000).toString();
    },1);
    console.log(start);
    console.log(timeToStop);

    }

  //to end game

function gameOver(){
    clearInterval(timeToStop);
    var score = document.getElementById("timer").innerHTML.substring(7,13);
    document.querySelector(".container").style.zIndex=-1;
    inName.innerHTML = "Your score is : <strong>" + score + "</strong><br><h3 class='restart'>Click To Restart</h3>";
    inName.style.fontSize = "200%";
    inName.style.left = "23%";
    inName.style.top = "35%";
    document.getElementById("best").innerHTML = "BEST TIME : " + editLeaderboard(score);
   }



function editLeaderboard(s){
  if(JSON.parse(localStorage.getItem("scores"))==null)var scoreArray=[];
  else var scoreArray=JSON.parse(localStorage.getItem("scores"));
  console.log(scoreArray);
  scoreArray.push(s);
  scoreArray.sort();
  console.log(scoreArray);
  if(scoreArray.length == 6)scoreArray.pop();
  localStorage.setItem("scores", JSON.stringify(scoreArray));
  var topScores = JSON.parse(localStorage.getItem("scores"));
  return topScores[0];
}

function viewLdb(){
  document.querySelector(".container").style.zIndex=-1;
  var dispScores = JSON.parse(localStorage.getItem("scores"));
  inName.innerHTML = "Leaderboard<br>  1)  " + dispScores[0] +"<br>  2)  " + dispScores[1] +"<br>  3)  " + dispScores[2] +"<br>  4)  " + dispScores[3] +"<br>  5)  " + dispScores[4];
  inName.style.fontSize = "200%";
  inName.style.left = "38%";
  inName.style.top = "25%";

  setTimeout(function(){
    inName.style.fontSize= "300%";
    inName.style.left = "25%";
    inName.style.top = "43%";
    inName.style.color = "green";
    inName.innerHTML = "Click To Start!";
  }, 5000);
}
