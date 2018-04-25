import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name===this.state.filterName? value : this.state.filterName,
            name===this.state.filterStatus? value : this.state.filterStatus,
            )
        this.setState({
            [name] : value
        });
    }
  render() {
    var {tasks} = this.props;
    var {filterName, filterStatus} = this.state;
    var elmTask = tasks.map((task,index) => {
        return <TaskItem 
                key={task.id} 
                index={index} 
                task={task}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}/>
    })
    return (
         <div className="row mt-15">
            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Ten</th>
                            <th className="text-center">Trang Thai</th>
                            <th className="text-center">Hanh Dong</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input 
                                type="text" 
                                name="filterName"
                                value ={filterName}
                                onChange = {this.onChange}
                                className="form-control"/>
                            </td>
                            <td>
                                <select 
                                name="filterStatus" 
                                className="form-control"
                                value ={filterStatus}
                                onChange = {this.onChange}
                                >
                                    <option value={-1}>Tat Ca</option>
                                    <option value={0}>An</option>
                                    <option value={1}>KichHoat</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {elmTask}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks //task chinh la ben reducer index.js
    }
}

export default connect(mapStateToProps, null)(TaskList);
