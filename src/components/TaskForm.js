import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name : '',
            status : false
        }
    }
    componentWillMount() {
        //duoc goi khi componet dcuo gan vao
        if(this.props.task) {
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.task) {
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        } else if(!nextProps.task) {
            this.setState({
                id: '',
                name : '',
                status : false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onChange = (e) =>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name==="status") {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status: false
        })
    }

  render() {
    var {id} = this.state
    if(!this.props.isDisplayForm) return '';
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {id!==''? 'Cap Nhat Cong Viec' : 'Them Cong Viec'}
                    <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                     <div className="form-group">
                         <label>Ten :</label>
                            <input type="text"
                            name="name"
                            value={this.state.name}
                            onChange = {this.onChange}
                            className="form-control"
                            />
                     </div>
                     <label>Trang Thai:</label>
                     <select 
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange = {this.onChange}>
                         <option value={true}>Kich Hoat</option>
                         <option value={false}>An</option>
                     </select>
                     <br/>
                     <div className="text-center">
                         <button type="submit" className="btn btn-warning">
                             <span className="fa fa-plus mr-5"></span> Luu Lai
                         </button>
                         <button type="submit" className="btn btn-warning">
                             <span className="fa fa-close mr-5" onClick={this.onClear}></span> Huy Bo
                         </button>
                     </div>
                </form>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    }
}
//tham so 2 chinh la action dc dipact
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
