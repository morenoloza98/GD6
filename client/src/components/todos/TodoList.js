import React, { Component, useState } from 'react';
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
                <form onSubmit={this.onSubmit} class="form-inline">
                    <div class="form-group mb-2">
                        <label class="sr-only" for="description2">TODO</label>
                        <input type="text" readonly class="form-control-plaintext w-50" id="description2" value="TODO"></input>
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input 
                            class="form-control"
                            placeholder="What to do..."
                            type="text"
                            id="description" 
                            name="description"
                            value={this.state.description || ''}
                            onChange={this.onChange.bind(this)}
                            />
                    </div>
                        <button
                            class="btn btn-primary mb-2"
                            type="submit"
                            onClick={this.onSubmit.bind(this)}>
                                Submit
                        </button>
                </form>
            </div>
            <div>
                <table class="table table-dark">
                <thead class="thead-dark">
                    <th>#</th>
                    <th>Task</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                    {this.state.tasks.map((todo, i) => {
                    return (
                        <tr key={i} style={{backgroundColor: todo.status == 'pending' ? "" : 'grey'}}>
                            <td>{i}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button
                                    class="btn btn-success"
                                    href=""
                                    onClick={this.onUpdate.bind(this, todo.id)}
                                >
                                        Terminado
                                </button>
                            </td>
                            <td>
                                <button
                                    class="btn btn-danger"
                                    href=""
                                    onClick={this.onDelete.bind(
                                        this,
                                        todo.id
                                    )}
                                >
                                        Borrar
                                </button>
                            </td>
                            <td>
                                <Todo id={todo.id}/>
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