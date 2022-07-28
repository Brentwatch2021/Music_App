import * as types from './actionType';
import axios from 'axios';

const getArtists = (artistsFromAPI) => ({
    type: types.GET_ARTISTS,
    payload:artistsFromAPI,
})

const getFilteredArtists = (filteredArtists) => (
    {
        type: types.LOAD_FILTERED_ARTISTS,
        payload: filteredArtists,
    }
)

const artistDeleted = () => ({
    type:types.DELETE_ARTIST
})

const artistCreated = (artistCreatedItem) => ({
    type:types.CREATE_ARTIST,
    payload:artistCreatedItem,
})

const artistUpdated = (artistUpdatedItem) => ({
    type:types.UPDATE_ARTIST,
    payload:artistUpdatedItem,
})

//const API_URI = process.env.MUSIC_API;
const API_URI = 'http://localhost:3000/';

export const updateArtist = (artistToUpdate) => {
    return function(dispatch)
    {
        axios.put(`${API_URI}Artists/${artistToUpdate.id}`,artistToUpdate)
        .then(resp => {   
            dispatch(artistUpdated(artistToUpdate));
        })
        .catch(error => console.log(error));
    }
}


export const createArtist = (artist) => {
    return function(dispatch)
    {
        axios.post(`${API_URI}Artists`,artist)
        .then(resp => {
            console.log(resp);
            dispatch(artistCreated(artist));
        })
        .catch(error => console.log(error));
    }
}


export const loadArtists = () => {
    return function(dispatch)
    {
        // Unable to access process investigate
        //axios.get(`${process.env.MUSIC_API}Artists`)

        // integrate extra var for original artists for search originalArtists

        axios.get(`${API_URI}Artists`)
        .then(resp => {
            console.log("Howzit im coming from the backend" + resp);
            dispatch(getArtists(resp.data));
        })
        .catch(error => console.log(error))
    }
}

export const loadFilteredArtists = (filteredArtists) => {
    return function(dispatch)
    {
        dispatch(getFilteredArtists(filteredArtists));
    }
}

export const deleteArtist = (id) => {
    return function(dispatch)
    {
        // Unable to access process investigate
        //axios.get(`${process.env.MUSIC_API}Artists`)

        // integrate extra var for original artists for search originalArtists

        axios.delete(`${API_URI}Artists/${id}`)
        .then(resp => {
            console.log("Just Deleted this item with ID:");
            dispatch(artistDeleted());
        })
        .catch(error => console.log(error))
    }
}



// export const CreateArtist = (newArtist) => {
//     return function(dispatch)
//     {
//         // Make API Call

//         //



//         dispatch(createArtist(newArtist));
//     }
// }