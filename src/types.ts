export interface Quote {
    category: string;
    author: string;
    description: string;
}

export interface Quotes extends Quote {
    id: string;
}

export interface IQuote {
    [id: string]: Quote;
}