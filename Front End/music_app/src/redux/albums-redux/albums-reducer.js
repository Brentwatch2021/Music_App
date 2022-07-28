import * as types from './albums-actionType'

const initial_albums_State = {
    albumsFromAPI: {originalAlbumsFromAPI:undefined,albumsFromAPI:undefined},
    loading:false,
}

const albumsReducer = (state = initial_albums_State,action) => {
    switch(action.type)
    {
        case types.GET_ALBUMS:
        return {
            ...state,
            albumsFromAPI: {originalAlbumsFromAPI:action.payload,albumsFromAPI:action.payload},
            loading:false,
        }
        break;
        case types.LOAD_FILTERED_ALBUMS:
        return {
            ...state,
            albumsFromAPI: {originalAlbumsFromAPI:state.albumsFromAPI,albumsFromAPI:action.payload},
            loading:false,
        }
        break;
        case types.CREATE_ALBUM:
        const appendedAlbumList = state.albumsFromAPI.originalAlbumsFromAPI.concat(action.payload);
        return {
            ...state,
            albumsFromAPI: {originalAlbumsFromAPI:appendedAlbumList,albumsFromAPI:appendedAlbumList},
            loading:false,
        }
        break;
        case types.UPDATE_ALBUM:
        const album_to_update = state.albumsFromAPI.filter(a => a.id === action.payload.id);
        if(album_to_update)
        {
            album_to_update.name = action.payload.name;
        }
        return {
            ...state,
            albumsFromAPI: {originalAlbumsFromAPI:state.albumsFromAPI,albumsFromAPI:state.albumsFromAPI},
            loading:false,
        }
        break;
        case types.DELETE_ALBUM:
            return {
                ...state,
                loading:false,
            }
        break;
        default:
            return state;
    }
}

export default albumsReducer;