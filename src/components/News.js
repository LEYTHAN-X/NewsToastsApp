import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Capitalize first letter of category name
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch news articles for current page
    const fetchNews = async (pageNumber) => {
        try {
            props.setProgress(10);
            setLoading(true);

            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${pageNumber}&pageSize=${props.pageSize}`;
            let data = await fetch(url);

            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            props.setProgress(40);
            let parseData = await data.json();
            props.setProgress(70);

            if (!parseData.articles) {
                throw new Error('No articles found');
            }

            setArticles(parseData.articles);
            setTotalResults(parseData.totalResults);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error('Fetching error: ', error);
            setArticles([]); // Prevent undefined issues
            setLoading(false);
            props.setProgress(100);
        }
    };

    // On mount and page change, fetch news
    useEffect(() => {
        fetchNews(page);
    }, [page]);

    const handlePrevClick = () => {
        if (page <= 1) return;
        setPage(page - 1);
    };

    const handleNextClick = () => {
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) return;
        setPage(page + 1);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className={`text-center mt-24 mb-8 text-3xl font-bold font-cursive-dancing transition-all duration-300 ${props.category === 'entertainment'
                    ? 'text-yellow-300'
                    : 'text-gray-900'
                }`}>
                NewsToasts - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>



            {loading && (
                <div className="flex justify-center">
                    <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles && articles.length > 0 ? (
                    articles.map((element) => (
                        <div key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 45) : ''}
                                description={element.description ? element.description : ''}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-center text-gray-500">No articles to display</p>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    disabled={page <= 1 || loading}
                    type="button"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handlePrevClick}
                >
                    &larr; Previous
                </button>
                <button
                    disabled={page + 1 > Math.ceil(totalResults / props.pageSize) || loading}
                    type="button"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleNextClick}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
};

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;