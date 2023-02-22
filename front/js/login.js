//Redirection back to Home Page
document.getElementById("backBtn").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/front/index.html";
});

//******** LOGIN PAGE *******
let username;
const loginForm = document.getElementById("form");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  axios
    .post("http://localhost:3000/checkUser", {
      username: username,
      password: password,
    })
    .then((response) => {
      checkLogin(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
});

function checkLogin(data) {
  if (data.data == "ok") {
    alert ("Successfully logged in!");
    sessionStorage.setItem(
      "user",
      JSON.stringify({ username: username})
    );
    window.location.href = "http://127.0.0.1:5500/front/profilePage.html";
  } else {
    alert("Neuspesna prijava")
  }
}