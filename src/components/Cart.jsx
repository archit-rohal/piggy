import {useDispatch, useSelector} from "react-redux";
import ItemList from "./ItemList.jsx";
import {clearCart} from "../utils/cartSlice.js";

const Cart = () => {
    const cartItems = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    return (
        <div className="text-center m-10 p-10">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="w-6/12 m-auto">
                <button type="button" className="p-2 m-2 bg-black text-white rounded-lg" onClick={handleClearCart}>Clear
                    cart
                </button>
                {cartItems.length === 0 && <h1 className="text-6xl">Your cart is empty</h1>}
                <ItemList items={cartItems}/>
            </div>
        </div>
    )
}
export default Cart
