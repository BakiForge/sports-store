import { displayProductsHTML, attachAddToCartListeners } from "./displayProducts.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";

displayProductsHTML();
attachAddToCartListeners(); 
updateCartQuantity();