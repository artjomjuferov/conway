$(document).ready(function(){

  window.sizeOfSquare = 32;    
  window.canvas = document.getElementById('myCanvas');
  window.run = false;
  prepareScene();

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

  $("#squereSize").change(function(ev){
    if (window.run === false){
      window.sizeOfSquare = this.value;

      var canvas = window.canvas
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);  
      prepareScene();
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
    ctx.fillRect(x-(x % size),y-(y % size), size, size);
    console.log((x-size/2) +" " +(y-size/2));
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

function prepareScene(){
  drawGrid();
  var image = new Image();
  image.src = window.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.canvasBg = image; 
}

function drawGrid() {
  var size = window.sizeOfSquare;
  var canvas = window.canvas
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < canvas.width; i+=size) {
      console.log(i);
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,canvas.height);
      ctx.stroke();
      ctx.closePath();  

      ctx.beginPath();
      ctx.moveTo(0,i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
      ctx.closePath();  
  }
}

function draw() {
  var size = window.sizeOfSquare;
  var canvas = window.canvas
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);  
  ctx.drawImage(window.canvasBg, 0, 0);      
  
  var arr = randomInitArr(canvas.width/size, canvas.height/size);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === true){
        ctx.fillRect(i*size,j*size,size,size);
      }
    }
  }
}
