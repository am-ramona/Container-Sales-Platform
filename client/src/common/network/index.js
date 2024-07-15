import axios from "axios";


const getAllClients = (page, query = '') => {
    return axios.get(`/api/v1/client/all/${page}?${query}`)
    .then(response=>response.data);
}

const getClient = (clientId) =>{
    return axios.get(`/api/v1/client/${clientId}`)
    .then(response=>response.data);
}


const addClient = (clientData) =>{
    return axios.post(`/api/v1/client`, clientData)
    .then(response=>response.data);
}

const updateClient = (clientId, clientData) =>{
    return axios.put(`/api/v1/client/${clientId}`, clientData)
    .then(response=>response.data);
}

const deleteClient = (clientId) =>{
    return axios.delete(`/api/v1/client/${clientId}`)
    .then(response=>response.data);
}

const addClientImage = (clientId, clientData) => {
    return axios.post(`/api/v1/image/${clientId}`, clientData)
    .then(response=>response.data);
}

export {
    addClient,
    updateClient,
    deleteClient,
    getClient,
    getAllClients,
    addClientImage
}