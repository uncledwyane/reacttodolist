import React from "react";
import ToDoAdd from "./ToDoAdd";
import ToDoItem from "./ToDoItem.tsx";


class ToDo extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        operateShow: false,
        operateMode: 'add',
        operateObj: {title: '', desc: ''},  
        indo:[
            {
                title: "ToDo",
                finished: false,
                desc: "这是一个ToDo应用，由React+TypeScript开发",
                id: Math.round(Math.random() * 100000)
            }
        ],
        finished: []
    }
    handleDisplay = (isShow, type, obj) => {
        console.debug('+++handleDisplay, isShow: ', isShow, ' ,type: ', type)
        this.setState({
            operateShow: isShow,
            operateMode: type != undefined ? type : 'add',
            operateObj: type === 'edit' && obj !== undefined ? obj : this.state.operateObj
        })
    } 
    handleTodoFinished = (e) => {
        let tempIndo = this.state.indo.slice()
        let tempArr = []
        tempArr[0] = tempIndo[e]
        tempArr[0].finished = true
        tempIndo.splice(e, 1)
        this.setState({
            finished: this.state.finished.concat(tempArr)
        })

        this.setState({
            indo: tempIndo
        })
        
    }
    handleTodoUnFinished = (e) => {
        let tempFinished = this.state.finished.slice()
        let tempArr = []
        tempArr[0] = tempFinished[e]
        tempArr[0].finished = false
        this.setState({
            indo: this.state.indo.concat(tempArr)
        })
        tempFinished.splice(e, 1)
        this.setState({
            finished: tempFinished
        })
    }

    _setFindTodoByNewTodo = (todoArr, newTodo, type) => {
        // debugger
        todoArr.forEach(todo => {
            if (todo.id === newTodo.id) {
                for (var i in newTodo) {
                    todo[i] = newTodo[i]
                }
            }
        })
    }

    /**
     * 
     * @param {string} type 处理类型  添加和修改
     * @param {object} todoObj 处理的对象 
     */
    handleAddTodo = (type, todoObj) => {
        if (type === 'add') {
            // 添加，直接放到indo数组里面
            this.state.indo.push(todoObj)
        } else {
            // 编辑
            // 先要根据是否完成来选择从那里扫描修改
            if(todoObj.finished !== undefined && todoObj.finished) {
                // 已完成的todo修改，既然是点的已完成的，那说明数组肯定不为空，不用做长度判断，直接遍历
                this._setFindTodoByNewTodo(this.state.finished, todoObj, 'indo')
            } else if (todoObj.finished !== undefined && !todoObj.finished) {
                // 找到未完成的todo
                this._setFindTodoByNewTodo(this.state.indo, todoObj, 'finished')
            }
        }
    }
    render() {
        let todoAddItem = this.state.operateShow ? <ToDoAdd mode={this.state.operateMode} todo={this.state.operateObj} onOperateTodo={this.handleAddTodo} onDisplayChange={this.handleDisplay}></ToDoAdd> : ""
        return (  
            <div className="todo_box">
                <span className="todo_add_btn todo_btn" onClick={() => this.handleDisplay(true, 'add')}>Add</span>
                {todoAddItem}
                <h3>未完成</h3>
                <div className="todo_unfinished_box">
                    {
                        this.state.indo.map((item, index) => {
                            return (<ToDoItem {...item} key={item.id} onClick={() => this.handleDisplay(true, 'edit', item)} onFinished={() => this.handleTodoFinished(index)} onUnFinished={() => this.handleTodoUnFinished(index)}/>)
                        })
                    }
                </div>
                <h3>已完成</h3>
                <div className="todo_finished_box">
                    {
                        this.state.finished.map((item, index) => {
                            return (<ToDoItem {...item} key={item.id} onClick={() => this.handleDisplay(true, 'edit', item)} onFinished={() => this.handleTodoFinished(index)} onUnFinished={() => this.handleTodoUnFinished(index)}/>)
                        })
                    }
                </div>
            </div>
        );
    }
}


export default ToDo