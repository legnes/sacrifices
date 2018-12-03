var chipLimit;

(function() {
var CHIP_LIMIT = 3;
var conversationElt, messageInputElt, chipCounterElt, chipInputElts;
var chipInputs = {};

function getAndClearInputMessage() {
  var res = messageInputElt.value;
  messageInputElt.value = '';
  return res;
}

function getResponse(sent) {
  //sent = replaceLong(sent, 4);
  sent = replaceLetters(sent, 'p')
  return sent + '?';
}

function replaceLetters(sentence, letter){
  var words = getWords(sentence);
  newSentence = '';
  for(i = 0; i < words.length; i++){
    word = words[i];
    if(word[0]==letter){

      newSentence = newSentence + " " + "***"; //randomRhyme(word);
    } else{
      newSentence = newSentence + " " + word
    }
  }
  return newSentence
}

function replaceLong(sentence, len){
  var words = getWords(sentence);
  newSentence = '';
  for(i = 0; i < words.length; i++){
    word = words[i];
    if(word.length>len){

      newSentence = newSentence + " " + randomRhyme(word);
    } else{
      newSentence = newSentence + " " + word
    }
  }
  return newSentence
}

function randomRhyme(word){
  var rhymes = pronouncing.rhymes(word);
  let ind = Math.floor(Math.random()*rhymes.length);
  return rhymes[ind];
}

function getWords(sentence){
  return sentence.split(" ");
}

function garble(string){
  var garbledString = ""
  for (i = 0; i < string.length; i++){
    garbledString = garbledString + "*";
  }
  return garbledString;
}

function translateMessage(message) {
  var messageWords = getWords(message);

  // TODO: Other rules!
  if(chipInputs.pwords==false){
    // TODO: Use a regex?
    for (var i=0; i<messageWords.length; i++){
      if (messageWords[i].startsWith("p","P")){
        messageWords[i] = garble(messageWords[i]);
      }
    }
  }

  return messageWords.join(' ');
}

function displayMessage(message, senderName, isRight) {
  var imageHTML = senderName ? `<img src="assets/${senderName}.jpg"></img>` : '';
  var balloonHTML = `<div class="balloon ${isRight ? 'from-right' : 'from-left'}">${message}</div>`
  var messageHTML = `<div class="message ${isRight ? '-right' : '-left'}">${isRight ? (balloonHTML + imageHTML) : (imageHTML + balloonHTML)}</div>`
  conversationElt.innerHTML += messageHTML;

  conversationElt.scrollTop = conversationElt.scrollHeight;
}

function processMessages() {
  // send
  var sent = getAndClearInputMessage();
  sent = translateMessage(sent);
  displayMessage(sent, 'player', false);

  // respond
  var response = getResponse(sent);
  displayMessage(response, 'cp1', true);
}

function updateChipCount(val) {
  chipCounterElt.innerHTML = `Remaining chips: ${val}`;
}

chipLimit = function() {
  var chipCount = 0;
  for (var i = 0; i < chipInputElts.length; i++) {
    var chipInputElt = chipInputElts[i];
    chipInputs[chipInputElt.name] = chipInputElt.checked;
    if (chipInputElt.checked) chipCount++;
  }

  if (chipCount > CHIP_LIMIT) {
    // Clear all
    // TODO: just disable beforehand?
    for (var i = 0; i < chipInputElts.length; i++) {
      chipInputElts[i].checked = false;
    }
    chipCount = 0;
  }

  updateChipCount(CHIP_LIMIT - chipCount);
}

function initInputs() {
  // TODO: add other input handling here e.g. circuitboard
  window.addEventListener('keydown', function(evt) {
    switch(evt.key) {
      case 'Enter':
        processMessages();
        evt.preventDefault();
        return false;
    }
  });

  for (var i = 0; i < chipInputElts; i++) {
    chipInputs[chipInputElts[i].name] = false;
  }


  updateChipCount(CHIP_LIMIT);
}

function init() {
  conversationElt = document.getElementById('conversation');
  messageInputElt = document.getElementById('messageInput');
  chipCounterElt = document.getElementById('chipCounter');
  chipInputElts = document.getElementsByClassName('chip-input');
  initInputs();
}

document.addEventListener('DOMContentLoaded', init);

})();