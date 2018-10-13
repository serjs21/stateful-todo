import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Todo';
import TasksStore from './store';

ReactDOM.render(<App store={TasksStore}/>, document.getElementById('root'));

