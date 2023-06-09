const path = require('path');
const express = require('express');
const app = express();
const PORT = 8000
const cors = require('cors')

app.use('*/css',express.static('public/css'), cors());
app.use('*/js', express.static('public/js'), cors());

app.get('/', (request, response) =>{
    response.sendFile(__dirname + '/Multiple Choice with Highlighted Pieces.html')
})

test_data = {
  'shakespeare': {"To be or not to be.": 
  [["Hamlet", "King Lear", "Romeo", "Tybalt"], ["Hamlet"]],
  "That time of year thou mayst in me _____":
  [["behold", "see", "regret", "observe"], ["behold"]],
  "That lord whose hand must take my plight shall carry / Half my love with him, half my care and duty.":
  [["Othello", "Cordelia", "Cleopatra", "Edmund"], ["Cordelia"]]
  },
  
  'vocabulary': {"Opposite of Clear": 
  [["murky", "lucid", "laborious", "sivilant"], ["murky"]],
  "Pleasure - Pain, Joy - _________":
  [["sorrow", "elation", "ebullience", "disgust"], ["behold"]],
  "Digress":
  [["short answer", "to go off topic", "long-winded", "pacify"], ["to go off topic"]]
  },
  'noName':{
    'Nothing here!': 'I have no name; if you must call me something, then call me noName!'
  }
  };

app.get('/api/:testName', (request, response) => {
    const testNames = request.params.testName.toLowerCase()
    if(test_data[testNames]){
        response.json(test_data[testNames])
        console.log(test_data[testNames])
        questionsIntoBoxes()
    }
    else{
        response.json(test_data['noName'])
        console.log(test_data['noName'])
    }
});

function questionsIntoBoxes(){
    mainQuestion.innerText = Object.keys(test_data[`${testName}`])[count]
    optionA.innerText = Object.values(test_data[`${testName}`])[count][0][0]
    optionB.innerText = Object.values(test_data[`${testName}`])[count][0][1]
    optionC.innerText = Object.values(test_data[`${testName}`])[count][0][2]
    optionD.innerText = Object.values(test_data[`${testName}`])[count][0][3]
};

app.listen(process.env.port || PORT, ()=>{
    console.log(`The Server is running on ${PORT}! You better go catch it!`)
});