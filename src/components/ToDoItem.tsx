import * as React from "react";

interface IProps {
    desc: String;
    title: String;
    finished: Boolean;
    onClick: Function;
    onFinished: Function;
    onUnFinished: Function;
}

class ToDoItem extends React.Component<IProps> {
    
    constructor(props:IProps) {
        super(props);
    }

    handleToDoItemClick = (e: Boolean) => {
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

export default ToDoItem