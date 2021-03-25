// global constants
var clueHoldTime = 1000; //how long to hold each clue's light/sound

var cluePauseTime = 333; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var darkmode = false;
var difficulty = 0;
var piano = 0;
var map;
var prefix = "button";
var mistakes = 0;

function startGame(){
    //initialize game variables
    document.getElementById("strikes").innerHTML = "Strikes Left: 3";
    mistakes = 0;
    progress = 0;
    gamePlaying = true;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    context.resume();
    pattern = createPattern();

    playClueSequence();
}

function stopGame(){
    gamePlaying = false;
    document.getElementById("stopBtn").classList.add("hidden");
    document.getElementById("startBtn").classList.remove("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 293.66,
  3: 329.63,
  4: 369.99,
  5: 392.00,
  6: 440.00
}
const pianoMap = {
  1: 261.6,
  2: 277.18,
  3: 293.66,
  4: 311.13,
  5: 329.63,
  6: 349.23,
  7: 369.99,
  8: 392.00,
  9: 415.30,
  10: 440.00,
  11: 466.16,
  12: 493.88,
  13: 523.25
}
function playTone(btn,len){
  if (piano == 1){
    map = pianoMap;
  }
  else{
    map = freqMap;
  }
  o.frequency.value = map[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if (piano == 1){
    map = pianoMap;
  }
  else{
    map = freqMap;
  }
  if(!tonePlaying){
    o.frequency.value = map[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  if (piano == 0){
    document.getElementById(prefix+btn).classList.add("hidden");
    document.getElementById("img"+btn).classList.remove("hidden");
  }
  else{
    document.getElementById(prefix+btn).classList.add("lit");
  }

}
function clearButton(btn){
  if (piano == 0){
    document.getElementById(prefix+btn).classList.remove("hidden");
    document.getElementById("img"+btn).classList.add("hidden");
  }
  else{
    document.getElementById(prefix+btn).classList.remove("lit");
  }
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  console.log("clueHoldTime " + clueHoldTime);
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  switch(difficulty){
    case 0:
      clueHoldTime -= 100;
      break;
    case 1:
      clueHoldTime -= 40;
      break;
    case 2:
      clueHoldTime -= 7;
      break;
  }
}
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You win!");
}
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  if (btn == pattern[guessCounter]){
    if (guessCounter == progress){
      if (progress == pattern.length - 1){
        winGame()
      }
      else{
        progress++;
        playClueSequence();
      }
    }
    else{
      guessCounter++;
    }
  }
  else if (mistakes < 2){
    mistakes++;
    document.getElementById("strikes").innerHTML = "Strikes Left: " + (3 - mistakes);
    playClueSequence();
  }
  else{
    mistakes++;
    document.getElementById("strikes").innerHTML = "Strikes Left: " + (3 - mistakes);
    loseGame();
  }

  // add game logic here
}
function changeMode()
{
  if (!darkmode){
    //if currently lightmode it will be switched to darkmode
    changeMode1("darkmode", "lightmode");
    darkmode = true;
  }
  else{
    //if currently darkmode it will be switched to lightmode
    changeMode1("lightmode", "darkmode");
    darkmode = false;
  }
}
function changeMode1(mode1, mode2)
{
  document.getElementById("body").classList.add(mode1);
  document.getElementById("body").classList.remove(mode2);
  let buttonList = document.getElementsByTagName("button");
  for(let i = 0; i < buttonList.length; i++){
    buttonList[i].classList.add(mode2);
    buttonList[i].classList.remove(mode1);
  }
}

function setSelected(val)
{
  if (!gamePlaying && val != difficulty){
    switch (difficulty){
    case 0:
      document.getElementById("easyBtn").classList.remove("selected");
      break;
    case 1:
      document.getElementById("mediumBtn").classList.remove("selected");
      document.getElementById("button5").classList.add("hidden");
      break;
    case 2:
      document.getElementById("hardBtn").classList.remove("selected");
      document.getElementById("button5").classList.add("hidden");
      document.getElementById("button6").classList.add("hidden");
      break;
    case 3:
      document.getElementById("pianoBtn").classList.remove("selected");
      document.getElementById("pianoButtonArea").classList.add("hidden");
      document.getElementById("gameButtonArea").classList.remove("hidden");
      prefix = "button";
      piano = 0;
      break;
    }
    switch(val){
    case 0:
      document.getElementById("easyBtn").classList.add("selected");
      document.getElementById("button5").classList.add("hidden");
      if (!document.getElementById("button6").classList.contains("hidden")){
        document.getElementById("button5").classList.add("hidden");
      }
      clueHoldTime = 1000; //how long to hold each clue's light/sound

      cluePauseTime = 333; //how long to pause in between clues
      nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
      break;
    case 1:
      document.getElementById("mediumBtn").classList.add("selected");
      document.getElementById("button5").classList.remove("hidden");
      clueHoldTime = 500;

      cluePauseTime = 200;
      nextClueWaitTime = 500;
      break;
    case 2:
      document.getElementById("hardBtn").classList.add("selected");
      document.getElementById("button5").classList.remove("hidden");
      document.getElementById("button6").classList.remove("hidden");
      clueHoldTime = 250;

      cluePauseTime = 100;
      nextClueWaitTime = 250;
      break;
    case 3:
      document.getElementById("pianoBtn").classList.add("selected");
      document.getElementById("gameButtonArea").classList.add("hidden");
      document.getElementById("pianoButtonArea").classList.remove("hidden");
      piano = 1;
      prefix = "pianoButton";
      clueHoldTime = 500;

      cluePauseTime = 200;
      nextClueWaitTime = 500;
      break;
    }
    difficulty = val;
  }
}
function createPattern(){
  var len;
  var numOfButtons;
  if (difficulty == 3){
    return [1, 1, 8, 8, 10, 10, 8, 6, 6, 5, 5, 3, 3, 1];
  }
  switch (difficulty){
    case 0:
      len = 5;
      numOfButtons = 4;
      break;
    case 1:
      len = 9;
      numOfButtons = 5;
      break;
    case 2:
      len = 14;
      numOfButtons = 6;
      break;
    }
  var e = [];
  for(let i = 0; i < len; i++){
    let j = Math.floor(Math.random() * numOfButtons) + 1;
    e.push(j);
  }
  console.log(e);
  return e;
}
