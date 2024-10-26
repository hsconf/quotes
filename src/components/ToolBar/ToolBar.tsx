import {NavLink} from "react-router-dom";

const ToolBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Quotes</NavLink>
                <div className="collapse navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        <NavLink to='/' className="nav-link">Home</NavLink>
                        <NavLink to='/new-quote' className="nav-link">New quote</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;