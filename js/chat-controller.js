class ChatController {
    constructor() {
        this.knowledgeBase = new KnowledgeBase();
        this.messageHandler = new MessageHandler();
        this.setupEventListeners();
        this.setupTextarea();
    }

    setupEventListeners() {
        const textarea = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        textarea.addEventListener('input', () => {
            this.adjustTextareaHeight(textarea);
        });
    }

    setupTextarea() {
        const textarea = document.getElementById('userInput');
        textarea.setAttribute('style', 'height:' + textarea.scrollHeight + 'px;overflow-y:hidden;');
    }

    adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    sendMessage() {
        const textarea = document.getElementById('userInput');
        const message = textarea.value.trim();
        
        if (message === '') return;

        this.messageHandler.addMessage(message, 'user');
        const response = this.knowledgeBase.findBestMatch(message);
        this.messageHandler.addMessage(response, 'bot');

        textarea.value = '';
        textarea.style.height = 'auto';
    }
}

const chatController = new ChatController();