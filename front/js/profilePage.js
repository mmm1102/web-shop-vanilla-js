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
let cartContent = document.getElementById("cart_content");
let old_data = JSON.parse(localStorage.getItem("cart"));
let html = ``;

//Render cart content
renderCart()
function renderCart() {

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

  //Setting listeners on remove and quantity
  let removeBtns = document.querySelectorAll(".remove_btn_cart");
  removeBtns.forEach(elem => {
    elem.addEventListener("click", removeItem)
  })

let changeQua = document.querySelectorAll(".quantity_cart");
changeQua.forEach(elem => {
  elem.addEventListener("change", updateTotal);
})


  function removeItem() {
    this.parentElement.remove();
    localStorage.removeItem(this)
    updateTotal();
  }

  //Total sum
  function updateTotal() {
    // let cartContent = document.getElementById("cart_content");
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
