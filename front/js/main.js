let toys = {};
let cars = {};
let dolls = {};
let balls = {};
let lego = {};
let objArr = [];
let objArr1 = {};
let productsCart = {};
let itemsPerPage = 4;
let pageIndex = 0;
let countItem = document.querySelector(".countItem");

addEventListener("load", myFunction);

let loader;

function myFunction() {
  loader = setTimeout(showPage, 2000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

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

//Categories
renderCategory();
function renderCategory(data) {
  category = data;
  let html = ``;

  html += `
    <ul>
      <li id="all_cat">All</li>
      <li id="cars_cat">Cars</li>
      <li id="dolls_cat">Dolls</li>
      <li id="balls_cat">Balls</li>
      <li id="lego_cat">Lego</li>
    </ul>
    `;
  document.getElementById("navigation").innerHTML = html;

  //Render all
  document.getElementById("all_cat").addEventListener("click", allToys);

  //Render cars category
  let cars = document
    .getElementById("cars_cat")
    .addEventListener("click", function () {
      axios
        .get("http://localhost:3000/cars/")
        .then(function (response) {
          renderFilter(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

  function renderFilter(data) {
    
    cars = data;
    let html = ``;

    for (let i = 0; i < data.length; i++) {
      html += `<div class="render_toys">
        <img class="toy_img" src="${data[i].img}">
        <div class="toy">  
          <h3 class="product_name">${data[i].productName}</h3>
          <h4 class="product_price">${data[i].price}$</h4>
          <button class="add_to_cart_btn">Add to cart</button>
        </div>
      </div>
      `;
      document.getElementById("ispis").innerHTML = html;
    }
  }

  //Render dolls category
  let dolls = document
    .getElementById("dolls_cat");
    dolls.addEventListener("click", function () {
      axios
        .get("http://localhost:3000/dolls/")
        .then(function (response) {
          renderFilter(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
        
    });

  function renderFilter(data) {
    dolls = data;
    let html = ``;

    for (let i = 0; i < data.length; i++) {
      html += `<div class="render_toys">
      <img class="toy_img" src="${data[i].img}">
      <div class="toy">  
        <h3 class="product_name">${data[i].productName}</h3>
        <h4 class="product_price">${data[i].price}$</h4>
        <button class="add_to_cart_btn">Add to cart</button>
      </div>
    </div>
    `;
      document.getElementById("ispis").innerHTML = html;
    }
    
  }

  //Render balls category
  let balls = document
    .getElementById("balls_cat")
    .addEventListener("click", function () {
      axios
        .get("http://localhost:3000/balls/")
        .then(function (response) {
          renderFilter(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

  function renderFilter(data) {
    balls = data;
    let html = ``;

    for (let i = 0; i < data.length; i++) {
      html += `<div class="render_toys">
      <img class="toy_img" src="${data[i].img}">
      <div class="toy">  
        <h3 class="product_name">${data[i].productName}</h3>
        <h4 class="product_price">${data[i].price}$</h4>
        <button class="add_to_cart_btn">Add to cart</button>
      </div>
    </div>
    `;
      document.getElementById("ispis").innerHTML = html;
    }
  }
  //Render lego category
  let lego = document
    .getElementById("lego_cat")
    .addEventListener("click", function () {
      axios
        .get("http://localhost:3000/lego/")
        .then(function (response) {
          renderFilter(response.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });

  function renderFilter(data) {
    lego = data;
    let html = ``;

    for (let i = 0; i < data.length; i++) {
      html += `<div class="render_toys">
      <img class="toy_img" src="${data[i].img}">
      <div class="toy">  
        <h3 class="product_name">${data[i].productName}</h3>
        <h4 class="product_price">${data[i].price}$</h4>
        <button class="add_to_cart_btn">Add to cart</button>
      </div>
    </div>
    `;
      document.getElementById("ispis").innerHTML = html;
    }
  }
}

//Main function


function renderToys(data) {
  toys = data;
  let html = ``;

  for (let i = pageIndex * itemsPerPage; i < pageIndex * itemsPerPage + itemsPerPage; i++) {
    if (!data[i]) {
      break;
    }
    
    html += `
  <div class="render_toys">
    
    <div class="toy">  
      <img class="toy_img" src="${data[i].img}">
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
    loadPageNum(data);
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

  function loadPageNum(data) {
    const num = document.getElementById("pageNum");
    num.innerHTML = "";

    for (let i = 0; i < Math.ceil(data.length / itemsPerPage); i++) {
      const paraf = document.createElement("p");
      paraf.innerHTML = i + 1;

      paraf.addEventListener("click", function (e) {
        pageIndex = parseInt(e.target.textContent) - 1;
        renderToys(data);
      });
      if (i == pageIndex) {
        paraf.style.fontSize = "2rem";
      }
      num.append(paraf);
    }
  }

  function addToCart(toys) {
    let btn = this;
    let parent = btn.parentElement;
    let productImg = parent.querySelector(".toy_img").src;
    let desc = parent.querySelector(".product_name").textContent;
    let price = parent.querySelector(".product_price").textContent;

    objArr1 = { productImg, desc, price };
    objArr.push(objArr1);

    renderCart(productImg, desc, price);
    updateTotal();
    counterCart();

    localStorage.setItem("cart", JSON.stringify(objArr));
  }

  function counterCart() {
    countItem.innerHTML = objArr.length;
  }

  // console.log(objArr);

  function renderCart(productImg, desc, price) {
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
    <img class="product_img_cart" src="${productImg}">
    <div class="product_name_cart">${desc}</div>
    <div class="product_price_cart">${price}</div>
    <input type="number" min="1" max="10" value="1" class="quantity_cart">
    <button class="remove_btn_cart">Remove</button>    
    `;

    row.innerHTML = html;
    cartContent.append(row);

    row.querySelector(".remove_btn_cart").addEventListener("click", removeItem);
    row.querySelector(".quantity_cart").addEventListener("change", updateTotal);

    let quantity = row.querySelector(".quantity_cart").value;
    console.log(quantity);
  }

  //Removing from cart
  function removeItem() {
    tajProizvod = this.parentElement.remove();

    itemIndex = tajProizvod;
    objArr.splice(itemIndex, 1);
    console.log(objArr);

    //Update local Storage
    localStorage.setItem("cart", JSON.stringify(objArr));

    updateTotal();
    counterCart();
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
