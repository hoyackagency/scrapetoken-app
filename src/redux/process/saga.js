import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { fetchJSON } from "../../helpers/api";

import {
  GET_PROCESSES,
  ADD_PROCESS,
  UPDATE_PROCESS,
  DELETE_PROCESS,
  START_PROCESS,
  STOP_PROCESS,
  SCHEDULE_PROCESS,
  GET_PROCESS_RESULT
} from "./constants";

import {
  getProcessesSuccess,
  getProcessesFailed,
  addProcessSuccess,
  addProcessFailed,
  updateProcessSuccess,
  updateProcessFailed,
  deleteProcessSuccess,
  deleteProcessFailed,
  startProcessSuccess,
  startProcessFailed,
  stopProcessSuccess,
  stopProcessFailed,
  scheduleProcessSuccess,
  scheduleProcessFailed,
  getProcessResultSuccess,
  getProcessResultFailed
} from "./actions";

const API_BASE_URL = 'http://localhost:8080';

/**
 * Get processes
 * @param {*} process - process information
 */
function* get_processes() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = API_BASE_URL + "/process"
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(getProcessesSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(getProcessesFailed(message));
  }
}

/**
 * Add a process
 * @param {*} process
 */
function* add_process(process) {
    const options = {
        body: JSON.stringify(process),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      };
    
  try {
    let fetch_url = API_BASE_URL + "/process"
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(addProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(addProcessFailed(message));
  }
}

/**
 * Update a process
 */
function* update_process(process) {
  const options = {
    body: JSON.stringify(process),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${process.pid}`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(updateProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(updateProcessFailed(message));
  }
}

/**
 * Delete a process
 */
function* delete_process(pid) {
  const options = {
    body: JSON.stringify(process),
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${pid}`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(deleteProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(deleteProcessFailed(message));
  }
}

/**
 * Start a process
 */
function* start_process(pid) {
  const options = {
    body: JSON.stringify(pid),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${pid}/start`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(startProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(startProcessFailed(message));
  }
}

/**
 * Stop a process
 */
function* stop_process(pid) {
  const options = {
    body: JSON.stringify(pid),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${pid}/stop`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(stopProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(stopProcessFailed(message));
  }
}

/**
 * Schedule a process
 */
function* schedule_process(pid, schedule) {
  const options = {
    body: JSON.stringify({pid, schedule}),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${pid}/schedule`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(scheduleProcessSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(scheduleProcessFailed(message));
  }
}

/**
 * Get result of a process
 */
function* get_process_result(pid) {
  const options = {
    body: JSON.stringify(pid),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };

  try {
    let fetch_url = `${API_BASE_URL}/process/${pid}/result`;
    const response = yield call(fetchJSON, fetch_url, options);
    yield put(getProcessResultSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(getProcessResultFailed(message));
  }
}

export function* watchGetProcesses() {
  yield takeEvery(GET_PROCESSES, get_processes);
}

export function* watchAddProcess() {
  yield takeEvery(ADD_PROCESS, add_process);
}

export function* watchUpdateProcess() {
  yield takeEvery(UPDATE_PROCESS, update_process);
}

export function* watchDeleteProcess() {
  yield takeEvery(DELETE_PROCESS, delete_process);
}

export function* watchStartProcess() {
  yield takeEvery(START_PROCESS, start_process);
}

export function* watchStopProcess() {
  yield takeEvery(STOP_PROCESS, stop_process);
}

export function* watchScheduleProcess() {
  yield takeEvery(SCHEDULE_PROCESS, schedule_process);
}

export function* watchGetProcessResult() {
  yield takeEvery(GET_PROCESS_RESULT, get_process_result);
}

function* processSaga() {
  yield all([
    fork(watchGetProcesses),
    fork(watchAddProcess),
    fork(watchUpdateProcess),
    fork(watchDeleteProcess),
    fork(watchStartProcess),
    fork(watchStopProcess),
    fork(watchScheduleProcess),
    fork(watchGetProcessResult)
  ]);
}

export default processSaga;
