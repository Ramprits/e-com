
const CART_KEY = "CART_KEY";
const JWT_KEY = 'JWT_KEY'
export const CalculatedCart = items => {
  return `${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`
}


export const setCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value))
  }
}

export const getCart = (cartKey = CART_KEY) => {
  if (localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
  return []
}

export const setToken = (value, key = JWT_KEY) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getToken = (tokenKey = JWT_KEY) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
}


export const clearToken = (tokenKey = JWT_KEY) => {
  if (localStorage) {
    localStorage.removeItem(tokenKey);
  }
}

export const clearCart = (cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.removeItem(cartKey);
  }
}


