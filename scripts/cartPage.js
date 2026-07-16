import { displayCartHTML, displayTotalHTML } from './displayCart.js';
import { cart, updateCartQuantity } from "../data/cart.js";

displayCartHTML();
displayTotalHTML();

window.addEventListener('storage',(event)=>{
    if(event.key === 'storage') {
        cart.length = 0;
        cart.push(...(JSON.parse(localStorage.getItem('cart')) || []));
    }
    updateCartQuantity();
    displayTotalHTML();
});