import { useState, useRef } from 'react';
import InfiniteScrolling from './InfiniteScrolling';

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const controllerRef = useRef(null);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const getData = (query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();

        const data = await fetch(
          'https://dummyjson.com/products/search?' +
            new URLSearchParams({
              q: query,
              page: pageNumber,
            }),
          { signal: controllerRef.current.signal }
        );
        const resp = await data.json();
        console.log(resp);

        resolve();

        setData((prevData) => [...prevData, ...resp.products]);
      } catch (error) {
        reject();
      }
    });
  };

  const renderItem = ({ title }, key, ref) => (
    <div key={key} ref={ref}>
      {title}
    </div>
  );

  return (
    <>
      <input type="text" value={query} onChange={handleInput} />

      <InfiniteScrolling
        renderListItem={renderItem}
        getData={getData}
        listData={data}
        query={query}
      />
    </>
  );
}

export default App;
