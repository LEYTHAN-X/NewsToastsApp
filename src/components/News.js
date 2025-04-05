import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Capitalizing the category name
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const componentMount = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);  // Request in progress
        let parseData = await data.json();
        props.setProgress(70);  // Data fetched
        setArticles(parseData.articles);
        setLoading(false);
        setTotalResults(parseData.totalResults);
        props.setProgress(100); // Finished
    }

    useEffect(() => {
        componentMount();
    }, [page]);  // Component mounts or when page changes

    const handlePrevClick = async () => {
        props.setProgress(10);
        if (page <= 1) return;

        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page - 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(40);  // Request in progress
        let parseData = await data.json();
        props.setProgress(70);  // Data fetched
        setArticles(parseData.articles);
        setLoading(false);
        setPage(page - 1);
        setTotalResults(parseData.totalResults);
        props.setProgress(100); // Finished
    };

    const handleNextClick = async () => {
        props.setProgress(10);
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) return;

        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(40);  // Request in progress
        let parseData = await data.json();
        props.setProgress(70);  // Data fetched
        setArticles(parseData.articles);
        setLoading(false);
        setPage(page + 1);
        setTotalResults(parseData.totalResults);
        props.setProgress(100); // Finished
    };

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px'}}>NewsToasts - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            <div className="row">
                {articles.map((element) => {
                    return (
                        <div className="col-md-3" key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                    );
                })}
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
}

News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
