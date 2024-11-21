import {LOGO_URL} from "../utils/constants.js";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.jsx";
import {useSelector} from "react-redux";

const Header = () => {
    const [btnName, setBtnName] = useState('Login');
    const {loggedInUser} = useContext(UserContext);
    const handleLogin = () => {
        btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login');
        /*
                if(btnName === 'Login') {
                    setBtnName('Logout')
                } else {
                    setBtnName('Login')
                }
        */
    }
    const onlineStatus = useOnlineStatus();
    const cartItems = useSelector(store => store.cart.items);
    console.log("cartItems is: ",cartItems);
    return (
        <div className="flex justify-between bg-pink-100 shadow-xl">
            <div className="logo-container">
                <img alt={"app-logo"} className="w-56"
                     src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online status: {onlineStatus ? "✅" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/about"}>About</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/contact"}>Contact</Link>
                    </li>
                    <li className="px-4">
                        <Link to={"/grocery"}>Grocery</Link>
                    </li>
                    <li className="px-4 font-bold text-xl"><Link to={"/cart"}>Cart ({cartItems.length} items)</Link>
                    </li>
                    <button className="login" onClick={handleLogin}>{btnName}</button>
                    <li className="px-4 font-bold">
                        {loggedInUser}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header