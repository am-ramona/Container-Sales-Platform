import axios from 'axios'
import Apis from './model'
import _ from 'lodash'

export const selectApisMapps = apimapp => ({
  type: 'SELECT_APIS_MAPPS',
  payload: {apimapp: apimapp},
})

export const loadMappsSuccess = (mapps) => ({
  type: 'LOAD_MAPPS_SUCCESS',
  payload: {mapps: mapps},
})
export const loadRoadmapSuccess = (roadmap) => ({
  type: 'LOAD_ROADMAP_SUCCESS',
  roadmap: roadmap,
})

export const resetState = () => ({type: 'RESET_STATE'})

export const resetMetrics = () => ({type: 'RESET_METRICS'})

export const getApiMapps = () => (dispatch) => {
  return axios.get(`/api/v1/mapping`).then((result) => {
    let mapps = result.data.mapp.map((rawDomain) => {
      return new Apis(rawDomain.env, rawDomain.apis)
    })
    return dispatch(loadMappsSuccess(_.sortBy(mapps, 'env')))
  }).catch(error => {
    throw(error)
  })
}

export function getApiMapp (apiName) {
  return function (dispatch, getState) {
    return dispatch(getApiMapps()).then(() => {
      return dispatch(selectApisMapps(getState().rootReducer.apis.filter((apimapp) => apimapp.apis.api === apiName)[0]))
    })
  }
}

export const getUserProfile = () => (dispatch) => {
  return axios.get(`/api/v1/profile`).then((results) => {
    dispatch({
      type: 'GET_USER_SUCCESS',
      loggedInUser: results.data,
    })
  }).catch(error => {
    //console.log(error)
  })
}

export const connectUser = (initialURL) => (dispatch) => {
  return axios.get('/auth/sso/login?initialURL=' + initialURL).then((results) => {
    dispatch({
      type: 'AUTHENTICATION_USER_SUCCESS',
      loggedIn: true,
    })
  }).catch(error => {
    throw(error)
  })
}

export const userConnected = () => (dispatch, getState) => {
  dispatch({type: 'LOGGED_IN'})
}

export const disconnectUser = (history) => (dispatch, getState) => {
  return axios.get('/auth/sso/logout').then((results) => {
    dispatch({type: 'LOGOUT'})
    dispatch({type: 'RESET_STATE'})
    history.push('/')
    window.location.reload(false)
  }).catch(error => {
    throw(error)
  })
}
