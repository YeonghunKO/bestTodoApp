
const storage = localStorage;

const getItem = (key) => {
  const cachedItems = storage.getItem(key);

  return JSON.parse(cachedItems);
};

const setItem = (keyword, value) => {
  storage.setItem(keyword, JSON.stringify(value));
};

const removeItem = (keyword) => {
  storage.removeItem(keyword);
};

export { getItem, setItem, removeItem };

