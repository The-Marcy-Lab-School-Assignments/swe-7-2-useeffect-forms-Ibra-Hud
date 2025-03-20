/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
- render the list of fetched gifs (or the defaultGifs) as list items with an `img` inside. Remember to give each list item a unique key!
- Bonus: if at any point an error is returned, render the default gifs again.
*/

import defaultGifs from "../gifs.json";
import { getGifsBySearch, getTrendingGifs } from "../adapters/giphyAdapters";
import { useState } from "react";
import { useEffect } from "react";

const GifContainer = ({ searchTerm }) => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getTrendingGifs();
      console.log("response: ", response);
      setGifs(response[0].data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await getGifsBySearch(searchTerm);
      console.log("response: ", response);
      setGifs(response[0].data);
    };

    fetch();
  }, [searchTerm]);

  //   const response = await getTrendingGifs();
  //   const [gif1, gif2, gif3] = response[0].data;

  //   console.log(response[0].data);
  //   console.log(gif1);

  return (
    <ul>
      {gifs.map((gif) => (
        <li key={gif.id}>
          <img src={gif.images.original.url} alt={gif.alt_text || "GIF"} />
        </li>
      ))}
    </ul>
  );
};

export default GifContainer;
