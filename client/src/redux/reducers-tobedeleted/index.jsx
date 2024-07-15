import _ from 'lodash'
import update from 'immutability-helper'
import moment from 'moment'

const rootReducer = (state = {
  domains: [],
  selectedDomain: undefined,
  selectedClient: undefined,
  clientToEdit: undefined,
  selectedApplications: undefined,
  searchedClients: undefined,
  selectedService: undefined,
  loggedInUser: null,
  loggedIn: false,
  loggedOut: false,
  metrics: [],
  clientMetrics: [],
  serviceMetrics: [],
  roadmap: [],
  groups: [],
  clients: [],
  openshift: [],
  tomcat: [],
  others: [],
  noProd: [],
  mapps: [],
  apis: [],
  applis: [],
}, action) => {
  if (!_.get(action, 'type')) {
    return state
  }
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...state,
        searchedClients: undefined,
        searchedDomains: undefined,
      }
    case 'RESET_METRICS':
      return {
        ...state,
        clientMetrics: [],
        serviceMetrics: []
      }
    case 'RESET_SELECTED_CLIENT_APPLICATIONS':
      return {
        ...state, 
        selectedClient: { 
          ...state.selectedClient, 
          applications: []
        },
      }  
    case 'LOAD_DOMAINS_SUCCESS':
      return {
        ...state, domains: action.payload.domains,
        searchedDomains: action.payload.searchedDomains,
      }
    case 'LOAD_CLIENTS_SUCCESS':
      return {
        ...state,
        clients: action.payload.clients,
        searchedClients: action.payload.searchedClients,
      }
    case 'LOAD_CLIENT_APPLICATIONS':
      return {
        ...state, 
        selectedClient: { 
          ...state.selectedClient, 
          applications: action.payload.applications
        },
      }      
    case 'LOAD_APIS_SUCCESS':
      return {
        ...state, apis: action.payload.apis,
      }
    case 'LOAD_DIGIS_SUCCESS' :
      return {
        ...state,
        openshift: action.payload.openshift,
        tomcat: action.payload.tomcat,
        others: action.payload.others,
        noProd: action.payload.noProd,
      }
    case 'LOAD_MAPPS_SUCCESS' :
      return {
        ...state, mapps: action.payload.mapps,
      }
    case 'LOAD_APPLICATIONS_SUCCESS':
      return {
        ...state, applis: action.payload.applis,
      }
    case 'LOAD_METRICS_SUCCESS':
      return {
        ...state, metrics: action.payload.metrics,
      }
    case 'LOAD_SERVICE_METRICS_SUCCESS':
      return {
        ...state, serviceMetrics: action.payload.serviceMetrics,
      }
    case 'LOAD_CLIENT_METRICS_SUCCESS':
      return {
        ...state, clientMetrics: action.payload.clientMetrics,
      }
    case 'LOAD_ROADMAP_SUCCESS':
      let items = []
      items = action.roadmap.flatMap((domain, domainIndex) => {
        return domain.issues.map((item, itemIndex) => {
          item.id = (domainIndex + 1) + '-' + (itemIndex + 1)
          item.start_time = moment(item.start_time, 'YYYY-MM-DD')
          item.end_time = moment.now()
          item.elapsedDays = Math.abs(
            item.start_time.diff(item.end_time, 'days'))
          item.stages.map(stage => {
            stage.elapsedDays = Math.abs(moment(stage.start_time).diff((stage.end_time ? moment(stage.end_time) : moment.now()),
                'days'))
            stage.percentage = Math.floor(
              stage.elapsedDays * 100 / item.elapsedDays) + 1
            return stage
          })
          return item
        })
      })
      return update(state, {
        roadmap: {
          $set: items,
        },
        groups: {
          $set: action.roadmap.map(domain => {
            return {title: domain.title, id: domain.id}
          }),
        },
      })
    case 'SELECT_DOMAIN':
      return {
        ...state, selectedDomain: action.payload.domain,
      }
    case 'SELECT_CLIENT':
      return {
        ...state, selectedClient: action.payload.api,
      }
    case 'SET_CLIENT_TO_EDIT':
        return {
          ...state, clientToEdit: action.payload.clientToEdit,
      }        
    case 'SELECT_APPLICATIONS':
      return {
        ...state, selectedApplications: action.payload.appli,
      }
    case 'SELECT_SERVICE':
      return {
        ...state, selectedService: action.payload.service,
      }
    case 'SEARCH_CLIENT':
        return {
          ...state, searchedClients: action.payload.searchedClients,
        }    
    case 'SEARCH_DOMAIN':
        return {
          ...state, searchedDomains: action.payload.searchedDomains,
        }
    case 'AUTHENTICATION_USER_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.loggedInUser
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.loggedInUser
      }
    case 'LOGGED_IN':
      return {
        ...state, loggedIn: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        loggedInUser: null
      }
    default:
      return state
  }
}
export default rootReducer
