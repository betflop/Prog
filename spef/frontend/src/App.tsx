import "./App.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="app">
                    <Body></Body>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
