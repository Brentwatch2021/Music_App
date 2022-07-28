import * as types from './actionType';

const initialState = {
    artistsFromAPI:{ originalartistsFromAPI:undefined,artistsFromAPI:undefined },
    artistFromAPI:{},
    loading: false
}

const artistsReducer = (state = initialState,action) => {
switch(action.type)
{
    case types.GET_ARTISTS:
    return {
        ...state,
        artistsFromAPI:{ originalartistsFromAPI:action.payload,artistsFromAPI:action.payload },
        loading: false,
    }
    break;
    case types.LOAD_FILTERED_ARTISTS:
    return {
        ...state,
        artistsFromAPI: {  originalartistsFromAPI:state.artistsFromAPI.originalartistsFromAPI,artistsFromAPI:action.payload },
        loading: false,
    }
    case types.DELETE_ARTIST:
        return {
            ...state,
            loading:false,
        }
    break;
    case types.CREATE_ARTIST:
        const appendedItemToOriginalList = state.artistsFromAPI.originalartistsFromAPI.concat(action.payload);
        return {
            ...state,
            loading:false,
            artistFromAPI: { originalartistsFromAPI:appendedItemToOriginalList,artistsFromAPI:appendedItemToOriginalList }
        }
    break;
    case types.UPDATE_ARTIST:
        // add item back to Array must be cleaner way to this for now its a hack
        const itemToUpdate = state.artistsFromAPI.originalartistsFromAPI.filter(a => a.id === action.payload.id);
        if(itemToUpdate && itemToUpdate[0])
        {
            itemToUpdate[0].name = action.payload.name;
        }
        return {
            ...state,
            loading:false,
            artistFromAPI: { originalartistsFromAPI:state.artistsFromAPI.originalartistsFromAPI,artistsFromAPI:state.artistsFromAPI.originalartistsFromAPI }
        }
        // remove item
        // add new item
        
        // return {
        //     ...state,
        //     loading:false,
        //     artistsFromAPI: { originalartistsFromAPI:appendedItemToOriginalList,artistsFromAPI:appendedItemToOriginalList }
        // }
    break;
    default:
    return state;
    
}
}

export default artistsReducer;