import { useState, useEffect } from "react";

const FavButton = ({ contactId, onFavToggle }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favorites.includes(contactId));
  }, [contactId]);

  const toggleFav = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFav) {
      favorites = favorites.filter(id => id !== contactId);
    } else {
      favorites.push(contactId);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFav(!isFav);

    if (onFavToggle) onFavToggle();
  };

  return (
    <button className={`fav-button ${isFav ? 'active' : ''}`} onClick={toggleFav}>
      {isFav ? "★" : "☆"}
    </button>
  );
};

export default FavButton;