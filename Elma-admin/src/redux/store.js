import { combineReducers, createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { loadState, saveState } from './storeState'
import { dataReducer } from './reducer/reducers'

const loadAdminState = loadState()
const rootReducer = combineReducers({
    data: dataReducer,
})
const store = createStore(rootReducer, loadAdminState, applyMiddleware(thunk))

store.subscribe(() => {
    saveState(store.getState())
})

window.addEventListener('beforeunload', () => {
    saveState(store.getState())
})

export default store
