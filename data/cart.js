let cart = [{
  productId: '1',
  quantity: 1
}, 
{
  productId: '2',
  quantity: 2
}
];

function saveToStorage () {
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
}