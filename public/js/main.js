let mainQuestion = document.querySelector('#mainQuestion');
let optionA = document.querySelector('.a');
let optionB = document.querySelector('.b');
let optionC = document.querySelector('.c');
let optionD = document.querySelector('.d');

let nextQuestion = document.querySelector('#nextQuestion');
let gameOver = document.querySelector('.gameOver');
let tryAgain = document.querySelector('#tryAgain');

let score = document.querySelector('.score');
let Number = 0;
let count = 0;
let testNumber = 1;

const overlay = document.getElementById('overlay');
let finalYes = document.querySelector('#finalYes');

var myButtons = document.querySelectorAll('.option');
let finalAnswer = document.querySelector('.final-Answer');
let greenScreen = document.querySelector('.correctScreen');

const btns = document.querySelectorAll('.btn');

let testTopic = '';

document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
  testTopic = document.getElementById('inputting').value;
  try{
    const response = await fetch(`http://localhost:8000/api/${testName}`)
    const data = await response.json()
    start()
    console.log(data)
}catch(error){
    console.log(error)
}
};

console.log(testName);

// btns.forEach(function (btn){
//   btn.addEventListener('click', function (e){
//     const styles = e.currentTarget.classList;
//     if(styles.contains('shakespeare')){
//       testNumber = 1;
//       questionsIntoBoxes();
//     }
//     else if(styles.contains('vocabulary')){
//       testNumber = 0;
//       questionsIntoBoxes();
//     }
//   })
// });

// test_data = {
//   'shakespeare': {"To be or not to be.": 
//   [["Hamlet", "King Lear", "Romeo", "Tybalt"], ["Hamlet"]],
//   "That time of year thou mayst in me _____":
//   [["behold", "see", "regret", "observe"], ["behold"]],
//   "That lord whose hand must take my plight shall carry / Half my love with him, half my care and duty.":
//   [["Othello", "Cordelia", "Cleopatra", "Edmund"], ["Cordelia"]]
//   },
  
//   'vocabulary': {"Opposite of Clear": 
//   [["murky", "lucid", "laborious", "sivilant"], ["murky"]],
//   "Pleasure - Pain, Joy - _________":
//   [["sorrow", "elation", "ebullience", "disgust"], ["sorrow"]],
//   "Digress":
//   [["short answer", "to go off topic", "long-winded", "pacify"], ["to go off topic"]]
//   }
//   };

function questionsIntoBoxes(){
    mainQuestion.innerText = Object.keys(test_data[`${testName}`])[count]
    optionA.innerText = Object.values(test_data[`${testName}`])[count][0][0]
    optionB.innerText = Object.values(test_data[`${testName}`])[count][0][1]
    optionC.innerText = Object.values(test_data[`${testName}`])[count][0][2]
    optionD.innerText = Object.values(test_data[`${testName}`])[count][0][3]
};

function start(){
  questionsIntoBoxes()
for (var i = 0; i < myButtons.length; i++) {
  var button = myButtons[i];
  button.addEventListener('click', function() {
    var x = document.querySelectorAll(".activated");

    if(x.length) {
        x[0].classList.remove('activated');
    }
    this.classList.toggle("activated");
    finalAnswer.style.display = 'block';
    overlay.classList.add('active')
  });
}
};

let finalNo = document.querySelector('#finalNo');

finalNo.addEventListener('click', resetFunction);

function resetFunction(){
    finalAnswer.style.display = 'none'
    overlay.classList.remove('active')
    for (var i = 0; i < myButtons.length; i++) {
    var button = myButtons[i];
    var x = document.querySelectorAll(".activated");
    if(x.length) {
        x[0].classList.remove('activated');
    }
}
};

nextQuestion.addEventListener('click', function(){
    count++
    questionsIntoBoxes()
    resetFunction()
    greenScreen.style.display = 'none'
  });

tryAgain.addEventListener('click', function(){
    count = 0;
    questionsIntoBoxes();
    resetFunction();
    gameOver.style.display = 'none';
});

finalYes.addEventListener('click', checkAnswer)

function checkAnswer(){
  let choosersAnswer;
  var elements = document.querySelector('.activated');
  choosersAnswer = elements.textContent;

  if (Number !== 3 && choosersAnswer === Object.values(test_data[`${testTopic}`])[count][1][0]){
    finalAnswer.style.display = 'none'
    greenScreen.style.display = 'block'
    Number++
    score.textContent = Number
  }

  if (Number === 3){
    greenScreen.style.display = 'none';
    overlay.classList.remove('active');
    document.querySelector('.youWin').style.display = 'block';
  }

  if (choosersAnswer !== Object.values(test_data[`${testTopic}`])[count][1][0]){
    gameOver.style.display = 'block';
  }
};




