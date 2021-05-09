// wrapper for fetch
const fetcher = (url) => {
  return fetch(url).then((res) => res.json());
};

// used to retrieve id from url
const getIdFromURL = (URL) => {
  return URL.match(/\d+/)[0];
};

// capitalizes and removes underscores from strings
const formatTitle = (str) => {
  const words = str.split(/\s+|_+/g);
  for (let i = 0; i < words.length; i++) {
    words[i] = `${words[i][0].toUpperCase()}${words[i].substr(1)}`;
  }

  return words.join(" ");
};

export { fetcher, getIdFromURL, formatTitle };
