const API_KEY = '21925746-60d8df6678e20ce47ee1562cb';
const BASE_URL = 'https://pixabay.com/api/';


  export default function fetchImg(searchTerm, page) {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchTerm}&page=${page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => hits);
  }