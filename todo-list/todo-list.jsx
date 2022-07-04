/**
 * 功能：
 * 点击todo项可以编辑并可以保存
 * 点击右上方添加可以添加todo项
 */

class ToDoAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operateAddObj: {
                title: "",
                desc: ""
            },
            operateEditObj: {
                title: "",
                desc: ""
            }
        }
    }

    handleTitleInput = (e) => {
        console.debug('handleTitleInput: ', e.target.value)
        if(this.props.mode === 'add') {
            this.setState({
                operateAddObj: {
                    title: e.target.value,
                    desc: this.state.operateAddObj.desc
                }
            })
        } else {
            let tempEditObj = JSON.parse(JSON.stringify(this.state.operateEditObj))
            tempEditObj.title = e.target.value
            this.setState({
                operateEditObj: tempEditObj
            })
        }
    }

    handleDescInput = (e) => {
        console.debug('handleDescInput: ', e.target.value)
        

        if (this.props.mode === 'add') {
            this.setState({
                operateAddObj: {
                    title: this.state.operateAddObj.title,
                    desc: e.target.value
                }
            })
        } else {
            let tempEditObj = JSON.parse(JSON.stringify(this.state.operateEditObj))
            tempEditObj.desc = e.target.value
            this.setState({
                operateEditObj: tempEditObj
            })
        }
    }

    componentDidMount() {
        if(this.props.mode !== undefined && this.props.mode === 'edit') {
            this.setState({
                operateEditObj: this.props.todo
            })
        }
    }
    handleTodoAdd = () => {
        if(this.props.mode === 'add') {
            let tempAddObj = this.state.operateAddObj
            tempAddObj.id = Math.round(Math.random() * 100000)
            tempAddObj.finished = false
            
            this.props.onOperateTodo('add', tempAddObj)
        } else {
            this.props.onOperateTodo('edit', this.state.operateEditObj)
        }

        this.displayChange(false)
    }
    displayChange = (e) => {
        this.props.onDisplayChange(e)
    }
    render() { 
        return (  
            <div className="todo_edit">
                <div className="todo_edit_operate">
                    <div className="todo_edit_operate_title">
                        <input type="text" placeholder="input title..." className="todo_edit_operate_input todo_edit_operate_input_text" onInput={this.handleTitleInput} value={this.props.mode === 'add' ? this.state.operateAddObj.title : this.state.operateEditObj.title}/>
                    </div>
                    <div className="todo_edit_operate_desc">
                        {/* {props.todo.desc} */}
                        <textarea rows={3} placeholder="input desc..." className="todo_edit_operate_input todo_edit_operate_input_textarea" onInput={this.handleDescInput} value={this.props.mode === 'add' ? this.state.operateAddObj.desc : this.state.operateEditObj.desc}/>
                    </div>
                </div>
                <div className="todo_edit_excute">
                    <span className="todo_btn todo_excute_btn" onClick={this.handleTodoAdd}>{this.props.mode === 'edit' ? '修改' : this.props.mode === 'add' ? '添加' : '确认'}</span>
                    <span className="todo_btn todo_cancel_btn" onClick={() => this.displayChange(false)}>取消</span>
                </div>
            </div>
        );
    }
}

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToDoItemClick = (e) => {
        e ? this.props.onFinished() : this.props.onUnFinished()
    }
    render() {
        let checkBtn = null;
        if (this.props.finished) {
            checkBtn = <span className="check_indo"></span>
        } else {
            checkBtn = <span className="check_finished"></span>
        }
        return (  
            <div className="todo_item">
                <div className="checkSpan" onClick={() => this.props.finished ? this.handleToDoItemClick(false) : this.handleToDoItemClick(true)}>
                    {checkBtn}
                </div>
                <div className="todo_item_content" onClick={this.props.onClick}>
                    <div className={this.props.finished ? 'todo_item_content_title todo_item_desc_finished' : 'todo_item_content_title'}>
                        {this.props.title}
                    </div>
                    <div className={this.props.finished ? 'todo_item_content_desc todo_item_desc_finished' : 'todo_item_content_desc'}>
                        {this.props.desc}
                    </div>
                </div>
            </div>
        );
    }
}

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

ReactDOM.render(<ToDo/>, document.getElementById('test'))