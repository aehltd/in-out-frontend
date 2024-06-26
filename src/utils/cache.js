const cache = {};

export const setCacheUser = (key, value) => {
  cache[key] = value;
};

export const getCacheUser = (key) => {
  return cache[key] || null;
};

export const emptyCache = () => {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
};

export const printCache = () => {
  console.table(cache);
};
