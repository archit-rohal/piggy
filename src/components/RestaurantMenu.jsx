import Shimmer from "./Shimmer.jsx";
import {useParams} from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategory from "./RestaurantCategory.jsx";
import {useState} from "react";
import {ITEM_CATEGORY_URL} from "../utils/constants.js";

const RestaurantMenu = () => {
    const [showIndex, setShowIndex] = useState(null);
    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) {
        return <Shimmer/>
    }

    const {name, cuisines, costForTwo, cloudinaryImageId} = resInfo.data.cards[2].card.card.info;
    const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"] === ITEM_CATEGORY_URL);

    const handleToggle = (index) => {
        setShowIndex(prevIndex => (prevIndex === index ? null : index));
    }

    return (
        <div className="m-4 p-4 text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwo / 100} for two</p>
            {categories?.map((category, index) => (
                <RestaurantCategory // These are all accordions
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex}
                    setShowIndex={() => handleToggle(index)}
                />
            ))}
        </div>
    )
}

export default RestaurantMenu;


/*
import Shimmer from "./Shimmer.jsx";
import {useParams} from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategory from "./RestaurantCategory.jsx";
import {useState} from "react";

const RestaurantMenu = () => {
    // const [showItems, setShowItems] = useState(false);
    const [showIndex, setShowIndex] = useState(null);
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) {
        return <Shimmer/>
    }
    const {name, cuisines, costForTwo, cloudinaryImageId} = resInfo.data.cards[2].card.card.info;
    // console.log("batman \n", resInfo.data.cards[2].card.card.info);
    // console.log("regular cards: \n", resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
    const {itemCards} = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    // console.log("2nd line: \n", resInfo.data.cards[4])
    // const {name} = resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[4].card.card.itemCards.card.info;
    // console.log("this is itemCards: \n", itemCards);
    const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    // const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"].includes("ItemCategory"));
    // console.log(categories)
    return (
        <div className="m-4 p-4 text-center">
            {/!*<img src={`${CDN_URL + cloudinaryImageId}`} alt="food-item-logo" className="w-60 rounded-lg"/>*!/}
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwo / 100} for two</p>
            {categories.map((category, index) => (
                <RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card}
                                    showItems={index === showIndex} setShowIndex={()=>setShowIndex(index)}/>
            ))}
        </div>
    )
}
export default RestaurantMenu
*/
