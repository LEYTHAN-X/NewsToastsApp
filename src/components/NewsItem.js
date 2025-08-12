import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-4">
            <style>
                {`
                    .glow-on-hover-green {
                        position: relative;
                        z-index: 1;
                    }
                    .glow-on-hover-green:hover::before {
                        content: '';
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        right: -4px;
                        bottom: -4px;
                        background: #15803d; /* Tailwind green-700 */
                        border-radius: 0.5rem;
                        filter: blur(8px);
                        opacity: 0.6;
                        z-index: -1;
                        transition: opacity 0.3s ease;
                    }
                    .glow-on-hover-green:hover {
                        transform: scale(1.05);
                    }
                `}
            </style>
            <div className="relative bg-white rounded-lg shadow-md glow-on-hover-green transition-all duration-300 hover:border-2 hover:border-green-700">
                <div className="absolute top-2 right-2">
                    <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {source}
                    </span>
                </div>
                <img 
                    src={!imageUrl ? "https://images.barrons.com/im-71541029/social" : imageUrl} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                    alt="News" 
                />
                <div className="p-4">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{title}</h5>
                    <p className="text-gray-700 text-base mb-3">{description}</p>
                    <p className="text-gray-500 text-sm mb-3">
                        By {!author ? "unknown" : author} on {new Date(date).toGMTString()}
                    </p>
                    <a 
                        rel="noreferrer" 
                        href={newsUrl} 
                        target="_blank" 
                        className="inline-block bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem