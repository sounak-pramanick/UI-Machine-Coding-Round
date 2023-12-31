import React, { useCallback, useEffect, useRef, useState } from 'react';

const InfiniteScrolling = ({ renderListItem, getData, listData, query }) => {
  const [loading, setLoading] = useState(false);
  const pageNumber = useRef(1);

  const observer = useRef(null);
  const lastElementObserver = useCallback((node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchData();
      }
    });

    if (node) observer.current.observe(node);
  });

  const fetchData = useCallback(() => {
    setLoading(true);
    getData(query, pageNumber.current).finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderList = () => {
    return listData.map((item, index) => {
      if (index === listData.length - 1)
        return renderListItem(item, index, lastElementObserver);
      return renderListItem(item, index, null);
    });
  };

  return (
    <>
      {renderList()}
      {loading && <span style={{ fontSize: '18px' }}>LOADING...</span>}
    </>
  );
};

export default InfiniteScrolling;
