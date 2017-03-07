import React, { Component, PropTypes } from 'react';
import TypeNew from './TypeNew';
import ListTodo from './ListTodo';
export default class TodoList extends Component {

   constructor(...argu) { //定义App类的构造函数
        super(...argu); //调用父类的构造函数
        this.state = { //定义组件状态
           todolist: []
        };
    }
      // 接收一个传入的数据，并将它实时更新到组件的 state 中，以便组件根据数据重新render
    // 只要改变了 state ，react自动执行 reader 计算
    handleChange (rows) {
        this.setState({
            todolist: rows
        });
    } 
	render () {
		return (
 				<div>
                {/* 
                    集成 TypeNews 组件，传入两个属性 onAdd 和 todo
                    todo - 将todolist的数据传入到组件，当新增时，更新todolist数据
                    onAdd -  将 handleChange 函数传入到组件，新增时，用它来处理最新的todolist数据
                */}
                <TypeNew onAdd={this.handleChange.bind(this)} todo={this.state.todolist} />
                {/*
                    集成 ListTodo 组件
                    todo - 将todolist的数据传入到组件，用于组件展示数据
                */}
                <ListTodo onDel={this.handleChange.bind(this)} todo={this.state.todolist} />
            </div>
			)
	}
}


 