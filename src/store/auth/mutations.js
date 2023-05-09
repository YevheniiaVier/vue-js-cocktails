export function setUserData(state, userData) {
  state.user = { ...userData };
}

export function setToken(state, token) {
  state.token = token;
}

export function clearUserData(state) {
  state.token = "";
  state.user = null;
}
export function setNewAvatar(state, url) {
  state.user.avatarURL = url;
}
