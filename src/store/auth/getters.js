export function isLoggedIn(state) {
  return Boolean(state.token);
}

export function getUser(state) {
  return state.user;
}
