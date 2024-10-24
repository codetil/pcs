document.addEventListener('DOMContentLoaded', (event) => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Simple responses based on keywords
    const responses = {
        'cycle': 'The menstrual cycle typically lasts 28 days, but can range from 21 to 35 days. It consists of four main phases: menstruation, the follicular phase, ovulation, and the luteal phase.',
        'product': 'There are various period products available, including pads, tampons, menstrual cups, and period underwear. Each has its own benefits and it\'s important to choose what\'s most comfortable for you.',
        'pain': 'Period pain is common. You can try over-the-counter pain relievers, heat therapy, gentle exercise, or relaxation techniques. If pain is severe, consult a healthcare provider.',
        'hygiene': 'Good hygiene during your period includes changing your pad/tampon regularly, washing your hands before and after, and cleaning your menstrual cup properly if you use one.',
        'myth': 'There are many myths about periods. For example, it\'s a myth that you can\'t get pregnant during your period. Always use protection if you\'re sexually active and not trying to conceive.',
        'default': 'I understand you\'re asking about something. To provide the most helpful information, could you please:\n\n• Be more specific about your question\n• Ask about one of these topics:\n  - Menstrual cycles and period basics\n  - Period products and their usage\n  - Pain management and comfort tips\n  - Hygiene practices and self-care\n  - Common concerns and myths\n\nWhat would you like to know more about?'
    };

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user' : 'bot');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        const lowercaseInput = input.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (lowercaseInput.includes(keyword)) {
                return response;
            }
        }
        return responses.default;
    }

    function handleUserInput() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, true);
            userInput.value = '';
            
            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse);
            }, 500);
        }
    }

    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserInput();
        }
    });
});