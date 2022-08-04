import * as types from './albums-actionType'

import axios from 'axios'

const getAlbums = (albumsFromAPI) => (
    {
        type: types.GET_ALBUMS,
        payload:albumsFromAPI
    });

const getFilteredAlbums = (filteredAlbums) => (
    {
        type: types.LOAD_FILTERED_ALBUMS,
        payload: filteredAlbums,
    });

const albumDeleted = (id) => ({
    type:types.DELETE_ALBUM,
    payload:id,
});

const albumCreated = (albumCreatedItem) => ({
    type:types.CREATE_ALBUM,
    payload:albumCreatedItem,
});

const albumUpdated = (albumUpdatedItem) => ({
    type:types.UPDATE_ALBUM,
    payload:albumUpdatedItem,
});

const API_URI = 'http://localhost:3000/';

export const loadAlbums = () => {
    return function(dispatch)
    {
        axios.get(`${API_URI}Albums`)
        .then(resp => {
            dispatch(getAlbums(resp.data));
    })
    .catch(error => console.log(error));
    }
    
}

export const loadFilteredAlbums = (filteredAlbums) => {
    return function(dispatch)
    {
        dispatch(getFilteredAlbums(filteredAlbums));
    }
}

export const deleteAlbum = (id) => {
    return function(dispatch)
    {
        axios.delete(`${API_URI}Albums/${id}`)
        .then(resp => {
            dispatch(albumDeleted(id));
        })
    }
}; 

export const createAlbum = (albumCreated) => {
    return function(dispatch)
    {
        axios.post(`${API_URI}Albums`,albumCreated)
        .then(resp => {
            dispatch(albumCreated(albumCreated));
        })
        .catch(error => console.log(error));
    }
}

export const updateAlbum = (albumUpdatedItem) => {
    return function(dispatch)
    {
        axios.put(`${API_URI}Albums/${albumUpdatedItem.id}`)
        .then(resp => {
            dispatch(albumUpdated(albumUpdatedItem));
        })
        .then(error => console.log(albumUpdated));
    }
}