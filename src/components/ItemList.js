import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import 'whatwg-fetch'  // 可以引入fetch来进行Ajax
class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
/*        fetch('http://XXXX.com/gaea/member/search?page_index=1&page_size=20&_=1490672624488')
                    .then((response) => {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }

                        console.log("1313213")

                       
                    })*/
/*        $.ajax({
            url: 'http://XXXXX.com/gaea/member/search?page_index=1&page_size=20&_=1490672624488',
            dataType:'jsonp'
        })
        .done(function() {
            console.log("success");
        })*/
       

                   

    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.items.map((item) => (
                    <li key={item.id}>
                        {item.label}
                    </li>
                ))}
            </ul>
        );
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
