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
        <div className="container my-3">
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                NewsToasts - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div className="row">
                {articles && articles.length > 0 ? (
                    articles.map((element) => (
                        <div className="col-md-3" key={element.url}>
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
                    !loading && <p>No articles to display</p>
                )}
            </div>

            <div className="container d-flex justify-content-between">
                <button
                    disabled={page <= 1 || loading}
                    type="button"
                    className="btn btn-dark"
                    onClick={handlePrevClick}
                >
                    &larr; Previous
                </button>
                <button
                    disabled={page + 1 > Math.ceil(totalResults / props.pageSize) || loading}
                    type="button"
                    className="btn btn-dark"
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
