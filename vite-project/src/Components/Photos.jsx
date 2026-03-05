import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Photos = () => {

  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  const [visible, setVisible] = useState(60);

  const loadMore = () => {
    setVisible((prev) => prev + 8);
  };

  useEffect(() => {

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container">

      <h1>Photos</h1>

      <div className="grid">
        {data.slice(0, visible).map((product) => (
          <div className="card" key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <p>{product.title}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Photos;