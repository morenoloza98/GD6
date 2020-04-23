import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';


class TodoList extends Component {
    state = {
        id: '',
        description: '',
        tasks: []
    }

    getList = () => {
        axios.get('/tasks/all')
            .then(res => {
            this.setState({ tasks: res.data.data });
            })
            .catch(err => console.log(err));
    }

    addTask = (description) => {
        return axios.post('/tasks/add', {
            description: description
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    deleteTask = (id) => {
    axios.delete(`/tasks/${id}/delete`)
        .then(res => {
        console.log(res);
        })
        .catch(err => console.log(err));
    }

    markAsDone = (id) => {
    axios.put(`/tasks/${id}/done`, {
        status: 'done'
    })
        .then(res => {
        console.log(res);
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.getList();
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.addTask(this.state.description).then(() => {
            this.getList()
        })
        this.setState({
            description: ''
        })
    }

    onUpdate = (value, e) => {
        e.preventDefault()
        this.markAsDone(value)

        let data = [...this.state.tasks]
        data.filter(function(task, index) {
            if(task.id === value){
                task.status = 'done'
            }
            return true
        })
        this.setState({ tasks: [...data]})
    }

    onDelete = (value, e) => {
        e.preventDefault()
        this.deleteTask(value)

        let data = [...this.state.tasks]
        data.filter(function(task, index) {
            if(task.id === value){
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ tasks: [...data]})
    }

    render(){    
        return (
            <>
            <div>
                <form onSubmit={this.onSubmit} className="form-inline">
                    <div className="form-group mb-2">
                        <label className="sr-only" htmlFor="description2">TODO</label>
                        <input type="text" readOnly className="form-control-plaintext w-50" id="description2" value="TODO"></input>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <input 
                            className="form-control"
                            placeholder="What to do..."
                            type="text"
                            id="description" 
                            name="description"
                            value={this.state.description || ''}
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                        <button
                            className="btn btn-primary mb-2"
                            type="submit"
                            onClick={this.onSubmit.bind(this)}>
                                Submit
                        </button>
                </form>
            </div>
            <div>
                <table className="table table-dark">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tasks.map((todo, i) => {
                    return (
                        <tr key={i} style={{backgroundColor: todo.status === 'pending' ? "" : 'grey'}}>
                            <Todo id={i} todo={todo} />
                            <td>
                                <button
                                    className="btn btn-success"
                                    href=""
                                    onClick={this.onUpdate.bind(this, todo.id)}
                                >
                                        Terminado
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    href=""
                                    onClick={this.onDelete.bind(
                                        this,
                                        todo.id
                                    )}
                                >
                                        Borrar
                                </button>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
                </table>
            </div>
            </>
        );
    }
}

export default TodoList;