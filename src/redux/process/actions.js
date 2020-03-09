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

export const getProcesses = () => ({
  type: GET_PROCESSES
});

export const getProcessesSuccess = processes => ({
  type: GET_PROCESSES_SUCCESS,
  processes
});

export const getProcessesFailed = error => ({
  type: GET_PROCESSES_FAILED,
  error
});

export const selectProcess = process => ({
  type: SELECT_PROCESS,
  process
});

export const addProcess = process => ({
  type: ADD_PROCESS,
  process
});

export const addProcessSuccess = process => ({
  type: ADD_PROCESS_SUCCESS,
  process
});

export const addProcessFailed = error => ({
  type: ADD_PROCESS_FAILED,
  error
});

export const updateProcess = process => ({
  type: UPDATE_PROCESS,
  process
});

export const updateProcessSuccess = process => ({
  type: UPDATE_PROCESS_SUCCESS,
  process
});

export const updateProcessFailed = error => ({
  type: UPDATE_PROCESS_FAILED,
  error
});

export const deleteProcess = pid => ({
  type: DELETE_PROCESS,
  pid
});

export const deleteProcessSuccess = pid => ({
  type: DELETE_PROCESS_SUCCESS,
  pid
});

export const deleteProcessFailed = error => ({
  type: DELETE_PROCESS_FAILED,
  error
});

export const startProcess = pid => ({
    type: START_PROCESS,
    pid
});

export const startProcessSuccess = pid => ({
    type: START_PROCESS_SUCCESS,
    pid
});

export const startProcessFailed = error => ({
    type: START_PROCESS_FAILED,
    error
});

export const stopProcess = pid => ({
    type: STOP_PROCESS,
    pid
});

export const stopProcessSuccess = pid => ({
    type: STOP_PROCESS_SUCCESS,
    pid
});

export const stopProcessFailed = error => ({
    type: STOP_PROCESS_FAILED,
    error
});

export const scheduleProcess = (pid, schedule) => ({
    type: SCHEDULE_PROCESS,
    pid,
    schedule
});

export const scheduleProcessSuccess = process => ({
    type: SCHEDULE_PROCESS_SUCCESS,
    process
});

export const scheduleProcessFailed = error => ({
    type: SCHEDULE_PROCESS_FAILED,
    error
});

export const getProcessResult = pid => ({
    type: GET_PROCESS_RESULT,
    pid
});

export const getProcessResultSuccess = (pid, result) => ({
    type: GET_PROCESS_RESULT_SUCCESS,
    pid,
    result
});

export const getProcessResultFailed = error => ({
    type: GET_PROCESS_RESULT_FAILED,
    error
});