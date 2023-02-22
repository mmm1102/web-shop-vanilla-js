let toys = {};
let cars = {};
let dolls = {};
let balls = {};
let lego = {};

allToys();

//Getting data from database
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

function filterCat (data) {

let filterBtn = document.querySelectorAll(".filer_btn");
filterBtn.addEventListener("click", function (){

  axios.get("http://localhost:3000/${data}/")
  .then (function (response){
    renderCat(response.data.data);
  })
  .cath(function (err){
    console.log(err);
  })
})
function renderCat (data) {

}


}

//Categories
renderCategory();
function renderCategory(data) {
  category = data;
  let html = ``;

  html += `
    <ul>
      <li class="filter_btn" id="all_cat">All</li>
      <li class="filter_btn" id="cars_cat">Cars</li>
      <li class="filter_btn" id="dolls_cat">Dolls</li>
      <li class="filter_btn" id="balls_cat">Balls</li>
      <li class="filter_btn" id="lego_cat">Lego</li>
      <li class="filter_btn" id="baby_toys_cat">Baby Toys</li>
    </ul>
    `;
  document.getElementById("navigation").innerHTML = html;

  //Render category
  // let cars = document
  //   .getElementById("cars_cat")
  //   .addEventListener("click", function () {
  //     axios
  //       .get("http://localhost:3000/cars/")
  //       .then(function (response) {
  //         renderCars(response.data.data);
  //       })
  //       .catch(function (err) {
  //         console.log(err);
  //       });
  //   });

  //   function renderCars (data) {
  //     cars = data;
  //     let html = ``;

  //     for (let i = 0; i< data.length; i++) {
  //       html += `<div class="render_toys">
  //       <img class="toy_img" src="${data[i].img}">
  //       <div class="toy">  
  //         <h3 class="product_name">${data[i].productName}</h3>
  //         <h4 class="product_price">${data[i].price}$</h4>
  //         <button class="add_to_cart_btn">Add to cart</button>
  //       </div>
  //     </div>
  //     `;
  //     document.getElementById("ispis").innerHTML = html;
  //     }
  //   }
}

//Main function
function renderToys(data) {
  toys = data;
  let html = ``;

  for (let i = 0; i < data.length; i++) {
    html += `
  <div class="render_toys">
    <img class="toy_img" src="${data[i].img}">
    <div class="toy">  
      <h3 class="product_name">${data[i].productName}</h3>
      <h4 class="product_price">${data[i].price}$</h4>
      <button class="add_to_cart_btn">Add to cart</button>
    </div>
  </div>
  `;
    if (data.length == 0) {
      html = "Nema rezultata";
    }
    document.getElementById("ispis").innerHTML = html;
  }
  console.log(toys);

  //Shopping cart Modal
  let modal = document.getElementById("myModal");
  let btn = document.getElementById("cart_icon");
  let span = document.querySelector(".close");
  btn.addEventListener("click", function () {
    modal.style.display = "block";
  });
  span.addEventListener("click", function () {
    modal.style.display = "none";
  });
  window.addEventListener("click", function () {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  //Adding to cart
  const cartContent = document.getElementById("cart_content");
  const addToCartBtn = document.querySelectorAll(".add_to_cart_btn");
  addToCartBtn.forEach((elem) => {
    elem.addEventListener("click", addToCart);
  });
  function addToCart(toys) {
    let btn = this;
    let parent = btn.parentElement;
    let desc = parent.querySelector(".product_name").textContent;
    let price = parent.querySelector(".product_price").textContent;

    renderCart(desc, price);
    updateTotal();
  }

  function renderCart(desc, price) {
    const row = document.createElement("div");
    row.classList.add("row_flex");
    let Names = document.querySelectorAll(".product_name_cart");
    for (let i = 0; i < Names.length; i++) {
      if (Names[i].textContent == desc) {
        alert("The product is already in cart");
        return;
      }
    }
    let html = `
    <div class="product_name_cart">${desc}</div>
    <div class="product_price_cart">${price}</div>
    <input type="number" min="1" max="10" value="1" class="quantity_cart">
    <button class="remove_btn_cart">Remove</button>    
    `;

    row.innerHTML = html;
    cartContent.append(row);

    row.querySelector(".remove_btn_cart").addEventListener("click", removeItem);
    row.querySelector(".quantity_cart").addEventListener("change", updateTotal);
  }

  //Removing from cart
  function removeItem() {
    this.parentElement.remove();
    updateTotal();
  }

  //Total sum
  function updateTotal() {
    let cartContent = document.getElementById("cart_content");
    let rows = cartContent.querySelectorAll(".row_flex");
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
}

//Redirection to Register Page
document.querySelector(".reg_btn").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/front/register.html";
});

document.querySelector(".reg_btn_modal").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/front/register.html";
});

//Redirection to Login Page
document.querySelector(".sign_in_btn").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/front/login.html";
});

document
  .querySelector(".sign_in_btn_modal")
  .addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/front/login.html";
  });
