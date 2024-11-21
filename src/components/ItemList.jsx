import {CDN_URL} from "../utils/constants.js";
import {useDispatch} from "react-redux";
import {addItem} from "../utils/cartSlice.js";

const ItemList = ({items}) => {
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        dispatch(addItem(item));
    }
    return (
        <div>
            <ul>
                {items.map(item => (
                    <div key={item.card.info.id}
                         className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between">
                        <div className="w-9/12">
                            <div className="py-2">
                                <span>{item.card.info.name}</span>
                                <span> - ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
                            </div>
                            <p className="text-xs">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12 p-4">
                            <div className="absolute">
                                <button type="button"
                                        className="p-1 bg-black text-white rounded-lg shadow-lg absolute w-20"
                                        onClick={() => handleAddItem(item)}>Add +
                                </button>
                            </div>
                            <img src={CDN_URL + item.card.info.imageId} alt="dish-image"/>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}
export default ItemList
