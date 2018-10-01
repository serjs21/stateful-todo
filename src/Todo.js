import React, {Component} from 'react';
import List from './components/List/list';
import {Button, Modal, Input} from 'antd';

import './App.css';
import 'antd/dist/antd.css'

const {TextArea} = Input;

const dataMock = {
    0: {title: 'First Task', content: 'Details of first Task', id: 0, done: true},
    1: {title: 'Second Task', content: 'Details of second Task', id: 1}
};

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingTask: false,
            newTaskContent: '',
            newTaskTitle: '',
            tasks: dataMock,
            idx: 2,
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
        this.setState((state) => ({
                tasks: Object.assign(state.tasks, {
                    [state.idx]: {
                        id: state.idx,
                        title: state.newTaskTitle,
                        content: state.newTaskContent,
                    }
                }),
                idx: state.idx + 1,
            })
        );
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
                <div className='add-wrapper'>
                    <Button size='small' onClick={this.openAddModal} icon='plus-square' className='add-task'/>
                </div>
                <List tasks={Object.values(this.state.tasks)}/>
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
