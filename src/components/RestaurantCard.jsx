import {CDN_URL} from "../utils/constants.js";

const RestaurantCard = ({resData}) => {
    const {info: {name, cuisines, avgRating, sla: {deliveryTime}, costForTwo, cloudinaryImageId}} = resData;
    return (
        <div className="m4 p-4 w-[250px] bg-gray-100 hover:bg-gray-200 transition ease-in-out delay-40 ">
            <img
                src={`${CDN_URL + cloudinaryImageId}`}
                alt="res-logo"
                className={"rounded-lg"}
            />
            <h3 className="font-bold py-4 text-l">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    )
}

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}


export default RestaurantCard
