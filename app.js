function sendMsg() {
  const input = document.getElementById('msgInput');
  const chatBox = document.getElementById('chatBox');
  
  if (input.value.trim() !== '') {
    const msgDiv = document.createElement('div');
    msgDiv.style.background = '#dcf8c6';
    msgDiv.style.padding = '8px 12px';
    msgDiv.style.borderRadius = '8px';
    msgDiv.style.margin = '5px 0';
    msgDiv.style.alignSelf = 'flex-end';
    msgDiv.style.maxWidth = '70%';
    msgDiv.innerText = input.value;
    
    chatBox.appendChild(msgDiv);
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
