//******** REGISTER PAGE *******

  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();


    const firstName=document.getElementById("firstName").value;
    const lastName=document.getElementById("lastName").value;
    const username=document.getElementById("username").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirm_password").value;


    const body = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };
    console.log(body);

    axios
      .post("http://localhost:3000/register", body)
      .then(function (res) {
        checkInsert(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  function checkInsert(data) {
    if (data.data == "ok") {
      alert("User added to database");
      window.location.href = "login.html";
    } else {
      alert("User with that username already exist!");
    }
  }

//Redirection back to Home Page
document.getElementById("backBtn").addEventListener("click", function(){
  window.location.href = "http://127.0.0.1:5500/front/index.html"
})