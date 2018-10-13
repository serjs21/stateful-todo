import {observable, action, computed} from 'mobx';

export class TasksStore {
    @observable tasks = [
        {title: 'First Task', content: 'Details of first Task', id: 0, done: true},
        {title: 'Second Task', content: 'Details of second Task', id: 1},
    ];

    @observable idx = this.tasks.length;

    @action addTask = (title = '', content = '') => {
        this.tasks.push({title, content, id: this.idx + 1});
        this.idx = this.idx + 1;
    };

    @action toggleTaskComplete = (id) => {
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        this.tasks[taskIdx].done  = !this.tasks[taskIdx].done;
    };

    @action editTaskContent = (id, content) => {
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        this.tasks[taskIdx].content  = content;
    };

    @action removeTask = (id) => {
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        this.tasks.remove(this.tasks[taskIdx]);
    };

    @computed get tasksCount() {
        return this.tasks.length;
    }

    @computed get doneTasks() {
        return this.tasks.filter(task => task.done).length;
    }

    @computed get todoTasks() {
        return this.tasks.filter(task => !task.done).length;
    }
}

export default new TasksStore();
