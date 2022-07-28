import {combineReducers} from 'redux';
import artistsReducer from './reducer';
import  albumsReducer from './albums-redux/albums-reducer';

const rootReducer = combineReducers({
    data:artistsReducer,
    albumsData:albumsReducer,
})

export default rootReducer;