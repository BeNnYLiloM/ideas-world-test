export function setLocalStorageItem(name, value) {
  localStorage.setItem(name, value)
}

export function getLocalStorageItem(name) {
  return localStorage.getItem(name)
}

export function deleteLocalStorageItem(name) {
  localStorage.removeItem(name)
}
