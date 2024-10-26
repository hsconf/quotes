import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { IQuote, Quotes } from "../../types.ts";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";

const Home = () => {
    const [spinner, setSpinner] = useState(false);
    const [quotes, setQuotes] = useState<Quotes[]>([]);
    const { id: location } = useParams();

    const getData = useCallback(async () => {
        try {
            setSpinner(true);
            const { data: response } = await axiosApi.get<IQuote | null>("quotes.json");

            if (response === null) {
                setQuotes([]);
            } else {
                const quoteItem: Quotes[] = Object.keys(response).map((id) => ({
                    ...response[id],
                    id,
                }));

                if (location === 'all') {
                    setQuotes(quoteItem);
                } else {
                    const filteredQuotes = location
                        ? quoteItem.filter((item) => item.category === location)
                        : quoteItem;

                    setQuotes(filteredQuotes);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSpinner(false);
        }
    }, [location]);

    const deleteQuote = async (id: string) => {
        try {
            setSpinner(true);
            await axiosApi.delete(`quotes/${id}.json`);
            setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
        } catch (e) {
            console.log(e);
        } finally {
            setSpinner(false);
        }
    };

    useEffect(() => {
        getData();
    }, [getData]);

    if (spinner) {
        return <Loader />;
    }

    return (
        <div>
            <div>
                {quotes.map((quote) => (
                    <div
                        className="p-2 mb-2 row border border-2 rounded shadow align-items-center"
                        key={quote.id}
                    >
                        <div className="col-8">
                            <div>"{quote.description}"</div>
                            <b className="">--{quote.author}</b>
                        </div>
                        <div className="col-3 ms-auto d-flex flex-column gap-1">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteQuote(quote.id)}
                            >
                                Delete
                            </button>
                            <Link to={`${quote.id}/edit`} className="btn btn-outline-warning">
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
