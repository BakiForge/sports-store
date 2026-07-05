import { cart, saveToStorage, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { calculateMoney } from '../data/money.js';

export function displayCartHTML () {
  let cartHTML = '';

  if(cart.length === 0) {
    document.querySelector('.js-cart-items').innerHTML = '<p class="empty-cart">Cart is empty</p>';
    return;
  }

  cart.forEach((cartItem)=>{
    let matchingProduct;
     products.forEach((product)=>{
        if(cartItem.productId === product.id) {
           matchingProduct = product;
        } 
     });
     cartHTML += `
            <div class="cart-item">
                  <div class="item-image"><img class="item-image" src="${matchingProduct.image}"></div>

                    <div class="item-info">
                      <h3 class="item-name">${matchingProduct.name}</h3>
                      <p class="item-price">$${calculateMoney(matchingProduct.priceCents)}</p>

                      <div class="quantity-controls">
                        <button class="qty-btn">-</button>
                        <span class="qty">${cartItem.quantity}</span>
                        <button class="qty-btn">+</button>
                      </div>

                      <button class="remove-btn" data-product-id="${matchingProduct.id}">Remove</button>
                    </div>
             </div>
               `;
  });

  document.querySelector('.js-cart-items').innerHTML = cartHTML;
}

 document.querySelector('.js-cart-items')
   .addEventListener('click',(event)=>{
     const button = event.target;
     const productId = button.dataset.productId;
     removeFromCart(productId);
     saveToStorage();
     displayCartHTML();
   });