import React, {Component} from 'react';
import Task from '../Task/task';
import {Collapse, Checkbox} from 'antd';
import PropTypes from 'prop-types';
import store from '../../store';

export default class List extends Component {
    getToggleTaskCompleteFunction = (id) => () => store.toggleTaskComplete(id);
    getToggleCheckboxCompleteFunction = (id) => (event) => {
        event.stopPropagation();
        store.toggleTaskComplete(id);
    };

    getHeader = task => <span className={`task-header ${task.done ? 'done' : 'not-done'}`}>
        {task.title}
        <Checkbox className='checkbox'
                  checked={task.done}
                  onClick={this.getToggleCheckboxCompleteFunction(task.id)}/>
    </span>;


    render() {
        return (
            <Collapse accordion={true}>
                {Object.values(this.props.tasks).map(task => <Collapse.Panel header={this.getHeader(task)}
                                                                             key={task.id}>
                    <Task content={task.content}
                          toggleTaskComplete={this.getToggleTaskCompleteFunction(task.id)}
                          done={task.done}
                          id={task.id}
                          key={`${task.id}-content`}/></Collapse.Panel>)}
            </Collapse>
        );
    }
}

List.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string,
        }))
};

List.defaultProps = {
    tasks: [],
};
