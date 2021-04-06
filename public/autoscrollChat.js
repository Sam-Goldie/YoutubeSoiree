const autoscrollChat = function() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

export default autoscrollChat;