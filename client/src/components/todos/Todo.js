import React, { Component } from 'react';
import axios from 'axios';

class Todo extends Component {
    constructor(props){
        super(props);
    }
    state = {
        task: []
    }

    showSingle = (id) => {
        axios.get(`/tasks/${id}`)
            .then(res => {
                this.setState({task: res.data.data})
            })
            .catch(err => console.log(err));
    }

    onShow = (value, e) => {
        e.preventDefault()
        this.showSingle(value)
    }

    render(){
        return(
            <button
                class="btn btn-warning"
                href=""
                onClick={this.onShow.bind(this.props.id)}>
                    Ver
            </button>
        )
    }
}

export default Todo;