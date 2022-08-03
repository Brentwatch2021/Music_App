import * as types from './actionType';

const initialState = {
    artistsFromAPI:{ originalartistsFromAPI:undefined,artistsFromAPI:undefined },
    artistFromAPI:{},
    loading: false
}
// Maybe we can add a class to the redux observer for common actions ActionHelper???
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
        const idthatwasdeleted = action.payload;
        // find and remove by id
        const newRemovedListItem = state.artistsFromAPI.originalartistsFromAPI.filter(a => a.id === idthatwasdeleted);
        const index = state.artistsFromAPI.originalartistsFromAPI.indexOf(newRemovedListItem[0]);
        // returns only one below
        //const newRemovedList = state.artistsFromAPI.originalartistsFromAPI.splice(index,1);
        
         const newRemovedList = state.artistsFromAPI.originalartistsFromAPI.splice(index,state.artistsFromAPI.originalartistsFromAPI.length);

        return {
            ...state,
            artistsFromAPI: {  originalartistsFromAPI:newRemovedList,artistsFromAPI:newRemovedList },
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