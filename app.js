const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')



const humanExpressions = [
	{ img: './img/drink.jpg', text: 'Estou com sede' },
	{ img: './img/food.jpg', text: 'Estou com fome' },
	{ img: './img/tired.jpg', text: 'Estou cansado' },
	{ img: './img/hurt.jpg', text: 'Estou machucado' },
	{ img: './img/happy.jpg', text: 'Estou feliz' },
	{ img: './img/angry.jpg', text: 'Estou com raiva' },
	{ img: './img/sad.jpg', text: 'Estou triste' },
	{ img: './img/scared.jpg', text: 'Estou assustado' },
	{ img: './img/outside.jpg', text: 'Quero ir lá fora' },
	{ img: './img/home.jpg', text: 'Quero ir para casa' },
	{ img: './img/school.jpg', text: 'Quero ir para a escola' },
	{ img: './img/grandma.jpg', text: 'Quero ver a vovó' }
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage= text => {
	utterance.text = text
}

const speakText = () => {
	speechSynthesis.speak(utterance)
}

const setVoice = event => {
	const selectedVoice = voices.find(voice => voice.name === event.target.value)
	utterance.voice = selectedVoice
}

const addExpressionBoxesIntoDOM = () => {
	main.innerHTML = humanExpressions.map(({ img, text }) =>
	 `<div class="expression-box" data-js="${text}">
		<img src="${img}" alt="${text}" data-js="${text}">
		<p class="info" data-js="${text}">${text}</p>
	 </div>
`).join('')


}

addExpressionBoxesIntoDOM()

const setStyleOfClickedDiv = dataValue => {
	const div = document.querySelector(`[data-js="${dataValue}"]`)
		div.classList.add('active')

		setTimeout(() => {
			div.classList.remove('active')
		}, 1000)
}

main.addEventListener('click', event => {
	const clickedElement = event.target 
	const clickedElementText = clickedElement.dataset.js
	const clickedElementTextMustBeSoken = ['IMG', 'P'].some(elementName => 
		clickedElement.tagName.toLowerCase() === elementName.toLowerCase())

	if(clickedElementTextMustBeSoken){
		setTextMessage(clickedElementText)
		speakText()
		setStyleOfClickedDiv(clickedElementText)
	}
})

const insertOptionsElementsIntoDOM = voices => {
	selectElement.innerHTML = voices.reduce((accumulator, { name, lang }) => {
		accumulator += `<option value="${name}">${lang} | ${name}</option>`
		return accumulator
	}, '')
}

const setPTBRvoices = voices => {
	const mozVoice = voices.find(voice => 
		voice.name === 'Portuguese_(Brazil)')


	utterance.voice = mozVoice		
	const mozOptionsElement = selectElement
		.querySelector(`[value="${mozVoice.name}"]`)
		 mozOptionsElement.selected = true
}

let voices = []

//Gambiarra
const getVoices = () => {
	voices = speechSynthesis.getVoices()

	insertOptionsElementsIntoDOM(voices)

	setPTBRvoices(voices)
}
	
buttonInsertText.addEventListener('click', () => {
	divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', () => {
	divTextBox.classList.remove('show')
})


getVoices()

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click', () => {
	setTextMessage(textArea.value)
	speakText()
})