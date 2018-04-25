import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy: 'name',
            sortValue: 1

        }
    }

    
    onToggleForm = () => {
        // if(this.state.isDisplayForm && this.state.taskEditing !==null) {
        //     this.setState({
        //         isDisplayForm: true,
        //         taskEditing : null
        //     });
        // } else {
        //     this.setState({
        //         isDisplayForm : !this.state.isDisplayForm,
        //         taskEditing : null
        //     });
        // }
        this.props.onToggleForm();
        
    }
    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }
    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id=== id) {
                result = index
            }
        });
        return result;
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        })
    }

    onSearch = (keyword)=> {
        this.setState({
            keyword : keyword
        })
    }
    onSort = (sortBy,sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue : sortValue
        })
    }
  render() {
    var { 
    taskEditing, 
    sortBy,
    sortValue} = this.state //var tasks = this.state.task
    var {isDisplayForm} = this.props;
    // if(filter) {
        // if(filter.name){
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(filter.name) !== -1
        //     })
        // }
        // tasks = tasks.filter((task) => {
        //     if(filter.status === -1) {
        //         return task;
        //     } else {
        //         return task.status === (filter.status === 1 ? true : false)
        //     }
        // });
    // }
    // if(keyword) {
    //     tasks = tasks.filter((task) => {
    //         return task.name.toLowerCase().indexOf(keyword)!== -1;
    //     });
    // }
    // if(sortBy ==='name') {
    //     tasks.sort((a,b) => {
    //         if(a.name > b.name) {
    //             return sortValue;
    //         } else if(a.name<b.name) {
    //             return -sortValue;
    //         } else {
    //             return 0;
    //         }
    //     })
    // } else {
    //     tasks.sort((a,b) => {
    //         if(a.status > b.status) {
    //             return sortValue;
    //         } else if(a.status<b.status) {
    //             return -sortValue;
    //         } else {
    //             return 0;
    //         }
    //     })
    // }
    // var elmTaskForm = isDisplayForm ? <TaskForm 
    //                                     onCloseForm={this.onCloseForm} 
    //                                     task = {taskEditing}/> : '';
    return (
        <div className="container">
            <div className="text-center">
                <h1>Quan Ly Cong Viec</h1>
            </div>
            <div className="row">
                <div className={ isDisplayForm ? 'col-xs-4 col-md-4 col-sm-4 col-lg-4' : '' }>
                    <TaskForm onCloseForm={this.onCloseForm} task = {taskEditing}/>
                </div>
                <div className={ isDisplayForm ? 'col-xs-8 col-md-8 col-sm-8 col-lg-8' : 'col-xs-12 col-md-12 col-sm-12 col-lg-12'}>
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick = {this.onToggleForm}>
                        <span className="fa fa-plus mr-5"></span> Them Cong Viec
                    </button>
                    <Control 
                    onSearch={this.onSearch}
                    onSort={this.onSort}
                    sortBy={sortBy}
                    sortValue={sortValue}/>
                    <TaskList 
                    onUpdate={this.onUpdate}
                    onFilter={this.onFilter}/>
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm())
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
