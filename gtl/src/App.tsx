import { useState } from 'react'
import './App.css'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

function App() {
    const getUserPreferredTheme = () => {
        const isSystemDarkTheme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        console.log("isSystemDarkTheme" + isSystemDarkTheme);
        return isSystemDarkTheme ? false : true;
    };
    const [isDarkMode, setIsDarkMode] = useState(getUserPreferredTheme());

    return (
        <>
            <div className="wrapper">
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <div className="app">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
