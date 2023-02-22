renderProfile();

function renderProfile() {
  JSON.parse(sessionStorage.getItem("user"));

  document.getElementById("user").textContent = JSON.parse(
    sessionStorage.getItem("user")
  ).username;

  document.querySelector(".log_out_btn").addEventListener("click", function(){
    alert("You logged out");
    window.location.href = "http://127.0.0.1:5500/front/index.html";
    sessionStorage.removeItem("user");
  })
}


