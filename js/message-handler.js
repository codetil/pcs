class MessageHandler {
    constructor() {
        this.messageContainer = document.getElementById('chatMessages');
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (sender === 'bot') {
            this.showTypingIndicator();
            setTimeout(() => {
                this.removeTypingIndicator();
                this.renderFormattedMessage(contentDiv, text);
                messageDiv.appendChild(contentDiv);
                this.messageContainer.appendChild(messageDiv);
                this.scrollToBottom();
            }, 1000 + Math.random() * 1000);
        } else {
            contentDiv.textContent = text;
            messageDiv.appendChild(contentDiv);
            this.messageContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    renderFormattedMessage(container, text) {
        const paragraphs = text.split('\n\n');
        paragraphs.forEach((paragraph, index) => {
            const p = document.createElement('p');
            if (paragraph.includes('•')) {
                const lines = paragraph.split('\n');
                lines.forEach(line => {
                    const lineElement = document.createElement('div');
                    lineElement.textContent = line;
                    p.appendChild(lineElement);
                });
            } else {
                p.textContent = paragraph;
            }
            container.appendChild(p);
            if (index < paragraphs.length - 1) {
                container.appendChild(document.createElement('br'));
            }
        });
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot typing';
        indicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        this.messageContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = this.messageContainer.querySelector('.typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
}