 import React, { Component, PropTypes } from 'react';
 // ListTodo 组件用于展示列表，并可以删除某一项内容，
 export default class ListTodo extends Component {

 	handleDel (e) {
            var delIndex = e.target.getAttribute('data-key');
            console.log(this)
            // 更新数据，并使用 onDel 更新到 TodoList 的 state 中，以便 React自动render
            this.props.todo.splice(delIndex, 1);
            this.props.onDel(this.props.todo);
        }

	render () {
		return (
			 <ul id="todo-list">
			            {
			                // this.props.todo 获取父组件传递过来的数据
			                // {/* 遍历数据 */}
			                this.props.todo.map(function (item, i) {
			                    return (
			                        <li>
			                            <label>{item.id}</label>
			                            <button className="destroy" onClick={this.handleDel.bind(this)} data-key={i}>delete</button>
			                        </li>
			                    );
			                }.bind(this))  // {/* 绑定函数的执行this - 以便 this.handleDel */}
			            }
			 </ul>
			)
	}
}
