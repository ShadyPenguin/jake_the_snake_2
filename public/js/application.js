$(document).ready(function() {

  var canvas = $('#canvas')[0];
  var ctx = canvas.getContext("2d");
  var width = $('#canvas').width();
  var height = $('#canvas').height();

  // painting canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,width,height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0,0,width,height);

  var d; // direction
  var food;
  var snake_array;
  var sw = 10; // snake width
  var score;

  function init() {
    createSnake();
    createFood();
    d = "right";
    score = 0;

    if (typeof gameloop != "undefined") clearInterval(gameloop);
    gameloop = setInterval(paint, 60);
  };

  init();
  
  function createSnake() {
    var length = 5;
    snake_array = [];

    for(var i = length - 1; i >= 0; i--) {
      snake_array.push({x:i, y:0})
    }
  };

  function paint() {
    // erasing tail
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,width,height);

    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    if (nx == -1 || nx == width/sw || ny == -1 || ny == height/sw || checkCollision(nx,ny,snake_array) ) {
      init();
      return;
    }
    
    if (d == "right") nx++;
    else if (d == "left") nx--;
    else if (d == "down") ny++;
    else if (d == "up") ny--;

    var tail = snake_array.pop();
    tail.x = nx; tail.y = ny;
    snake_array.unshift(tail);

    for(var i = 0; i < snake_array.length - 1; i++) {
      var body_part = snake_array[i];
      paintCell(body_part.x, body_part.y)
    }
    paintCell(food.x, food.y);
  }

  function createFood() {
    food = {
      x: Math.round(Math.random()*(width-sw)/sw),
      y: Math.round(Math.random()*(height-sw)/sw)
    };
  }

  function paintCell(x,y) {
    ctx.fillStyle = "green";
    ctx.fillRect(x*sw, y*sw,sw,sw);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*sw, y*sw,sw,sw);
  }

  function checkCollision(x,y,array) {
    for(var i = 0; i < array.length; i++) {
      if(array[i].x == x && array[i].y == y) return true;
    }
    return false;
  }

  $(document).keyup(function(event) {
    var keystroke = event.which;
    if (keystroke == "37" && d != "right") d = "left";
    else if (keystroke == "40" && d != "up") d = "down";
    else if (keystroke == "39" && d != "left") d = "right";
    else if (keystroke == "38" && d != "down") d = "up";
  });
});
