import { displayProductsHTML, attachAddToCartListeners } from "./displayProducts.js";
import { cart, addToCart, updateCartQuantity } from "../data/cart.js";

attachAddToCartListeners(); 
updateCartQuantity();

window.addEventListener('storage', (event)=>{
  if(event.key === 'cart') {
    cart.length = 0;
    cart.push(...(JSON.parse(localStorage.getItem('cart')) || []));

    updateCartQuantity();
  }
});