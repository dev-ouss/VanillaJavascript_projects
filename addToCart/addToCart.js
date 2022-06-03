// DOM components
const nav = document.querySelector(".nav");
const banner = document.querySelector(".banner");
const addBtn = document.querySelectorAll(".addtocart");
const buyBtn = document.querySelector(".purchase__btn");
const product = document.querySelectorAll(".product");
const cart = document.querySelector(".cart");
const cartTotalRow = document.querySelector(".total__row");
let bannerHeight = banner.getBoundingClientRect().height;
let productsArray = [];
let cartTotal = document.querySelector(".total__price");
// Event Listeners
window.addEventListener("scroll", headerSolid);
addBtn.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});
buyBtn.addEventListener("click", purchase);
cart.addEventListener("click", removeItem);

// functions

function headerSolid() {
  if (window.scrollY > bannerHeight) {
    nav.classList.add("nav__solid");
  } else {
    nav.classList.remove("nav__solid");
  }
}
function addToCart(e) {
  let productTitle =
    e.target.parentElement.parentElement.querySelector("h3").innerText;
  let productPrice = e.target.parentElement.querySelector(".price").innerText;
  let productImage =
    e.target.parentElement.parentElement.querySelector("img").src;
  let tr = document.createElement("tr");
  tr.className = "cart__product";
  tr.setAttribute("id", productTitle);
  tr.innerHTML = `<td class="cart_img">
            <img src="${productImage}" alt="product image"/>
            <p>${productTitle}</p>
          </td>
          <td><p>${productPrice}</p></td>
          <td>
            <input type="number" name="quantity" id="quantity" />
            <button class="remove__btn">REMOVE</button>
          </td>`;
  if (
    productsArray.findIndex((product) => {
      return product.name == productTitle;
    }) == -1
  ) {
    productsArray.push({
      name: productTitle,
      price: Number(productPrice.replace("$", "")),
    });
    cartTotalRow.parentElement.insertBefore(tr, cartTotalRow);
    totalPrice();
  } else {
    alert("You have already added this item!");
  }
}

function totalPrice() {
  const quantity = document.querySelectorAll('[type="number"]');
  quantity.forEach((input, i) => {
    input.addEventListener("change", () => {
      productsArray[i].quantity = Number(input.value);
      totalPrice();
    });
  });
  let sum = productsArray.reduce((a, b) => {
    if (b.quantity) return a + b.price * b.quantity;
    return a + b.price;
  }, 0);
  cartTotal.textContent = sum.toFixed(2);
}

function removeItem(e) {
  if (e.target.classList.contains("remove__btn")) {
    let firstParent = e.target.parentElement.parentElement.parentElement;
    let child = e.target.parentElement.parentElement;
    let childId = child.getAttribute("id");
    firstParent.removeChild(child);
    productsArray = productsArray.filter((product) => {
      return product.name != childId;
    });
    totalPrice();
  }
}

function purchase() {
  if (productsArray.length == 0) {
    alert("No items in your cart!");
    return;
  }
  let products = cart.querySelectorAll(".cart__product");
  products.forEach((product) => {
    product.parentElement.removeChild(product);
  });
  productsArray = [];
  totalPrice();
  setTimeout(() => {
    alert("Thank you for your purchase :)");
  }, 100);
}
