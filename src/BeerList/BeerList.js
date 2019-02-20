import React from 'react';

import './BeerList.css';

export default class BeerList extends React.Component {
    static defaultProps = {
        clientPaggination: true
    }

    state = {
        page: 1,
        per_page: 3,
        beerFilter: '',
        beerList: null
    }

    getRandomBeer = e => {
        e.preventDefault();

        fetch('https://api.punkapi.com/v2/beers/random')
            .then(response => response.json())
            .then(data => this.setState({
                beerList: data
            }))
            .catch(console.error)
    }

    getPrevPage = () => {
        const {page} = this.state,
            {clientPaggination} = this.props;

        this.setState({
            page: Math.max(page - 1, 1)
        }, () => !clientPaggination && this.findBeer());
    }

    getNextPage = () => {
        const {page} = this.state,
            {clientPaggination} = this.props;
        let newPage = page + 1;

        if (clientPaggination) {
            const {beerList, per_page} = this.state;

            newPage = Math.min(newPage, Math.ceil(beerList.length/per_page));
        }

        this.setState({
            page: newPage
        }, () => !clientPaggination && this.findBeer());
    }

    // goToPage = e => {
    //     this.setState({
    //         page: +e.target.dataset.pageNum
    //     }, () => !this.props.clientPaggination && this.findBeer());
    // }

    goToPage(pageNumber) {
        this.setState({
            page: pageNumber
        }, () => !this.props.clientPaggination && this.findBeer());
    }

    findBeer = e => {
        e && e.preventDefault();

        const {beerFilter, page, per_page} = this.state,
            {clientPaggination} = this.props,
            params = [
                `beer_name=${encodeURIComponent(beerFilter.trim())}`
            ];

        if (!clientPaggination) {
            params.push(`page=${page}`, `per_page=${per_page}`);
        }

        this.setState({
            isFetch: true
        }, () => {
            fetch(`https://api.punkapi.com/v2/beers?${params.join('&')}`)
                .then(response => response.json())
                .then(data => this.setState({
                    beerList: data,
                    isFetch: false
                }))
                .catch(console.error)
        })
    }

    changeInput = e => {
        const {value, name} = e.target;

        this.setState({
            [name]: value
        });
    }

    renderBeer = beerItem => {
        const {id, name, description, brewers_tips} = beerItem;

        return <li key={id}>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{brewers_tips}</p>
        </li>;
    }

    getBeerList() {
        const {clientPaggination} = this.props,
            {beerList, page, per_page} = this.state;

        if (!clientPaggination) {
            return beerList;
        }

        return beerList.slice((page - 1)*per_page, page*per_page);
    }

    render() {
        const {beerList, beerFilter, isFetch, per_page, page} = this.state,
            maxPageNumber = beerList ? Math.ceil(beerList.length/per_page) : 0,
            pageNumbers = new Array(maxPageNumber).fill(1);

        return <div className='beer-list'>
            <form className='beer-list' onSubmit={this.findBeer}>
                <input
                    value={beerFilter}
                    onChange={this.changeInput}
                    type='text'
                    name='beerFilter'/>
                <button
                    type='submit'>
                    Find Beer
                </button>
                <button
                    onClick={this.getRandomBeer}
                    type='button'>
                    Get Random
                </button>
            </form>
            {beerList &&
                <ul>
                    {this.getBeerList().map(this.renderBeer)}
                </ul>}
            <div>
                <button
                    disabled={isFetch}
                    onClick={this.getPrevPage}>
                    Prev
                </button>

                {pageNumbers.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={this.goToPage.bind(this, item + idx)}
                        // onClick={this.goToPage}
                        data-page-num={item + idx}
                        disabled={item + idx === page}>
                        {item + idx}
                    </button>))}

                <button
                    disabled={isFetch}
                    onClick={this.getNextPage}>
                    Next
                </button>
            </div>
        </div>
    }
}
