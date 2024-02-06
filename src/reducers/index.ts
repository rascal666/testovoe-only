import {combineReducers} from "redux";
import timeLineReducer from './timeLineReducer'


const rootReducer = combineReducers({
    historyEvent: timeLineReducer
})

export default rootReducer