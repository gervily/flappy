// Variables importants
var MeteorSurface = require('library/meteor/core/Surface');

var phase;
var sinCoef = 0;

var mainContext;
var qq;
var aux = [0,0];
var score = 0;
var scoresArray = [];
var scoreRanking = [];
var posicio;


var spaceMin = 52;
var spaceHeight = 250;
var heightFloor = 205;
var colWidth = 113;

var gameHeight;
var gameController;
var gameControllerModifier;

var gameView;
var startView;
var lostView;
var scoreView;
var scoreViewButton1, scoreViewButton2, scoreViewButton3, scoreViewSurface, scoreViewButtonOk;
var scoreViewButton1Modifier, scoreViewButton2Modifier, scoreViewButton3Modifier, scoreViewSurfaceModifier, scoreViewButtonOkModifier;
var gameBackgroundSurface;
var backgroundTop, backgroundBot, backgroundLeft, backgroundRight;
var backgroundTopModifier, backgroundBotModifier, backgroundLeftModifier, backgroundRightModifier;
var t1,t2,t3,t4;
var s1,s2,s3,s4;
var sf = [800,50], tf; // size i transform de floor
var clickSurface;
var clickSurfaceModifier;
var currentView;

// Buttons
var buttonOkSurface;
var buttonOkSurfaceModifier;
var buttonScoreSurface;
var buttonScoreSurfaceModifier;

// Score
var scoreSurface = [];
var scoreSurfaceModifier = [];


var tick = 1700; // cada quan es llança
var time = 3000; // quan triga a arribar al final
var gameOn = false;
var numDegrees = 4; // Numero de steps de alçada de les Cols

var h_floor = 0.07;  
var h_space = 0.37;  // Espai que es deixa entre colTop i colBot [0,1]
var w_space = 0.09; // % de la width respecte el size del gameController [0,1]
var b_size = 0.067; // % size del bird respecte gameController [0,1]
var colQueue;
var colAux;

var prev1;
var gameControllerSize = [640,960];
var gameControllerAnchor = [];
var bgC = 'white';
var flC = 'orange';

var erasethis = 0;

var numCols = 4;
var numCol = 0;
var colTopSurface = [];
var colTopSurfaceModifier = [];
var colBotSurface = [];
var colBotSurfaceModifier = [];
var startSurface;
var floorSurface;
var floorSurfaceModifier;

// Physics
var physicsEngine;
var birdParticle;
var birdParticleMass = 2;
var birdParticleRadius = 30;
var birdParticleInitialPosition = [200,450,10]; // ignore
var birdParticlePosition = [0.5,0.5]; // en % respecte gameControllerSize
var birdParticleInitialVelocity = [0,0,0];
var gravity;
var gravityForce = [0,0.0056,0];
var floorWall;
var floorDistance = 800;
var birdSurface;
var birdSurfaceModifier;
var birdSurfaceSize = [birdParticleRadius,birdParticleRadius];
var birdParticleVelocityClick = [0,-0.9,0];
var firstClick;
var gravityId;

var repeat;

// Altres variables
var dummySurface;
var dummyModifier;

var dummy = 0;

// Funcions
function setScore(number){

  if ( number == 10 ){
    // Shows scoreSurface[1] i pos
    scoreSurfaceModifier[0].setTransform(Transform.translate(299,50,100));
    scoreSurfaceModifier[1].setTransform(Transform.translate(341,50,100));
    scoreSurfaceModifier[1].setOpacity(1);
  }
  
  if ( number == 100 ){
    // Show scoreSurface[2] i pos
    scoreSurfaceModifier[0].setTransform(Transform.translate(278,50,100));
    scoreSurfaceModifier[1].setTransform(Transform.translate(320,50,100));
    scoreSurfaceModifier[2].setOpacity(1);
  }
  
  var str = score.toString();
  for (var i = 0; i < str.length; i++ ){
    //console.log('str[' + i + ']=' + str[i]);
    switch (str[i]){
      case '0':
        scoreSurface[i].setContent('img/zero.png');          
        break;
      case '1':
        scoreSurface[i].setContent('img/one.png');              
        break;
      case '2':
        scoreSurface[i].setContent('img/two.png');  
        break;
      case '3':
        scoreSurface[i].setContent('img/three.png');  
        break;
      case '4':
        scoreSurface[i].setContent('img/four.png');  
        break;
      case '5':
        scoreSurface[i].setContent('img/five.png');  
        break;
      case '6':
        scoreSurface[i].setContent('img/six.png');  
        break;
      case '7':
        scoreSurface[i].setContent('img/seven.png');  
        break;
      case '8':
        scoreSurface[i].setContent('img/eight.png');  
        break;
      case '9':
        scoreSurface[i].setContent('img/nine.png');  
        break;
    }
  }
}

function buttonOk(){
  switch (phase){
    case 'startScore':
      // Anem a start. Posar condicions inicialsi
      sinus=true;
      aux = [0,0];
      scoreSurfaceModifier[0].setTransform(Transform.translate(320,50,100));
      scoreSurfaceModifier[1].setOpacity(0);
      scoreSurfaceModifier[2].setOpacity(0);
      score = 0;
      scoreSurface[0].setContent('img/zero.png');
      birdParticle.setPosition(birdParticleInitialPosition);
      //console.log('>> start');
      gameController.show(startView);
      //phase = 'start';
      Timer.after(function(){phase ='start';},5);      
      break;
    case 'loseScore':
      // Anem a start. Posar condicions inicials
      sinus = true;
      physicsEngine.detach(gravityId);
      birdParticle.setVelocity([0,0,0]);
      setColPosition();
      aux = [0,0];
      scoreSurfaceModifier[0].setTransform(Transform.translate(320,50,100));
      scoreSurfaceModifier[1].setOpacity(0);
      scoreSurfaceModifier[2].setOpacity(0);
      score = 0;
      scoreSurface[0].setContent('img/zero.png');
      birdParticle.setPosition(birdParticleInitialPosition);
      //console.log('>> start');
      gameController.show(startView);
      //phase = 'start';
      Timer.after(function(){phase ='start'; transOut();},5);
      break;
    case 'lose':
      // Anem a start. Posar condicions inicials
      physicsEngine.detach(gravityId);
      birdParticle.setVelocity([0,0,0]);
      setColPosition();
      sinus = true;
      aux = [0,0];
      scoreSurfaceModifier[0].setTransform(Transform.translate(320,50,100));
      scoreSurfaceModifier[1].setOpacity(0);
      scoreSurfaceModifier[2].setOpacity(0);
      score = 0;
      scoreSurface[0].setContent('img/zero.png');
      birdParticle.setPosition(birdParticleInitialPosition);
      //console.log('>> start');
      gameController.show(startView);
      //phase = 'start';
      //transOut();
      sinusDisp.set(-50, {duration : 350, curve: Easing.outQuad}, function(){transIn();});
      Timer.after(function(){phase ='start';},5);
      break;
  }
}

function action(){
  // EngineClick, EngineSpace i EngineArrowUp
  switch (phase){
    case 'start':
      startToGame();        
      break;
    case 'game':
      //flap
      //gravityId = physicsEngine.attach(gravity,birdParticle);
      birdParticle.setVelocity(birdParticleVelocityClick);
      break;
  }
}

function startToGame(){
  //console.log('startToGame');
  var disp = sinusDisp.get();
  sinus = false;
  //birdParticle.setPosition(birdParticleInitialPosition - [0,disp,0]);
  sinusDisp.halt();
  sinusDisp.set(0);
  setColPosition();
  numCol = 0;
  //console.log('>> game');
  phase = 'game';
  colAux = colQueue;
  //birdParticle.setPosition(birdParticleInitialPosition);
  gameController.show(gameView);
  //gameOn = true;
  gravityId = physicsEngine.attach(gravity,birdParticle);
  birdParticle.setVelocity(birdParticleVelocityClick);
  // Callback
  callback();
  repeat = Timer.setInterval(callback,tick);
}

function press1(){
  //Timer.clear(repeat);
  //console.log('_______________________');
  //console.log('Frames with fcoll: ' + erasethis);
  //console.log('Bird actual position: [' + birdParticle.position.x+ ',' + birdParticle.position.y + ']');
  
  //for ( var i = 0; i < numCols; i++ ){
  //  console.log('Col[' + i + '] actual position: [' + colTopSurfaceModifier[i].getTransform()[12] + ',' + colTopSurfaceModifier[i].getTransform()[13] + ']');
  //}
  //console.log(phase);
  
  //var number = 1234;
  //var str = number.toString();
  //for (var i = 0; i < str.length; i++){
  //  console.log('str[' + i + ']=' + str[i]);
  //}
  
}

function stopCols(){
  for ( var i = 0; i < numCols; i++ ){
     //colTopSurfaceModifier[i].halt();
    colTopSurfaceModifier[i].setTransform(colTopSurfaceModifier[i].getTransform());
     //colBotSurfaceModifier[i].halt();
    colBotSurfaceModifier[i].setTransform(colBotSurfaceModifier[i].getTransform());
  }
}

function sortScores(a,b){return b.score - a.score;}
function Lose(){
  birdParticle.setVelocity([0,-0.5,0]);
  //console.log('>> lose');
  phase = 'lose';
  Timer.clear(repeat);
  stopCols();
  gameController.show(lostView);
  var id = Scores.insert({
    score: score,
    createdAt: new Date()
  });
  scoresArray = Scores.find().fetch();
  console.log(scoresArray);
  scoresRanking = Scores.find().fetch().sort(sortScores);
  
  for ( var i = 0; i < scoresRanking.length; i++ ){
    if (scoresRanking[i]._id == id ){
      posicio = i;
    }
  }
  
}

var sinusDisp;
var sinus = true;

function transIn (){
  if (sinus){
    sinusDisp.set(50, {duration : 700, curve: Easing.inOutQuad}, function(){transOut();});
  }
}

function transOut (){
  if (sinus){
    sinusDisp.set(-50, {duration : 700, curve: Easing.inOutQuad }, function(){transIn();});
  }
}

function buttonScoreOk(){
  // Estem a scoreView i donem OK --> Anem a startView
}

function buttonScore(){
  // Hem apretat el botó 'Score' desde ( loseView OR startView )
  //console.log('Has fet ' + score + ' punts (top ' + posicio + ')!');
  //console.log(phase);
  gameController.show(scoreView);
  switch (phase){
    case 'lose':
      phase = 'loseScore';
      break;
    case 'start':
      phase = 'startScore';
      break;
  }
}

function collisionFunction(){
    
  if (phase == 'game'){
  
    for (var i = 0; i < numCols; i++ ){

      // Per cada set de columnes
      if ( ( (colTopSurfaceModifier[i].getTransform()[12]) < (birdParticleInitialPosition[0] + birdParticleRadius) ) && ( (colTopSurfaceModifier[i].getTransform()[12]) > (birdParticleInitialPosition[0] - birdParticleRadius - 113) ) ){

        // Bird i col[i] intersecten en X
        //console.log('>> Bird i col[' + i + '] intersect');
        if (aux[0] == i && aux[1] === 0){
          //console.log('>> aux=[' + i + ',1]');
          aux = [i,1];
        }
        
        // Mirem en Y
        if ( ((birdParticle.position.y - birdParticleRadius) < colTopSurfaceModifier[i].getTransform()[13]) || ( (birdParticle.position.y + birdParticleRadius) > colBotSurfaceModifier[i].getTransform()[13]) ){
          // You lose naab
          //console.log('xd noob');
          //console.log('>> lose');
          //phase = 'lose';
          erasethis++;
          Lose();
        }
      }
      else{
        if ( aux[0] == i && aux[1] == 1 ){
          if ( i == (numCols-1)){
            aux = [0,0];
          }
          else{
            aux = [i+1,0];
          }
          score++;
          setScore(score);
          //console.log('____________________');
          //console.log('New point! Total: ' +score);
          //console.log('Expecting col[' + aux[0] + ']');
        }
      }
    }
  }
}

function callback(){
  
  if ( colAux.isEmpty() === false ){
    var randomVal = colAux.dequeue();
    var auxTop = randomVal - (spaceHeight/2);
    var auxBot = 960 - heightFloor - (randomVal+(spaceHeight/2));
    var w_mitja = 800 * w_space;

    colBotSurfaceModifier[numCol].setTransform(
      Transform.translate(640,randomVal+(spaceHeight/2),0),
      {duration: 0}    
    );  
    colTopSurfaceModifier[numCol].setTransform(
      Transform.translate(640,randomVal-(spaceHeight/2),0),
      {duration: 0}    
    );  
    colBotSurfaceModifier[numCol].setTransform(
      Transform.translate(-colWidth,randomVal+(spaceHeight/2),0),
      {duration: time}    
    );  
    colTopSurfaceModifier[numCol].setTransform(
      Transform.translate(-colWidth,randomVal-(spaceHeight/2),0),
      {duration: time}    
    );  

    numCol = numCol + 1;

    if ( numCol == numCols ) { numCol = 0; } 
  }
}

function setColPosition(){
  
  for ( var i = 0; i < numCols; i++ ){
    
    colTopSurfaceModifier[i].setTransform(
      Transform.translate(640,0,0),
      {duration: 0}
    );
    colBotSurfaceModifier[i].setTransform(
      Transform.translate(640,960-heightFloor,0),
      {duration: 0}
    );
  }
}

// Main
Meteor.startup(function(){
  sinusDisp = new Transitionable(0);
  //transOut();
  sinusDisp.set(-50, {duration : 350, curve: Easing.outQuad}, function(){transIn();});
  //console.log(( (960-heightFloor-spaceMin-(spaceHeight/2)) - (spaceMin+(spaceHeight/2)) ));
  // Col Queue
  colQueue = new Queue();
  for ( var i = 0; i < 1000; i++ ){
    
    colQueue.enqueue(Math.floor((Math.random()*( (960-heightFloor-spaceMin-(spaceHeight/2)) - (spaceMin+(spaceHeight/2)) )) + (spaceMin+(spaceHeight/2))));
  }
  
  // gameHeight
  gameHeight = 960;
  
  for ( var i = 0; i < numCols; i++ ){
    
    colTopSurface[i] = new ImageSurface({
      content: 'img/pipe_up.png',
      properties: {
        zIndex: 2
      }      
    });
    colBotSurface[i] = new ImageSurface({
      content: 'img/pipe.png',
      properties: {
        zIndex: 2
      }      
    });
    
    colTopSurfaceModifier[i] = new StateModifier({
       size: [113,500],
       origin: [0,1]
    });
    colBotSurfaceModifier[i] = new StateModifier({ 
      size: [113,500],
      origin: [0,0]
    });
    
  }
  
  setColPosition();
  
  startSurface = new Surface({
    size: [640,960],
    properties: {
      backgroundColor: 'green',
      zIndex: 1
    }
  });
  
  gameBackgroundSurface = new ImageSurface({
    content: 'img/background5.png',
    size: [640,960],
    properties: {
      backgroundColor: 'green',
      zIndex: 1
    }
  });
  
  backgroundTop = new Surface({
    properties: {
      backgroundColor: bgC,
      zIndex: 4
    }
  });
  
  backgroundBot = new Surface({
    properties: {
      backgroundColor: bgC,
      zIndex: 4
    }
  });
  
  backgroundLeft = new Surface({
    properties: {
      backgroundColor: bgC,
      zIndex: 4
    }
  });
  
  backgroundRight = new Surface({
    properties: {
      backgroundColor: bgC,
      zIndex: 4
    }
  });
  
  floorSurface = new ImageSurface({
    content: 'img/floor4.png',
    properties : {
      zIndex: 3,
      backgroundColor: 'blue'
    }
  });
  
  floorSurfaceModifier = new Modifier({
    size: [640,heightFloor],
    transform: function(){
      return Transform.translate(0,960-heightFloor,0)
    }
  });
  
  // scoreView Surfaces and stuphph
  
  scoreViewButton1 =     new Surface({
    content: 'button1',
    properties: {backgroundColor: 'grey'}
  });
  scoreViewButton2 =     new Surface({
    content: 'button2',
    properties: {backgroundColor: 'yellow'}
  });
  scoreViewButton3 =     new Surface({
    content: 'button3',
    properties: {backgroundColor: 'black'}
  });
  scoreViewSurface =     new Surface({
    content: 'Surface',
    properties: {backgroundColor: 'green'}
  });
  scoreViewButtonOk =    new Surface({
    content: 'buttonOk',
    properties: {backgroundColor: 'red'}
  });
  
  scoreViewButton1Modifier =     new StateModifier({
    size: [186,65],
    transform:  Transform.translate(41,240,100)
  });
  scoreViewButton2Modifier =     new StateModifier({
    size: [186,65],
    transform:  Transform.translate(227,240,100)
  });
  scoreViewButton3Modifier =     new StateModifier({
    size: [186,65],
    transform:  Transform.translate(413,240,100)
  });
  scoreViewSurfaceModifier =     new StateModifier({
    size: [558,415],
    transform:  Transform.translate(41,305,100)
  });
  scoreViewButtonOkModifier =    new StateModifier({
    size: [186,65],
    origin: [0.5,0],
    transform:  Transform.translate(320,750,100)
  });
  
  
  // !scoreView
  
  buttonOkSurface = new ImageSurface({
    content: 'img/btn_ok.png',
    propeties: {
      backgroundColor: 'brown'
    }
  });
  
  buttonOkSurfaceModifier = new StateModifier({
    size: [188,65],
    origin: [0.5,0.5],
    transform:  Transform.translate(320,640,100)
  });
  
  buttonScoreSurface = new ImageSurface({
    content: 'img/btn_score.png',
    propeties: {
      backgroundColor: 'brown'
    }
  });
  
  buttonScoreSurfaceModifier = new StateModifier({
    size: [188,65],
    origin: [0.5,0.5],
    transform:  Transform.translate(320,710,100)
  });
  
  scoreSurface[0] = new ImageSurface({
    content: 'img/zero.png'
  });
  
  scoreSurfaceModifier[0] = new StateModifier({
    size: [42,60],
    origin: [0.5,0.5],
    transform: Transform.translate(320,50,100)
  });
  
  scoreSurface[1] = new ImageSurface({
    content: 'img/zero.png'
  });
  
  scoreSurfaceModifier[1] = new StateModifier({
    opacity: 0,
    size: [42,60],
    origin: [0.5,0.5],
    transform: Transform.translate(341,50,100)
  });
  
  scoreSurface[2] = new ImageSurface({
    content: 'img/zero.png'
  });
  
  scoreSurfaceModifier[2] = new StateModifier({
    opacity: 0,
    size: [42,60],
    origin: [0.5,0.5],
    transform: Transform.translate(362,50,100)
  });
  
  backgroundTopModifier = new StateModifier({
    size: [undefined,undefined],
    origin: [0.5,1],
    align: [0.5,0]
  });
  backgroundBotModifier = new Modifier({
    size: [900,undefined],
    origin: [0,0],
    transform: function(){
      return Transform.translate(0,960,0);
    }
  });
  backgroundLeftModifier = new StateModifier({
    size: [undefined,undefined],
    origin: [1,0.5],
    align: [0,0.5]
  });
  backgroundRightModifier = new Modifier({
    size: [undefined,1500],
    origin: [0,0],
    transform: function(){
      return Transform.translate(640,0,0);
    }
  });
  
  gameController = new RenderController({
    inTransition: {curve: Easing.inOutQuart, duration: 0},
    outTransition: {curve: Easing.inOutQuart, duration: 0},
    overlap: true
});
  
  gameControllerModifier = new Modifier({
    size: [640,960],
    transform: function(){
      var scale = Math.min(window.innerWidth / 640,(window.innerHeight / 960)*0.95);
      return Transform.scale(scale,scale,1);
    }
  });
  
  clickSurface = new Surface({
    size: [undefined,undefined],
    properties:
    {
      zIndex: 20
    }
  });
  
  clickSurfaceModifier = new StateModifier({
    opacity: 0
  });
  
  // Physics
  physicsEngine = new PhysicsEngine();
  birdParticle = new Circle({
    mass: birdParticleMass,
    radius: birdParticleRadius,
    position: birdParticleInitialPosition,
    velocity: birdParticleInitialVelocity
  });
  
  physicsEngine.addBody(birdParticle);
  gravity = new Force(gravityForce);
  floorWall = new Wall({ normal: [0,-1,0], distance: (960-heightFloor)});
  physicsEngine.attach(floorWall,birdParticle);
  
  bird1Surface = new ImageSurface({
    content: 'img/birdie_1.png'
  });
  bird1SurfaceModifier = new Modifier({
    opacity: 1,
    transform: function(){
      return Transform.translate(0,sinusDisp.get(),0);
    }
  });  
  bird2Surface = new ImageSurface({
    content: 'img/birdie_2.png'
  });
  bird2SurfaceModifier = new StateModifier({
    opacity: 0.01
  });
  bird3Surface = new ImageSurface({
    content: 'img/birdie_3.png'
  });
  bird3SurfaceModifier = new StateModifier({
    opacity: 0.01
  });
  
  birdSurfaceModifier = new Modifier({
    size: [76,57],
    origin: [0.5,0.5],
    transform: function(){
      return birdParticle.getTransform();
    }
  });
  
  // gameView Setup
  gameView = new View();
  gameView.add(gameBackgroundSurface);
  gameView.add(floorSurfaceModifier).add(floorSurface);
  //gameView.add(birdSurfaceModifier).add(bird3SurfaceModifier).add(bird3Surface);
  //gameView.add(birdSurfaceModifier).add(bird2SurfaceModifier).add(bird2Surface);
  gameView.add(birdSurfaceModifier).add(bird1SurfaceModifier).add(bird1Surface);
  for (var j = 0; j < numCols; j++){
    gameView.add(colTopSurfaceModifier[j]).add(colTopSurface[j]);
    gameView.add(colBotSurfaceModifier[j]).add(colBotSurface[j]);
  }
  //gameView.add(backgroundTopModifier).add(backgroundTop);
  gameView.add(scoreSurfaceModifier[0]).add(scoreSurface[0]);
  gameView.add(scoreSurfaceModifier[1]).add(scoreSurface[1]);
  gameView.add(scoreSurfaceModifier[2]).add(scoreSurface[2]);
  gameView.add(backgroundBotModifier).add(backgroundBot);
  gameView.add(backgroundRightModifier).add(backgroundRight);
  //gameView.add(backgroundLeftModifier).add(backgroundLeft);
  //gameView.add(clickSurfaceModifier).add(clickSurface);
  
  // lostView setup
  lostView = new View();
  lostView.add(buttonOkSurfaceModifier).add(buttonOkSurface);
  lostView.add(buttonScoreSurfaceModifier).add(buttonScoreSurface);
  lostView.add(gameBackgroundSurface);
  lostView.add(scoreSurfaceModifier[0]).add(scoreSurface[0]);
  lostView.add(scoreSurfaceModifier[1]).add(scoreSurface[1]);
  lostView.add(scoreSurfaceModifier[2]).add(scoreSurface[2]);
  lostView.add(floorSurfaceModifier).add(floorSurface);
  lostView.add(birdSurfaceModifier).add(bird1SurfaceModifier).add(bird1Surface);
  for (var j = 0; j < numCols; j++){
    lostView.add(colTopSurfaceModifier[j]).add(colTopSurface[j]);
    lostView.add(colBotSurfaceModifier[j]).add(colBotSurface[j]);
  }
  lostView.add(backgroundBotModifier).add(backgroundBot);
  lostView.add(backgroundRightModifier).add(backgroundRight);
  
  // scoreView setup
  scoreView = new View();
  
  scoreView.add(scoreViewButton1Modifier).add(scoreViewButton1);
  scoreView.add(scoreViewButton2Modifier).add(scoreViewButton2);
  scoreView.add(scoreViewButton3Modifier).add(scoreViewButton3);
  scoreView.add(scoreViewSurfaceModifier).add(scoreViewSurface);
  scoreView.add(scoreViewButtonOkModifier).add(scoreViewButtonOk);  
  
  for (var j = 0; j < numCols; j++){
    scoreView.add(colTopSurfaceModifier[j]).add(colTopSurface[j]);
    scoreView.add(colBotSurfaceModifier[j]).add(colBotSurface[j]);
  }
  
  scoreView.add(birdSurfaceModifier).add(bird1SurfaceModifier).add(bird1Surface);
  scoreView.add(gameBackgroundSurface);
  scoreView.add(floorSurfaceModifier).add(floorSurface);
  scoreView.add(backgroundBotModifier).add(backgroundBot);
  scoreView.add(backgroundRightModifier).add(backgroundRight);
  
  
  // startView setup
  startView = new View();
  
  //startView.add(scoreViewButton1Modifier).add(scoreViewButton1);
  //startView.add(scoreViewButton2Modifier).add(scoreViewButton2);
  //startView.add(scoreViewButton3Modifier).add(scoreViewButton3);
  //startView.add(scoreViewSurfaceModifier).add(scoreViewSurface);
  //startView.add(scoreViewButtonOkModifier).add(scoreViewButtonOk);
  
  startView.add(buttonOkSurfaceModifier).add(buttonOkSurface);
  startView.add(buttonScoreSurfaceModifier).add(buttonScoreSurface);
  
  startView.add(birdSurfaceModifier).add(bird1SurfaceModifier).add(bird1Surface);
  startView.add(gameBackgroundSurface);
  startView.add(floorSurfaceModifier).add(floorSurface);
  startView.add(backgroundBotModifier).add(backgroundBot);
  startView.add(backgroundRightModifier).add(backgroundRight);
  
  // mainContext setup
  mainContext = Engine.createContext();
  mainContext.add(gameControllerModifier).add(gameController);
  
  // Start
  //console.log('>> start');
  phase = 'start';
  gameController.show(startView);
          
  
  // Callback
  //Timer.setInterval(callback,tick);
  
  // EVENTS
  
  scoreViewButtonOk.on('click',function(){
    buttonOk();
  });
  
  buttonOkSurface.on('click', function(){
    buttonOk();
  });
  buttonScoreSurface.on('click', function(){
    buttonScore();
  });
  
  // mouseClick
  Engine.on('click', function(){
    action();
  });
  
  Engine.on('postrender',function(){    
    // Mirar colision
    collisionFunction();
  });
  
  Engine.on('keydown', function(e){
    switch (e.which){
      case 49:
        press1();
        break;
      case 32:
        action();
        break;
      case 38:
        action();
        break;
    }
  });
  
});


/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue(){

  // initialise the queue and offset
  var queue  = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function(){
    return (queue.length - offset);
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function(){
    return (queue.length == 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item){
    queue.push(item);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function(){

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

}