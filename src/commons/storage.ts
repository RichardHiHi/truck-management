export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function clearAll() {
  return localStorage.clear();
}

export function getEmail() {
  return localStorage.getItem('email');
}

export function setEmail(email: string) {
  return localStorage.setItem('email', email);
}
