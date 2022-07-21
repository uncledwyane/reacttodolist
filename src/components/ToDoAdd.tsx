import * as React from "react";

type addObj = {
    title: string,
    desc: string,
    id?: number,
    finished?: boolean
}

type disChange = {
    isShow: boolean,
    type: string,
    obj?: object
}

interface IProps {
    mode: string,
    operateAddObj?: Object,
    operateEditObj?: Object,
    todo: addObj,
    onOperateTodo(e:string, t: Object): void,
    onDisplayChange(isShow: boolean, type?: string, obj?: object): void
}

interface IState {
    operateAddObj: addObj,
    operateEditObj: addObj
}


class ToDoAdd extends React.Component<IProps, IState> {
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

export default ToDoAdd