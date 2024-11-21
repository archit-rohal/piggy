import './App.css'
import Header from "./components/Header.jsx";
import {Outlet} from "react-router-dom";
import UserContext from "./utils/UserContext.jsx";
import {useEffect, useState} from "react";
import {Provider} from "react-redux";
import appStore from "./utils/appStore.js";


const App = () => {
    const [userName, setUserName] = useState();
    useEffect(() => {
        const data = {
            name: "Archit Rohal",
        }
        setUserName(data.name);
    }, []);
    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
                <div className="app">
                    <Header/>
                    {/*<Body/>*/}
                    <Outlet/>
                </div>
            </UserContext.Provider>
        </Provider>
    )
}

export default App