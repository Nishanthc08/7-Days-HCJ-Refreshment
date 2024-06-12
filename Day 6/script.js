document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = messageInput.value;
        socket.emit('chatMessage', msg);
        messageInput.value = '';
        messageInput.focus();
    });

    socket.on('chatMessage', (msg) => {
        const div = document.createElement('div');
        div.textContent = msg;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});