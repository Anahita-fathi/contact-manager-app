import axios from "axios";

const SERVICE_URL = "http://localhost:9000";

export const getContacts = () => {
    const url = `${SERVICE_URL}/contacts`
    return axios.get(url)
}
export const getContact = (contactId) => {
    const url = `${SERVICE_URL}/contacts/${contactId}`
    return axios.get(url)
}

export const getGroups = () => {
    const url = `${SERVICE_URL}/groups`
    return axios.get(url)
}
export const getGroup = (groupId) => {
    const url = `${SERVICE_URL}/groups/${groupId}`
    return axios.get(url)
}
export const createContact = (contact) => {
    const url = `${SERVICE_URL}/contacts`
    return axios.post(url, contact)
}

export const updateContact = (contactId, contact) => {
    const url = `${SERVICE_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

export  const deleteContact=(contactId)=>{
    const url = `${SERVICE_URL}/contacts/${contactId}`
    return axios.delete(url)
}