const socket = io("http://localhost:3000");
const messageContainer = document.querySelector(".real-chat-system");
const sendButton = document.querySelector("messageButton");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const updateCont = document.querySelector(".update");
const loginCont = document.querySelector(".loginCont");
const usernameInput = document.getElementById("usernameInput");
const loginButton = document.getElementById("loginbtn");
const sendchatBtn = document.getElementById("send-message");
const sendchatInput = document.getElementById("message-input");
const nameHolder = document.getElementById("my-name");
const messageHolder = document.getElementById("my-text");
const othername = document.getElementById("other-name");
const othertext = document.getElementById("other-text");
const messageCont = document.querySelector(".messages");
const exitBtn = document.getElementById("exit_chat");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  socket.emit("new-user", username);
  loginCont.classList.add("active");
  messageContainer.classList.remove("active");
});

socket.on("update", (username) => {
  let name = username;
  const updatediv = document.createElement("div");
  updatediv.innerHTML = `${name} has joined the conversation`;
  updatediv.classList.add("update");
  messageCont.appendChild(updatediv);
});

sendchatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let message = sendchatInput.value;
  console.log(message);
  const messageDiv = document.createElement("div");
  let person = "You";
  messageDiv.innerHTML = ` <div class="message my-message">
            <div>
              <div class="message">
                <div class="name" id="my-name">${person}</div>
                <div class="text" id="my-text">${message}</div>
              </div>
            </div>
          </div>`;
  messageCont.appendChild(messageDiv);
  socket.emit("send-chat-message", message);
  sendchatInput.value = "";
});

socket.on("chat-message", (data) => {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = ` <div class="message other-message">
            <div>
              <div class="message">
                <div class="name" id="other-name">${data.username}</div>
                <div class="text" id="other-text">${data.message}</div>
              </div>
            </div>
          </div>`;
  messageCont.appendChild(messageDiv);
  //   appendMessage(data.username, data.message);
  console.log(data);
});

exitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginCont.classList.remove("active");
  messageContainer.classList.add("active");
  socket.emit("disconnect-user");
});

socket.on("user-disconnected", (username) => {
  let name = username;
  const updatedivDelete = document.createElement("div");
  updatedivDelete.innerHTML = `${name} has left the conversation`;
  updatedivDelete.classList.add("update");
  messageCont.appendChild(updatedivDelete);
});
