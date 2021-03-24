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

const createExpressionBox = ({ img, text }) => {
	const div = document.createElement('div')

	div.classList.add('expression-box')
	div.innerHTML = ` 
		<img src="${img}" alt="${text}">
		<p class="info">${text}</p>
	`

	div.addEventListener('click', () => {
		setTextMessage(text)
		speakText()

		div.classList.add('active')
		setTimeout(() => {
			div.classList.remove('active')
		}, 1000)
	})


	main.appendChild(div)
}

humanExpressions.forEach(createExpressionBox)

let voices = []

//Gambiarra
const getVoices = () => {
	voices = speechSynthesis.getVoices()
	const mozVoice = voices.find(voice => 
		voice.name === 'Portuguese_(Brazil)')
	const otVoice  = voices.find(voice => 
		voice.name === 'urn:moz-tts:speechd:Portuguese_(Brazil)?pt-BR')



	voices.forEach(({ name, lang }) => {
		const option = document.createElement('option')

		option.value = name


		if(mozVoice && option.value === mozVoice.name){
			utterance.voice = mozVoice
			option.selected = true
		}else if(otVoice && option.value === otVoice.name){
			utterance.voice = otVoice
			option.selected = true
		}


		option.textContent = `${lang} | ${name}`
		selectElement.appendChild(option)
	})
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