import resList from "../utils/mockData.js";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard.jsx";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer.jsx";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.jsx";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const { setUserName, loggedInUser } = useContext(UserContext);

  const handleTop = () => {
    const filteredList = listOfRestaurants.filter(
      ({ info: { avgRating } }) => avgRating > 4.5
    );
    setFilteredRestaurants(filteredList);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D12.9352403%26lng%3D77.624532%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      if (data.ok) {
        const res =
          json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        setListOfRestaurants(res);
        setFilteredRestaurants(res);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurants.filter(({ info: { name } }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredRestaurant);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1>
        Looks like your're offline!! Please check your internet connection
      </h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            value={searchText}
            className="border border-solid border-black"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type={"button"}
            className="px-4 py-1 bg-green-100 m-4 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-1 bg-gray-100 rounded-lg"
            onClick={handleTop}
          >
            Top rated restaurants
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <label htmlFor="user-name">UserName: </label>
          <input
            type="text"
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      {/*Promoted property is no longer available in swiggy's API so using aggregatedDiscountInfoV3*/}
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant?.info?.aggregatedDiscountInfoV3 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
