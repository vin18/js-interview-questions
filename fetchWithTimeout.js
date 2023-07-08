const API_URL = `https://jsonplaceholder.typicode.com/posts`;

/**
 *
 * @param {*} url      - API url
 * @param {*} duration - Duration in millisecond
 * @returns Promise    - data or error of the API response
 */
function fetchWithTimeout(url, duration) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let intervalId;

    fetch(URL, { signal })
      .then((res) => {
        clearInterval(intervalId);
        res.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(new Error(error)));

    intervalId = setTimeout(() => {
      controller.abort();
    }, duration);
  });
}

// Below function  can be used to boost network performance
fetchWithTimeout(API_URL, 100)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
