import React, {Component} from 'react';
import {Button, Input} from 'antd';
import PropTypes from 'prop-types';

const {TextArea} = Input;

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            done: props.done,
            content: props.content,
        };
    }

    toggleEdit = () => {
        this.setState(state => ({editing: !state.editing}));
    };
    completeTask = () => {
        this.setState(() => ({done: true}));
    };
    onEdit = ({target}) => {
        this.setState(() => ({content: target.value}));
    };

    render() {
        return (
            this.state.editing ?
                <div className='task editing'>
                    <TextArea value={this.state.content} onChange={this.onEdit} className='textarea'/>
                    <Button type='ghost' size='small' disabled={this.state.done} onClick={this.toggleEdit}
                            className='task-action edit' icon='save'/>
                </div>

                : <div className={`task display ${this.props.done ? 'done': 'not-done'}`}>
                    <div className='content'>{this.state.content}</div>
                    <div className='actions'>
                        <Button type='ghost' size='small' disabled={this.state.done} onClick={this.toggleEdit}
                                className='task-action edit' icon='edit'/>
                        <Button type='ghost' size='small' disabled={this.state.done} onClick={this.completeTask}
                                className='task-action complete' icon='check'/>
                    </div>
                </div>
        );
    }
}

Task.propTypes = {
    content: PropTypes.string,
    done: PropTypes.bool,
};

Task.defaultProps = {
    content: '',
    done: false,
};



