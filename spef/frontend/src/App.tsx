import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="app">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
