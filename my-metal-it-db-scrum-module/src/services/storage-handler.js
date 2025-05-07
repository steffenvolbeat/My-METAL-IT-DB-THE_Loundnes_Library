// src/services/storage-handler.js
const STORAGE_PREFIX = "metal-scrum-";

export async function saveItem(key, data) {
  return new Promise((resolve) => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    resolve();
  });
}

export async function loadItem(key, defaultValue = null) {
  return new Promise((resolve) => {
    const json = localStorage.getItem(STORAGE_PREFIX + key);
    resolve(json ? JSON.parse(json) : defaultValue);
  });
}

export async function getAllKeys() {
  return Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_PREFIX))
    .map((k) => k.replace(STORAGE_PREFIX, ""));
}
