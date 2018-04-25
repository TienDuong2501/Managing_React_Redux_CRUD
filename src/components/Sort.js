import React, { Component } from 'react';

class Sort extends Component {
    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
  render() {
    return (
            <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                <div className="dropdown">
                    <button 
                    type="butotn"
                    className="btn btn-primary dropdown-toggle"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    >
                     Sap Sep <span className="fa fa-caret-quare-o-down ml-5"></span>
                        
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={ () => this.onClick('name', 1) }>
                            <a 
                            role="button" 
                            className={(this.props.sortBy === 'name' && this.props.sortValue===1) ? 'sort_selected': ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Ten A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick={ () => this.onClick('name', -1) }>
                            <a 
                            role="button"
                            className={(this.props.sortBy === 'name' && this.props.sortValue===-1) ? 'sort_selected': ''}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Ten Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={ () => this.onClick('status', 1) }>
                            <a role="button" 
                            className={(this.props.sortBy === 'status' && this.props.sortValue===1) ? 'sort_selected': ''}
                            >Trang Thai Kich Hoat</a>
                        </li>
                        <li onClick={ () => this.onClick('status', -1) }>
                            <a role="button"
                            className={(this.props.sortBy === 'status' && this.props.sortValue===-1) ? 'sort_selected': ''}
                            >
                                Trang Thai An
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        
    );
  }
}

export default Sort;
