 import React, { Component, PropTypes } from 'react';
 import '../css/index.css';
 // TypeNew 组件用于新增数据，它需要 todo 和 onAdd 两个属性，上文已经提到过
 // 基本逻辑是：当从 input 中获取数据时，将新数据 push 到todo中，
 // 然后使用 onAdd 调用 TodoList 的 handleChange 来更新state，然后react自动render
 export default class TypeNew extends Component {
	   // 绑定键盘回车事件，添加新任务
	    handlerKeyUp(e) {
        e.preventDefault();
        // 通过 refs 获取dom元素，然后获取输入的内容   
        //var inputDom = this.refs.inputnew.getDOMNode();
        
        var inputDom = e.target.value;
        var newthing = inputDom
        // 获取传入的todolist数据
        var rows = this.props.todo;
        console.log(newthing,'数组数组数组')
        if (newthing !== '') {
        	//
            // 更新数据，并使用 onAdd 更新到 TodoList 组件的 state 中
            rows.push(newthing);
            this.props.onAdd(rows);
            //
        }
        //e.target.value = '';
       
    }
	render () {
        return (
            // form submit 时，触发 handleAdd 事件
            <div className="todo-header">
                <input type="text" ref="inputnew" onKeyUp={this.handlerKeyUp.bind(this)} id="todo-new" placeholder="填写新增数据" autoComplete="off" />
            </div>
        )
	}
}
