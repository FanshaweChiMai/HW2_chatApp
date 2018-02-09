(() => {
  const socket = io();

  let messgeList = document.querySelector('url'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickName = null;

  function setNickname(){
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e){
    e.preventDefault(); //prevent the default behavior - a submit trigger
    nickName = (nickName && nickName.length >0) ? nickName : 'user';
    msg = `${nickName}` says `${chatMessage.value}`;

    socket.emit('chat message', msg);
    chatMessage.value = "";
    return false;
  }

  function appendMessage (msg){
    let newMsg = `<li>${msg}</li>`; //getting the message from server
    messageList.innerHTML += newMsg;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener
})();
