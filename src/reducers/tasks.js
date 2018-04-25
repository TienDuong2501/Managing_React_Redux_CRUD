import * as types from './../constants/ActionTypes';
var id = '';
var index = -1;
var s4= () => {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

var ranDomID =() => {
    return s4() + s4() + '-' + s4() + '-' + s4()+'-' + s4()+'-' + s4()+'-' + s4()+'-' + s4()+'-' + s4();
}

var findIndex = (id, tasks) => {
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id=== id) {
                result = index
            }
        });
        return result;
    }
//lay giu lieu tu tren localstore
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state= initialState, action) => {
	switch(action.type) {
		case types.LIST_ALL:
			return state;
		case types.ADD_TASK:
		var newTask = {
			id : ranDomID(),
			name : action.task.name,
			status : action.task.status === 'true' ? true : false
		}
			state.push(newTask);
			localStorage.setItem('task', JSON.stringify(state));
			return [...state];
		case types.UPDATE_STATUS:
			id = action.id;
	        index = findIndex(id, state);
	        // state[index].status = !state[index].status;
	        var cloneTask = {...state[index]};
	        cloneTask.status = !cloneTask.status;
	        // state.splice(index, 1);
	        // state.push(cloneTask);
	        state[index] = cloneTask;
	        // state[index] = {
	        // 	...state[index], 
	        // 	status : !state[index].status
	        // }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
	        id = action.id;
	        index = findIndex(id, state);
	        state.splice(index, 1);
	        localStorage.setItem('tasks', JSON.stringify(state));
	        return [...state];
		default : return state
	}
}

export default myReducer;