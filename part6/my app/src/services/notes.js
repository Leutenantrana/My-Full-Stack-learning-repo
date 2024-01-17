const baseUrl = 'http://localhost:4444/notes'
import axios from 'axios'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data

}

const createNew = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default {
    getAll,
    createNew
}