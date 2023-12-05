import './App.css'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults';
import { useEffect, useState, useCallback } from 'react';


function App() {
  const [images, setImages] = useState([])
  const [searchString, setSearchString] = useState('minions')

  const searchOptions = {
    key: process.env.REACT_APP_GIPHY_KEY,
    limit: 10,
    rating: 'G',
    api: 'https://api.giphy.com/v1/gifs',
    endpoint: '/search'
  }

  const getImages = useCallback(() => {
    const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&q=${searchString}&limit=${searchOptions.limit}&offset=${searchOptions.offset}&rating=${searchOptions.rating}&lang=en`

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setImages(response.data)
      })
      .catch(console.error)
  }, [searchOptions.api, searchOptions.endpoint, searchOptions.key, searchString, searchOptions.limit, searchOptions.offset, searchOptions.rating])

  useEffect(() => {
    getImages()
  }, [getImages])

  function handleChange(event) {
    setSearchString(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    getImages()
  }

  return (
    <div>
      <h1>Giphy Searcher</h1>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchString={searchString}
      />

      <SearchResults images={images} />
    </div>
  );
}

export default App;