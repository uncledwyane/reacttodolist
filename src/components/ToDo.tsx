import * as React from "react";
import ToDoAdd from "./ToDoAdd";
import ToDoItem from "./ToDoItem";


// type Todo = Readonly<{
//     id: number,
//     text: string,
//     done: boolean
// }>


// function completeAll(todos: readonly Todo[]): Todo[]{
    
// }


type addObj = {
    title: string,
    desc: string
}

type indoObj = addObj & {
    finished: boolean,
    id: number
}

interface IState {
    operateShow: boolean,
    operateMode: string,
    operateObj: addObj,
    indo: indoObj,
    finished: Array<indoObj>
}

class ToDo extends React.Component<IState> {
    constructor(props) {
        super(props);
    }
    public state = {
        operateShow: false,
        operateMode: 'add',
        operateObj: {title: '', desc: ''},  
        indo:[
            {
                title: "做饭",
                finished: false,
                desc: "这意味着用于我们 FancyButton 组件的 refs 实际上将被挂载到 LogProps 组件",
                id: Math.round(Math.random() * 100000)
            },
            {
                title: "洗衣服",
                finished: false,
                desc: "这意味着用于我们 FancyButton 组件的 refs 实际上将被挂载到 LogProps 组件",
                id: Math.round(Math.random() * 100000)
            },
            {
                title: "跑步",
                finished: false,
                desc: "这意味着用于我们 FancyButton 组件的 refs 实际上将被挂载到 LogProps 组件",
                id: Math.round(Math.random() * 100000)
            },
            {
                title: "打篮球",
                finished: false,
                desc: "这意味着用于我们 FancyButton 组件的 refs 实际上将被挂载到 LogProps 组件",
                id: Math.round(Math.random() * 100000)
            }
        ],
        finished: []
    }
    handleDisplay = (isShow: boolean, type: string, obj?: object) => {
        console.debug('+++handleDisplay, isShow: ', isShow, ' ,type: ', type)
        this.setState({
            operateShow: isShow,
            operateMode: type != undefined ? type : 'add',
            operateObj: type === 'edit' && obj !== undefined ? obj : this.state.operateObj
        })
    } 
    handleTodoFinished = (e) => {
        let tempIndo = this.state.indo.slice()
        let tempArr:Array<indoObj> = []
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
        let tempArr: Array<indoObj> = []
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
    /**
     * 
     * @param {string} type 处理类型  添加和修改
     * @param {object} todoObj 处理的对象 
     */
    handleAddTodo = (type: string, todoObj: indoObj) => {
        if (type === 'add') {
            // 添加，直接放到indo数组里面
            this.state.indo.push(todoObj)
        } else {
            // 编辑
            // 先要根据是否完成来选择从那里扫描修改
            let tempEditObj = null
            if(todoObj.finished !== undefined && todoObj.finished) {
                // 已完成的todo修改，既然是点的已完成的，那说明数组肯定不为空，不用做长度判断，直接遍历
                this.state.finished.forEach(finishedTodo => {
                    if (finishedTodo.id === todoObj.id) {
                        tempEditObj = finishedTodo
                        for (var i in todoObj) {
                            finishedTodo[i] = todoObj[i]
                        }
                    }

                })
            } else if (todoObj.finished !== undefined && !todoObj.finished) {
                // 找到未完成的todo
                this.state.indo.forEach(finishedTodo => {
                    if (finishedTodo.id === todoObj.id) {
                        tempEditObj = finishedTodo
                        for (var i in todoObj) {
                            finishedTodo[i] = todoObj[i]
                        }
                    }

                })
            }
        }
    }
    public render() {
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