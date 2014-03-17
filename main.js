$(document).ready(function(){

  //here you can change size of squares 
  window.sizeOfSquare = 4;    
  window.canvas = document.getElementById('myCanvas');
  window.run = false;

  $("#stop").click(function(){
    if (window.run === true){
      clearInterval(window.interval);
      window.run = false;
    }
  });

  $("#start").click(function(){
    if (window.run === false){
      window.interval = setInterval(draw,1000);
      window.run = true;
    }
  });

  $("#next").click(function(){
    window.interval = draw();
  });

  $("#myCanvas").click(function(ev){
    var canvas = window.canvas;
    var x = ev.clientX - canvas.offsetLeft;
    var y = ev.clientY - canvas.offsetTop;
    var size = window.sizeOfSquare;
    var ctx = canvas.getContext('2d');
    ctx.fillRect(x-size/2, y-size/2, size, size);
    console.log((x-size/2) +" " +(y-size/2) +" " +(x+size/2) +" " +(y+size/2));
  });
});

function copyArr(arrA, arrB){
  for (var i = 0; i < arrA.length; i++) {
    for (var j = 0; i < arrA[i].length; j++) {
      arrA[i][j] = arrB[i][j];
    }
  }
}

function randomInitArr(n, m){
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = [];
    for (var j = 0; j < m; j++) {
      if (Math.floor(Math.random()*100) === 0){
        arr[i][j] = true;
      }else{
        arr[i][j] = false;
      }
    }
  }
  return arr;
}

function draw() {
  var size = window.sizeOfSquare;
  var canvas = window.canvas
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0,0, canvas.width, canvas.height);      
  var arr = randomInitArr(canvas.width/size, canvas.height/size);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === true){
        ctx.fillRect(i*size,j*size,size,size);
      }
    }
  }
}
