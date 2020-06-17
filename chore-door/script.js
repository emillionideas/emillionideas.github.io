let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let botDoorPath = "https://emily8385.github.io/chore-door/images/Opening-door-animation_v2_TheGirl_smaller.gif";
let beachDoorPath = "https://emily8385.github.io/chore-door/images/Opening-door-animation_v2d-withBG-smaller copy.gif";
let spaceDoorPath = "https://emily8385.github.io/chore-door/images/Opening-door-animation_v2d-withBG-smaller.gif";
let closedDoorPath = "https://emily8385.github.io/chore-door/images/Opening-door-animation_v2.png";
let girl = document.getElementById('girl');
let currentlyPlaying = true;

const startButton = document.getElementById('start');
// Buidling a loser
const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
if(door.src === closedDoorPath) {
  return false;
} else {
  return true;
}
}

doorImage1.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage1)) {
  doorImage1.src = openDoor1;
  playDoor(doorImage1);
  }
}
doorImage2.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage2)) {
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
  }
}
doorImage3.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage3)) {
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if(!currentlyPlaying) {startRound();
  }
}

function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}
  
function gameOver(status) {
if(status === 'win') {
  startButton.innerHTML = 'You win! Play again?'
} else {
  startButton.innerHTML = 'Game over! Play again?'
}
currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
numClosedDoors = 3;
const choreDoor = Math.floor(Math.random() * numClosedDoors);
if(choreDoor === 0) {
openDoor1 = botDoorPath;
openDoor2 = beachDoorPath;
openDoor3 = spaceDoorPath;
} else if(choreDoor === 1) {
openDoor2 = botDoorPath;
openDoor1 = beachDoorPath;
openDoor3 = spaceDoorPath;
} else {
openDoor3 = botDoorPath;
openDoor1 = beachDoorPath;
openDoor2 = spaceDoorPath;
}
}
startRound();

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

const playDoor = (door) => {
    numClosedDoors--;
  if(numClosedDoors === 0) {
    gameOver('win');
  } else if(isBot(door)) {
    gameOver();
    on();
  }
}
girl.onclick = () => {
  off();
}