import { products } from './products.js';

let cart = [{
  productId: '1',
  quantity: 1
}];

function addToCart (productId) {
   let matchingItem;

   cart.forEach((cartItem)=>{
     if(cartItem.id === matchingItem.productId) {
       matchingItem = cartItem;
     }
   });

   if(matchingItem) {
    matchingItem.quantity++;
   } else {
    cart.push({
      productId: productId,
      quantity: 1
    })
   }
}

