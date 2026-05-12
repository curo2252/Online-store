const search = document.querySelector(".search");
const productsContainer = document.querySelector(".products");

const defaultProducts = productsContainer.innerHTML;

function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){

  const cartBtn = document.querySelector(".cart");
  const cart = getCart();

  let count = 0;

  cart.forEach(item=>{
    count += item.count;
  });

  if(cartBtn){
    
    cartBtn.innerHTML = `
    <img src="icons/cart.png" class="cart-icon">
    <span>· ${count}</span>`;

  }

}

function activateButtons(){

  const buttons = document.querySelectorAll(".add");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const product = button.closest(".product");

      const name = product.querySelector("h3").textContent;
      const price = product.querySelector(".price").textContent;
      const img = product.querySelector("img").src;

      let cart = getCart();

      const item = cart.find(p => p.name === name);

      if(item){
        item.count++;
      }else{
        cart.push({name, price, img, count:1});
      }

      saveCart(cart);

      updateCartCount();

      button.textContent = "Добавлено";

      setTimeout(() => {
        button.textContent = "Добавить";
      }, 500);

    });

  });

}

function renderProducts(list){

  productsContainer.innerHTML = "";

  list.forEach(product => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${product.img}" alt="${product.name}">
        <div class="product-body">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <div class="price-row">
            <div class="price">${product.price}</div>
            <button class="add">Добавить</button>
          </div>
        </div>
      </div>`;
  });

  activateButtons();

}
activateButtons();
updateCartCount();

if(search){

  search.addEventListener("input", () => {

    const value = search.value.toLowerCase().trim();
    if(value === ""){
      productsContainer.innerHTML = defaultProducts;
      activateButtons();
      return;
    }

    const result = allProducts.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value)
    );

    renderProducts(result);

  });

}

const loader = document.querySelector(".loader");
  window.addEventListener("load",()=>{
    if(loader){
      setTimeout(()=>{loader.classList.add("hide");},1500);
      }
});