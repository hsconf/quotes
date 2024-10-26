import {useCallback, useEffect, useState} from "react";
import {Quote} from "../../types.ts";
import axiosApi from "../../axiosApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader.tsx";

const quotesList = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'}
];

const NewQuote = () => {

    const {id: params} = useParams();
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    const [quote, setQuote] = useState<Quote>({
        category: '',
        author: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setQuote(prev => ({
          ...prev,
          [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (params) {
            await axiosApi.put(`quotes/${params}.json`, quote);
            navigate('/')
        } else {
            setSpinner(true);
            await axiosApi.post('quotes.json', quote);
            setSpinner(false);
            navigate('/');
        }
    };

    const getQuote = useCallback(async () => {
            try {
                const {data} = await axiosApi.get<Quote>(`quotes/${params}.json`);
                setQuote(data);
            } catch (e) {
                console.log(e);
            }
    }, [])

    if (params) {
        useEffect(() => {
            getQuote();
        }, []);
    }

    if (spinner) {
        return <Loader />
    }

    return (
        <form className="d-flex flex-column gap-2 card p-3 w-50 mx-auto" onSubmit={onSubmit}>
            <div>
                <label className="mb-1">Category</label>
                <select name="category" id="category" className="form-control" onChange={handleChange} value={quote.category} required>
                    <option value="">Select item</option>
                    {quotesList.map(quote => (
                        <option key={quote.id} value={quote.id}>{quote.title}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Author</label>
                <input type="text" className="form-control" required name="author" id="author" onChange={handleChange} value={quote.author}/>
            </div>
            <div className="d-flex flex-column">
                <label>Quote</label>
                <textarea name="description" id="description" style={{height: 300, padding: 5}} onChange={handleChange} value={quote.description}></textarea>
            </div>
            <button className="btn btn-outline-primary">Save</button>
        </form>
    );
};

export default NewQuote;