if (this.state.page <= 1) return;

        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=367d4c9607054f07b23162e2025eaabb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false,
        });