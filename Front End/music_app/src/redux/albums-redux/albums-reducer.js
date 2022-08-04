import * as types from './albums-actionType'

const initial_albums_State = {
    albumsFromAPI: {originalAlbumsFromAPI:undefined,albumsFromAPI:undefined},
    loading:false,
}

const albumsReducer = (state = initial_albums_State,action) => {
    // Perhaps we can make the axios calls before @@redux/INITk.y.h.b.o 
    // action

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
        if(album_to_update ?? album_to_update[0])
        {
            album_to_update[0].name = action.payload.name;
        }
        return {
            ...state,
            albumsFromAPI: {originalAlbumsFromAPI:state.albumsFromAPI,albumsFromAPI:state.albumsFromAPI},
            loading:false,
        }
        break;
        case types.DELETE_ALBUM:
            const albumToDelete = state.originalAlbumsFromAPI.filter(a => a.id === action.payload);
            const indexOfAlbum = state.originalAlbumsFromAPI.indexOf(albumToDelete);
            const newRemovedListAlbums = state.originalAlbumsFromAPI.splice(indexOfAlbum,state.originalAlbumsFromAPI.length);
            return {
                ...state,
                albumsFromAPI: {originalAlbumsFromAPI:newRemovedListAlbums,albumsFromAPI:newRemovedListAlbums},
                loading:false,
            }
        break;
        default:
            return state;
    }
}

export default albumsReducer;