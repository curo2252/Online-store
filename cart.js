const cartPage = document.querySelector(".cart-page");
const finishBtn = document.querySelector(".finish-btn");

function getCart(){
return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
localStorage.setItem("cart",JSON.stringify(cart));
}

function renderCart(){

const cart = getCart();

cartPage.innerHTML = "";

if(cart.length === 0){
cartPage.innerHTML = "<p>Корзина пуста</p>";
return;
}

let total = 0;

cart.forEach((item,index)=>{

const price =
parseFloat(item.price);

total += price * item.count;

cartPage.innerHTML += `
<div class="cart-product">

<img src="${item.img}">

<div>

<h3>${item.name}</h3>

<p>${item.price}</p>

<div class="cart-controls">

<button onclick="minusItem(${index})">-</button>

<span>${item.count}</span>

<button onclick="plusItem(${index})">+</button>

</div>

</div>

</div>
`;

});

cartPage.innerHTML += `
<div class="total-price">
Общая сумма: ${total.toFixed(2)} ₼
</div>
`;

}

function plusItem(index){

const cart = getCart();

cart[index].count++;

saveCart(cart);

renderCart();

}

function minusItem(index){

const cart = getCart();

cart[index].count--;

if(cart[index].count <= 0){
cart.splice(index,1);
}

saveCart(cart);

renderCart();

}

finishBtn.addEventListener("click",()=>{

const cart = getCart();

const msg =
document.querySelector(".success-message");

if(cart.length === 0){

msg.textContent = "Корзина пуста";

msg.classList.add("error");

msg.classList.add("show");

setTimeout(()=>{

msg.classList.remove("show");

},1500);

return;

}

msg.classList.remove("error");

msg.textContent =
"Покупка успешно завершена";

localStorage.removeItem("cart");

msg.classList.add("show");

setTimeout(()=>{

window.location.href="index.html";

},1600);

});

renderCart();