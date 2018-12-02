(function() {

var conversationElt, messageInputElt;

function getAndClearInputMessage() {
  var res = messageInputElt.value;
  messageInputElt.value = '';
  return res;
}

function getResponse(sent) {
  return sent + '?';
}

function translateMessage(message) {
  return message;
}

function displayMessage(message) {
  conversationElt.innerHTML += message + '<br />';
  conversationElt.scrollTop = conversationElt.scrollHeight;
}

function processMessages() {
  // send
  var sent = getAndClearInputMessage();
  sent = translateMessage(sent);
  displayMessage(sent);

  // respond
  var response = getResponse(sent);
  displayMessage(response);
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