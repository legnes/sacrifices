(function() {
var conversationElt, messageInputElt;

function getAndClearInputMessage() {
  var res = messageInputElt.value;
  messageInputElt.value = '';
  return res;
}

function getResponse(sent) {
  //sent = replaceLetters(sent, 'm')
  return sent + '?';
}

function replaceLetters(sentence, letter){
  var words = getWords(sentence);
  newSentence = '';
  for(i = 0; i < words.length; i++){
    word = words[i];
    if(word[0]==letter){
      newSentence = newSentence + " " + pronouncing.rhymes(word)[0];
    } else{
      newSentence = newSentence + " " + word
    }
  }
  return newSentence
}

function getWords(sentence){
  return sentence.split(" ");
}

function translateMessage(message) {
  return message;
}

function displayMessage(message, isRight) {
  conversationElt.innerHTML += `<div class="message ${isRight ? '-right' : '-left'}"><div class="balloon ${isRight ? 'from-right' : 'from-left'}">${message}</div></div>`;
  conversationElt.scrollTop = conversationElt.scrollHeight;
}

function processMessages() {
  // send
  var sent = getAndClearInputMessage();
  sent = translateMessage(sent);
  displayMessage(sent, false);

  // respond
  var response = getResponse(sent);
  displayMessage(response, true);
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
}

function init() {
  conversationElt = document.getElementById('conversation');
  messageInputElt = document.getElementById('messageInput');
  initInputs();
}

document.addEventListener('DOMContentLoaded', init);

})();