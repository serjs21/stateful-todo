import React, {Component} from 'react';
import List from './components/List/list';
import {Button, Modal, Input} from 'antd';
import {observer} from 'mobx-react';
import './App.css';
import 'antd/dist/antd.css'

const {TextArea} = Input;

@observer
export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingTask: false,
            newTaskContent: '',
            newTaskTitle: '',
        }
    }

    openAddModal = () => {
        this.setState(() => ({addingTask: true}))
    };

    resetNewTaskModal = () => {
        this.setState(() => ({
            newTaskTitle: '',
            newTaskContent: '',
        }))
    };

    handleClose = () => {
        this.setState(() => ({
            addingTask: false,
        }));
        this.resetNewTaskModal();
    };

    handleAdd = () => {
        this.props.store.addTask(this.state.newTaskTitle, this.state.newTaskContent);
        this.handleClose();
    };

    onTitleChange = ({target}) => {
        this.setState(() => ({newTaskTitle: target.value}));
    };

    onContentChange = ({target}) => {
        this.setState(() => ({newTaskContent: target.value}));
    };


    render() {
        return (
            <div className='todo'>
                <div className='counter'>{`Tasks Left: ${this.props.store.todoTasks} / ${this.props.store.tasksCount}`}</div>
                <div className='add-wrapper'>
                    <Button size='small' onClick={this.openAddModal} icon='plus-square' className='add-task'/>
                </div>
                <List tasks={this.props.store.tasks}/>
                <Modal
                    title="Add New Task"
                    visible={this.state.addingTask}
                    onOk={this.handleAdd}
                    onCancel={this.handleClose}
                    className='add-modal'
                >
                    <div className='new-task'>
                        <Input onChange={this.onTitleChange}
                               value={this.state.newTaskTitle}
                               placeholder='New task title'
                               className='new-title'
                        />
                        <TextArea onChange={this.onContentChange}
                                  value={this.state.newTaskContent}
                                  placeholder='Things to do...'
                                  className='new-content'
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}
