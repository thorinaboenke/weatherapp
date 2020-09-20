//ust an HTTP response, not the actual JSON
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
