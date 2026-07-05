export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productId) {
  let matchingItem;

  cart.forEach((cartItem)=>{
   if(productId === cartItem.productId) {
     matchingItem = cartItem;
   }
  });

  if(matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
  saveToStorage();
  updateCartQuantity();
}

export function updateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  let cartCount = document.querySelector('.js-cart-count');
  if(cartCount) {
    cartCount.innerHTML = cartQuantity;
  }
}

export function removeFromCart (productId) {
  const newCart = cart.filter((cartItem)=>{
    return cartItem.productId !== productId;
  });

  cart.length = 0;
  cart.push(...newCart);
}