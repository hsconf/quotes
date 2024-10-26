import ToolBar from "./components/ToolBar/ToolBar.tsx";
import Home from "./containers/Home/Home.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import NewQuote from "./containers/NewQuote/NewQuote.tsx";
import SideBar from "./components/SideBar/SideBar.tsx";

const App = () => {
    const location = useLocation();
    const hide = ['/new-quote'];
    const shouldHideSidebar = hide.includes(location.pathname);

    return (
        <>
        <header>
            <ToolBar />
        </header>
                <div className="container d-flex gap-5 mt-4">
                    {!shouldHideSidebar ? <SideBar/> : null}
                    <main className="flex-grow-1">
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="quotes/:id" element={<Home />} />
                            <Route path="/new-quote" element={<NewQuote />} />
                            <Route path="/:id/edit" element={<NewQuote />} />
                            <Route path="/quotes/:category/:id/edit" element={<NewQuote />} />
                        </Routes>
                    </main>
                </div>
        </>
    );
};

export default App;
