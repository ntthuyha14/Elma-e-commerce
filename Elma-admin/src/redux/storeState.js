const LOCAL_STORAGE_KEY = 'ELMA_ADMIN_ECOMMERCE'
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.error('Error loading state from localStorage')
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
    } catch (e) {
        console.log('Error saving state to localStorage: ', e)
    }
}
