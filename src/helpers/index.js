// wrapper for fetch
const fetcher = (url) => {
  const options = {};

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.log("Fetcher error:" + err));
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
