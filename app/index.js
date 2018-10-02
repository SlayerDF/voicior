
const synthForm = document.getElementById('synth-form')
const synthVoices = document.getElementById('synth-voices')
const synthText = document.getElementById('synth-text')

var synth = window.speechSynthesis
var voices = []

function populateVoiceList() {
    voices = synth.getVoices()
  
    voices.forEach(voice => {
        var option = document.createElement('option')
        option.textContent = voice.name + ' (' + voice.lang + ')'
      
        if (voice.default) {
            option.textContent += ' -- DEFAULT'
        }
  
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        synthVoices.appendChild(option)
    })
}

populateVoiceList()
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList
}

synthForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!voices || !synthText.value) return
    let utterance = new SpeechSynthesisUtterance(synthText.value)
    let maximVoice = voices.find((voice) => voice.name === synthVoices.selectedOptions[0].getAttribute('data-name'))
    if (maximVoice) utterance.voice = maximVoice
    synth.speak(utterance)

    synthText.value = ''
})