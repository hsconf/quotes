import {NavLink} from "react-router-dom";

const quotesList = [
    {title: 'All', id: 'all'},
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'}
];

const SideBar = () => {

    return (
        <div>
            <ul className="p-0 m-0 d-flex flex-column">
                {quotesList.map((quote) => (
                    <NavLink to={`quotes/${quote.id}`} className="nav-link fs-5" style={{cursor: 'pointer'}} key={quote.id}>{quote.title}</NavLink>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;