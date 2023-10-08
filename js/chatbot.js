const chatbotButton = document.getElementById('chatbotButton');
const chatbotContent = document.getElementById('chatbotContent');
const closeChatbotButton = document.getElementById('closeChatbot');


let isOpen = false;
chatbotButton.addEventListener('click', () => {
    if (!isOpen) {
        chatbotContent.classList.remove('hidden');
        chatbotButton.style.height = '300px'; // Adjust the height as needed
        isOpen = true;
    } else {
        chatbotContent.classList.add('hidden');
        chatbotButton.style.height = '60px';
        isOpen = false;
    }
});
closeChatbotButton.addEventListener('click', () => {
    chatbotContent.classList.add('hidden');
    chatbotButton.style.height = '60px';
    isOpen = false;
});