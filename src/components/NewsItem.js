import React from "react";
import PropTypes from "prop-types";

const NewsItem = ({
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source,
}) => {
    return (
        <div className="parallax-card">
            <img
                src={imageUrl || "https://via.placeholder.com/300x200"}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="card-content">
                <span className="text-xs text-green-400 uppercase">{source}</span>
                <h2 className="text-lg font-bold mt-1">{title}</h2>
                <p className="text-sm mt-2 text-gray-300">{description}</p>
                <p className="text-xs mt-2 text-gray-400">
                    By {author || "Unknown"} on {new Date(date).toLocaleDateString()}
                </p>
                <a
                    href={newsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-green-400 hover:underline"
                >
                    Read More →
                </a>
            </div>
        </div>
    );
};

NewsItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    source: PropTypes.string,
};

export default NewsItem;
