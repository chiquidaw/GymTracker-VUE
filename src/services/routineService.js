import api from './api'

/**
 * Service for handling routine-related API calls
 */
const routineService = {
    /**
     * Get public routines or filter by user
     * @param {Object} params - Query parameters (e.g., user_id)
     * @returns {Promise} List of routines
     */
    async getRoutines(params = {}) {
        const response = await api.get('/routines', { params })
        const data = response.data
        if (data && data.routines && Array.isArray(data.routines)) return data.routines
        if (data && data.data && Array.isArray(data.data)) return data.data
        if (Array.isArray(data)) return data
        return []
    },

    /**
     * Get routines the current user is subscribed to
     * @returns {Promise} List of subscribed routines
     */
    async getMyRoutines() {
        const response = await api.get('/my-routines')
        const data = response.data
        if (data && data.routines && Array.isArray(data.routines)) return data.routines
        if (data && data.data && Array.isArray(data.data)) return data.data
        if (Array.isArray(data)) return data
        return []
    },

    /**
     * Get a single routine by ID with details
     * @param {number|string} id - Routine ID
     * @returns {Promise} Routine details
     */
    async getRoutine(id) {
        const response = await api.get(`/routines/${id}`)
        return response.data.data || response.data
    },

    /**
     * Create a new routine
     * @param {Object} data - Routine data {name, exercises: [{id, sets, reps, rest_seconds}, ...]}
     * @returns {Promise} Created routine
     */
    async createRoutine(data) {
        const response = await api.post('/routines', data)
        return response.data
    },

    /**
     * Subscribe to a routine
     * @param {number|string} id - Routine ID
     * @returns {Promise}
     */
    async subscribe(id) {
        const response = await api.post('/my-routines', { routine_id: id })
        return response.data
    },

    /**
     * Unsubscribe from a routine
     * @param {number|string} id - Routine ID
     * @returns {Promise}
     */
    async unsubscribe(id) {
        const response = await api.delete(`/my-routines/${id}`)
        return response.data
    },

    /**
     * Update a routine (if owner)
     * @param {number|string} id - Routine ID
     * @param {Object} data - Updated routine data
     * @returns {Promise}
     */
    async updateRoutine(id, data) {
        const response = await api.put(`/routines/${id}`, data)
        return response.data
    },

    /**
     * Delete a routine (if owner)
     * @param {number|string} id - Routine ID
     * @returns {Promise}
     */
    async deleteRoutine(id) {
        const response = await api.delete(`/routines/${id}`)
        return response.data
    }
}

export default routineService
