import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import TypeNew from './TypeNew';
import ListTodo from './ListTodo';




 class TodoList extends Component {
  
      // 接收一个传入的数据，并将它实时更新到组件的 state 中，以便组件根据数据重新render
    // 只要改变了 state ，react自动执行 reader 计算
   componentDidMount() {
        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }
	render () {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
		return (
 				<div>
                {/* 
                    集成 TypeNews 组件，传入两个属性 onAdd 和 todo
                    todo - 将todolist的数据传入到组件，当新增时，更新todolist数据
                    onAdd -  将 handleChange 函数传入到组件，新增时，用它来处理最新的todolist数据
                */}
                {/*<TypeNew onAdd={this.handleChange.bind(this)} todo={this.state.todolist} />*/}
                {/*
                    集成 ListTodo 组件
                    todo - 将todolist的数据传入到组件，用于组件展示数据
                */}
                {/*<ListTodo onDel={this.handleChange.bind(this)} todo={this.props.items} />*/}
                <ListTodo todo={this.props.items} />
            </div>
			)
	}
}
TodoList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
