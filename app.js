const chatWindow = document.querySelector('.chat-window');
const userInput = document.querySelector('#user-input');
const form = document.querySelector('.chat-form');

const addMessageToChat = (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<p><strong>You:</strong> ${message}</p>`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const addBotResponseToChat = async (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<p><strong>Bot:</strong> ${message}</p>`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<p><strong>You:</strong> ${userMessage}</p>`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    userInput.value = '';
    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        message: userMessage,
      });
      const botResponse = response.data[0].text;
      addBotResponseToChat(botResponse);
    } catch (error) {
      console.log(error);
    }
  });


