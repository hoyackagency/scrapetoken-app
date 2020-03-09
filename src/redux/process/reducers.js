import {
  GET_PROCESSES,
  GET_PROCESSES_SUCCESS,
  GET_PROCESSES_FAILED,
  SELECT_PROCESS,
  ADD_PROCESS,
  ADD_PROCESS_SUCCESS,
  ADD_PROCESS_FAILED,
  UPDATE_PROCESS,
  UPDATE_PROCESS_SUCCESS,
  UPDATE_PROCESS_FAILED,
  DELETE_PROCESS,
  DELETE_PROCESS_SUCCESS,
  DELETE_PROCESS_FAILED,
  START_PROCESS,
  START_PROCESS_SUCCESS,
  START_PROCESS_FAILED,
  STOP_PROCESS,
  STOP_PROCESS_SUCCESS,
  STOP_PROCESS_FAILED,
  SCHEDULE_PROCESS,
  SCHEDULE_PROCESS_SUCCESS,
  SCHEDULE_PROCESS_FAILED,
  GET_PROCESS_RESULT,
  GET_PROCESS_RESULT_SUCCESS,
  GET_PROCESS_RESULT_FAILED  
} from "./constants";

import {
  PROCESS_STATUS_SCHEDULED,
  PROCESS_STATUS_RUNNING,
  PROCESS_STATUS_CANCELED,
  PROCESS_STATUS_FAILED
  // PROCESS_STATUS_COMPLETED
} from "../../constants";

const INIT_STATE = {
  processes: [],
  selected_process: null,
  loading: false,
  error: null,
  results: {}
};

const filterInPlace = (array, predicate) => {
  let end = 0;

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    if (predicate(obj)) {
      array[end++] = obj;
    }
  }

  array.length = end;
};

const Process = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROCESSES: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: action.processes,
        loading: false,
        error: null
      };
    }

    case GET_PROCESSES_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case SELECT_PROCESS: {
      return {
        ...state,
        selected_process: action.process
      };
    }

    case ADD_PROCESS: {
      return {
        ...state,
        loading: true
      }
    }

    case ADD_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      processes.push(action.process);

      return {
        ...state,
        processes: processes,
        selected_process: action.process,
        loading: false,
        error: null
      };
    }

    case ADD_PROCESS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case UPDATE_PROCESS: {
      return {
        ...state,
        loading: true
      }
    }

    case UPDATE_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.process.id
      );
      if (index !== -1) {
        processes[index] = action.process;
      }

      return {
        ...state,
        processes: processes,
        selected_process: action.process,
        loading: false,
        error: null
      };
    }

    case UPDATE_PROCESS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case DELETE_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }

    case DELETE_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      filterInPlace(processes, obj => obj.id === action.pid);

      let selected_process = null;
      if (processes.length > 0) {
        selected_process = processes[0];
      }

      return {
        ...state,
        processes: processes,
        selected_process: selected_process,
        loading: false,
        error: null
      };
    }

    case DELETE_PROCESS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case START_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }

    case START_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.pid
      );
      if (index === -1) {
        return state;
      }
      processes[index].status = PROCESS_STATUS_RUNNING;

      return {
        ...state,
        processes: processes,
        loading: false,
        error: null
      };
    }

    case START_PROCESS_FAILED: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.pid
      );
      if (index === -1) {
        return state;
      }
      processes[index].status = PROCESS_STATUS_FAILED;

      return {
        ...state,
        processes: processes,
        loading: false,
        error: action.error
      };      
    }

    case STOP_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }

    case STOP_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.pid
      );
      if (index === -1) {
        return state;
      }
      processes[index].status = PROCESS_STATUS_CANCELED;

      return {
        ...state,
        processes: processes,
        loading: false,
        error: null
      };
    }

    case STOP_PROCESS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };      
    }

    case SCHEDULE_PROCESS: {
      return {
        ...state,
        loading: true
      }
    }

    case SCHEDULE_PROCESS_SUCCESS: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.process.id
      );
      if (index === -1) {
        return state;
      }
      processes[index].status = PROCESS_STATUS_SCHEDULED;

      return {
        ...state,
        processes: processes,
        loading: false,
        error: null
      };      
    }

    case SCHEDULE_PROCESS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case GET_PROCESS_RESULT: {
      return {
        ...state,
        loading: true
      };
    }

    case GET_PROCESS_RESULT_SUCCESS: {
      let processes = state.processes.slice();
      if (processes.length === 0) {
        return state;
      }

      let index = processes.findIndex(
        process => process.id === action.pid
      );
      if (index === -1) {
        return state;
      }

      let results = state.results;
      results.pid = action.result;

      return {
        ...state,
        results: results,
        loading: false,
        error: null
      };  
    }

    case GET_PROCESS_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };      
    }

    default:
      return state;
  }
};

export default Process;
