// script.js (Global Utilities & Chat)

/**
 * Shows a Bootstrap toast notification.
 * This function is global as it can be called from any part of the application.
 * @param {string} message The message to display in the toast.
 * @param {string} type The type of toast (e.g., 'success', 'danger', 'info').
 */
function showToast(message, type = 'success') {
    const toastElement = document.getElementById('cartToast');
    const toastBody = document.getElementById('toast-message');

    if (toastElement && toastBody) {
        toastBody.textContent = message;
        toastElement.classList.remove('bg-success', 'bg-danger', 'bg-info'); // Clear previous types
        toastElement.classList.add(`bg-${type}`);

        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    } else {
        console.warn('Toast elements not found. Cannot display toast:', message);
    }
}

/**
 * Opens the chat modal for a specific seller and loads chat history.
 * @param {string} sellerId The ID of the seller to chat with.
 */
function openChat(sellerId) {
    window.currentSellerId = sellerId; // Update global currentSellerId
    const chatSellerIdDisplay = document.getElementById('chatSellerIdDisplay');
    if (chatSellerIdDisplay) {
        chatSellerIdDisplay.textContent = `(${sellerId})`;
    }
    renderChatMessages();
    // Scroll to bottom of chat
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

/**
 * Renders chat messages for the current seller.
 */
function renderChatMessages() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    if (!chatMessagesContainer) return;

    chatMessagesContainer.innerHTML = ''; // Clear existing messages

    const messages = window.chatMessages[window.currentSellerId] || [];

    if (messages.length === 0) {
        chatMessagesContainer.innerHTML = '<div class="text-center text-muted">Start a conversation!</div>';
    }

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('p-2', 'my-1', 'rounded-3', 'shadow-sm', 'chat-message'); // Bootstrap classes
        messageDiv.classList.add(msg.sender === 'buyer' ? 'bg-success-subtle' : 'bg-light'); // Bootstrap colors
        messageDiv.classList.add(msg.sender === 'buyer' ? 'ms-auto' : 'me-auto'); // Align messages
        messageDiv.style.maxWidth = '80%'; // Inline style for max-width
        messageDiv.textContent = msg.message;
        chatMessagesContainer.appendChild(messageDiv);
    });
    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

/**
 * Sends a new chat message.
 */
function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const messageText = chatInput.value.trim();

    if (messageText && window.currentSellerId) {
        if (!window.chatMessages[window.currentSellerId]) {
            window.chatMessages[window.currentSellerId] = [];
        }
        // Simulate buyer sending message
        window.chatMessages[window.currentSellerId].push({ sender: 'buyer', message: messageText });
        localStorage.setItem('chatMessages', JSON.stringify(window.chatMessages)); // Save to local storage

        renderChatMessages();
        chatInput.value = ''; // Clear input

        // Simulate seller response (optional, for demo purposes)
        setTimeout(() => {
            if (window.chatMessages[window.currentSellerId]) {
                window.chatMessages[window.currentSellerId].push({ sender: 'seller', message: `Hi! I received your message: "${messageText}". How can I help you?` });
                localStorage.setItem('chatMessages', JSON.stringify(window.chatMessages));
                renderChatMessages();
            }
        }, 1500);
    }
}

// Expose global functions
window.showToast = showToast;
window.openChat = openChat;
window.renderChatMessages = renderChatMessages;
window.sendMessage = sendMessage;
