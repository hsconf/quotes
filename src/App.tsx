import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Home from "./containers/Home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import NewQuote from "./containers/NewQuote/NewQuote.tsx";

const App = () => {
    return (
        <>
        <header>
            <ToolBar />
        </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/new-quote" element={<NewQuote />} />
                    </Routes>
                </main>
        </>
    );
};

export default App;
