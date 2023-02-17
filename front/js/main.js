let toys = {};
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
      <li>Cars</li>
      <li>Dolls</li>
      <li>Balls</li>
      <li>Lego</li>
      <li>Baby Toys</li>
    </ul>
    `;
  document.getElementById("navigation").innerHTML = html;
}

//Main function
function renderToys(data) {
  toys = data;
  let html = ``;

  for (let i = 0; i < data.length; i++) {
    html += `
  <div>
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
    alert("Toy added to cart");
    let btn = this;
    let parent = btn.parentElement;
    let desc = parent.querySelector(".product_name").textContent;
    let price = parent.querySelector(".product_price").textContent;
    

    renderCart(desc,price);
  }

  function renderCart(desc,price){
    const row = document.createElement("div");
    row.classList.add("row_flex");
    let html = `
    <div class="product_name_cart">${desc}</div>
    <div class="product_price_cart">${price}</div>
    <div class="quantity_cart"><input type="number" min="1" max="10" value="1"></div>
    <button class="remove_btn_cart">Remove</button>
    `;
    row.innerHTML = html;
    cartContent.append(row);
  }

  //Total sum
  function updateTotal(){
    let 
  }
}

