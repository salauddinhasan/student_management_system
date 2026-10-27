export function isAuthenticated() {
  return false;
}

export function getSessionUser() {
  return null;
}

const auth = {
  isAuthenticated,
  getSessionUser,
};

export default auth;
