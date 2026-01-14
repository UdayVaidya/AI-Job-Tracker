import API from './api'

export const fetchApplication = async () => {
    try {
        const response = await API.get('/applications')
        return response.data.applications || response.data
    } catch (error) {
        console.error(error)
        throw error
    }
};