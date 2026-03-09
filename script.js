let exerciseData={}

fetch("exercises.json")
.then(res=>res.json())
.then(data=>{
exerciseData=data
})

const select=document.getElementById("bodyPart")

select.addEventListener("change",showExercises)

function showExercises(){

const part=select.value
const container=document.getElementById("exerciseContainer")

container.innerHTML=""

if(!exerciseData[part]) return

exerciseData[part].forEach(ex=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`
<h3>${ex.name}</h3>
<img src="${ex.gif}">
<p class="level">Difficulty: ${ex.difficulty}</p>
<p>Equipment: ${ex.equipment}</p>
<button onclick="speak('${ex.name}')">🔊 Speak</button>
`

container.appendChild(card)

})

}

function speak(text){

const speech=new SpeechSynthesisUtterance(text)
speech.lang="en-US"

speechSynthesis.speak(speech)

}

function startVoice(){

const recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition)()

recognition.lang="en-US"

recognition.start()

recognition.onresult=function(e){

let voice=e.results[0][0].transcript.toLowerCase()

document.getElementById("bodyPart").value=voice

showExercises()

}

}
