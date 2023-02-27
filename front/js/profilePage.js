let objArr = [];
let toys = {};
let users = {};
const wrapper = document.querySelector(".wrapper");

let id;
renderProfile();

function renderProfile() {
  JSON.parse(sessionStorage.getItem("user"));

  document.getElementById("user").textContent = JSON.parse(
    sessionStorage.getItem("user")
  ).username;

  document.querySelector(".log_out_btn").addEventListener("click", function () {
    alert("You logged out");
    window.location.href = "http://127.0.0.1:5500/front/index.html";
    sessionStorage.removeItem("user");
  });
}

//Geting data from local Storage
cartContent = document.getElementById("cart_content");
old_data = JSON.parse(localStorage.getItem("cart"));
let html = ``;

//Render cart content
renderCart();
function renderCart() {
  if (old_data.length == 0) {
    cartContent.innerHTML += `Your shoppinig cart is empty`;
  } else {
    old_data.forEach((elem) => {
      console.log(elem);
      html = `
    <div class="row_flex">
      <img class="product_img_cart" src="${elem.productImg}">
      <div class="product_name_cart">${elem.desc}</div>
      <div class="product_price_cart">${elem.price}</div>
      <input type="number" min="1" max="10" value="1" class="quantity_cart">
      <button class="remove_btn_cart">Remove</button>  
    </div>
    `;
      cartContent.innerHTML += html;
    });

    //Setting listeners on remove btn and quantity
    let removeBtns = document.querySelectorAll(".remove_btn_cart");
    removeBtns.forEach((elem) => {
      elem.addEventListener("click", removeItem);
    });

    let changeQua = document.querySelectorAll(".quantity_cart");
    changeQua.forEach((elem) => {
      elem.addEventListener("change", updateTotal);
    });

    function removeItem() {
      if (old_data.length == 0) {
        cartContent.innerHTML += `Your shoppinig cart is empty`;
      } else {
        tajProizvod = this.parentElement.remove();

        itemIndex = tajProizvod;
        let old_data = JSON.parse(localStorage.getItem("cart"));

        // let index = old_data.indexOf(itemIndex);
        old_data.splice(itemIndex, 1);

        //Update local Storage
        localStorage.setItem("cart", JSON.stringify(old_data));

        updateTotal();
      }
    }
  }

  //Total sum
  function updateTotal() {
    let rows = document.querySelectorAll(".row_flex");
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
      let price_per_item = rows[i].querySelector(
        ".product_price_cart"
      ).textContent;
      let cena = parseFloat(price_per_item.substring(0));
      let kolicina = rows[i].querySelector(".quantity_cart").value;
      total = total + cena * kolicina;
    }
    document.querySelector("#total_sum").textContent = total;
  }
  updateTotal();
  console.log(old_data);
}

adminPrivileges();
function adminPrivileges() {
  if (JSON.parse(sessionStorage.getItem("user")).rola == "1") {
    wrapper.style.display = "flex";
    //Render toys from database
    const ispis = document.querySelector(".render_db_info");

    let allToysBtn = document
      .getElementById("toys_btn")
      .addEventListener("click", allToys);
    function allToys() {
      axios
        .get("http://localhost:3000/allToys/")
        .then(function (response) {
          renderToys(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function renderToys(data) {
      toys = data;
      let html = `
    <table>
    <tr>
    <th>id</th>
    <th>image</th>
    <th>product name</th>
    <th>price</th>
    <th>update name</th>
    <th>remove from database</th>
    </tr>
    </table>
    `;

      for (let i = 0; i < data.length; i++) {
        html += `
   
    <table>
      <tr>
        <td>${data[i].id}</td>
        <td><img class="toy_img" src="${data[i].img}"></td>
        <td><input type="text" class="product_name${data[i].id}" value="${data[i].productName}" ></td>
        
        <td><h4 class="product_price">${data[i].price}</h4></td>
        <td><button class="update_name_btn" data-id="${data[i].id}">Update</button></td>
        <td><button class="remove_btn" data-id="${data[i].id}">Remove</button></td>
      </tr>
    </table>
    `;
        if (data.length == 0) {
          html = "Nema rezultata";
        }
        ispis.innerHTML = html;
      }

      //Updade products info
      const btnUpdateName = document.querySelectorAll(".update_name_btn");

      btnUpdateName.forEach((elem) => {
        elem.addEventListener("click", function (e) {
          let id = e.target.dataset.id;
          let value = document.querySelector(".product_name" + id).value;
          console.log(id);

          axios
            .put("http://localhost:3000/update", {
              id: id,
              newName: value,
            })
            .then((response) => {
              alert(response.data.result);
              allToys();
            })
            .catch(function (err) {
              console.error(err.response);
            });
        });
      });

      //Delete product from database
      const delBtn = document.querySelectorAll(".remove_btn");

      delBtn.forEach((elem) => {
        elem.addEventListener("click", function (e) {
          let id = e.target.dataset.id;
          console.log(id);

          axios
            .delete("http://localhost:3000/toy", { data: { id: id } })
            .then((response) => {
              alert(response.data.result);
              allToys();
            })
            .catch(function (err) {
              console.log(err);
            });
        });
      });
    }
  }
}



function adminPriv() {
  if (JSON.parse(sessionStorage.getItem("user")).rola == "1") {
    wrapper.style.display = "flex";
    //Render toys from database
    const ispis = document.querySelector(".render_db_info");
    //Render registered users from database

    let allUsersBtn = document
      .getElementById("users_btn")
      .addEventListener("click", allUsers);
    function allUsers() {
      axios
        .get("http://localhost:3000/allUsers/")
        .then(function (response) {
          renderUsers(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function renderUsers(data) {
      users = data;
      let html = `
    <table>
    <tr>
    <th>id</th>
    <th>ime</th>
    <th>prezime</th>
    <th>username</th>
    <th>email</th>
    <th>password</th>
    <th>rola</th>
    <th>update info</th>
    <th>remove user</th>
    </tr>
    </table>
    `;
      for (let i = 0; i < data.length; i++) {
        html += `
 
  <table>
    <tr>
      <td>${data[i].id}</td>
      <td>${data[i].firstName}</td>
      <td>${data[i].lastName}</td>
      <td>${data[i].username}</td>
      <td>${data[i].email}</td>
      <td>${data[i].password}</td>
      <td>${data[i].rola}</td>
    
    
      <td><button class="update_user_btn" data-id="${data[i].id}">Update</button></td>
      <td><button class="remove_user_btn" data-id="${data[i].id}">Remove</button></td>
    </tr>
  </table>
  `;
        if (data.length == 0) {
          html = "Nema rezultata";
        }

        ispis.innerHTML = html;
      }
renderUsers()
      const delUserBtn = document.querySelectorAll(".remove_user_btn");
      delUserBtn.addEventListener("click", function (e) {
        let id = e.target.dataset.id;
        console.log(id);
        axios
          .delete("http://localhost:3000/user", { data: { id: id } })
          .then((response) => {
            alert(response.data.result);
            allUsers();
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    }
  }
}
adminPriv();
