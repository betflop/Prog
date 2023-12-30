import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {

    const getUserPreferredTheme = () => {
      const isSystemDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isSystemDarkTheme ? true : false;
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
