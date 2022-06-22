import React, { useEffect, useState,useReducer } from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MusicContent from './components/MusicContent/MusicContent';
import Music_Modal from './components/MusicModal/Music_Modal';
import MA_SpeedDial from './components/M_A_Speed_Dial/MA_SpeedDial';
import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDialAction, SpeedDialIcon } from '@mui/material';

const initialFieldValues = {
  Name: "",
  // Could use default online image for default
  File_Name: '',
  File_Src: '/Img/default-cover-art',
  File: null
}

const axios = require('axios');

const reducer = (state, action) => {
  const URL = 'http://localhost:3000/Artists';

  switch(action.type)
  {
    case 'Query_Artists':
    axios.get(URL)
    .then (resp => {
      return { ...state,artists:resp.data,originalArtists:resp.data };
    })
    .catch(err => console.log(err));
    break
    case 'Add New Artist':
    axios.post(URL,action.payload)
    .then(resp => {
      //refreshContent();
      action.payloadRefresh();
    })
    break
    case 'Update Artist':
      axios.put(`${URL}/${action.payload.id}`,action.payload)
      .then(resp => {
        //refreshContent();
        action.payloadRefresh();
      })
    break
    case 'Remove Artist':
      axios.delete(`${URL}/${action.payload.id}`, {
            id: action.payload.id,
            name: '',
            cover_URL:''
        })
        .then(resp => {
            console.log(resp.data);
            action.payloadRefresh();
        })
        .catch(error => {
            console.log(error);
        })
    break
    default:
      throw new Error();
  }
}

const ACTION = {
  QUERY_ARTISTS: 'Query_Artists',
  ADD_NEW_ARTIST: 'Add New Artist',
  UPDATE_ARTIST: 'Update Artist',
  REMOVE_ARTIST: 'Remove Artist',
}

function App() {
  

  const [state,dispatch] = useReducer(reducer,
                                              {
                                                 artists: [],
                                                 originalArtists: [],
                                              });

  const [artistss, setArtists] = useState([]);
  const [originalArtists, setOriginalArtists] = useState([]);

  const [albums, setAlbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);

  const [genres, setGenres] = useState([]);
  const [originalGenres, setOriginalGenres] = useState([]);

  const [songs, setSongs] = useState([]);
  const [originalSongs, setOriginalSongs] = useState([]);


  const [ip, setip] = useState('localhost');
  const [port, setPort] = useState('3000');
  
  const [modalValues, setModalValues] = useState(initialFieldValues);
  const [filterSelected, setActiveFilter] = useState('All');
  const [isModalShowing, setModalShow] = useState(false);
  const [theModalToCreate, setTheModalToCreate] = useState('Artist');
  const [theModalModeToCreate, setTheModalModeToCreate] = useState('Create');

  const actions = [
    { icon: <i class="fa-solid fa-palette"></i>, name: 'Add Artist' },
    { icon: <i class="fa-solid fa-album"></i>, name: 'Add Album' },
    { icon: <i class="fa-solid fa-dna"></i>, name: 'Add Genre' },
    { icon: <i class="fa-solid fa-album-circle-plus"></i>, name: 'Add Song' },
  ];

  const getArtists = e => {
    //dispatch({type:ACTION.QUERY_ARTISTS});
    axios.get(`http://${ip}:${port}/artists`)
      .then(resp => {
        setArtists(resp.data);
        setOriginalArtists(resp.data);
      })
      .catch(error => console.log(error))
  }

  const getAlbums = () => {
    axios.get(`http://${ip}:${port}/albums`)
    .then(resp => {
      setAlbums(resp.data);
      setOriginalAlbums(resp.data);
    })
    .catch(error => console.log(error))
  }

  const getSongs = () => {
    axios.get(`http://${ip}:${port}/songs`)
    .then(resp => {
      setSongs(resp.data);
      setOriginalSongs(resp.data);
    })
    .catch(error => console.log(error))
  }

  const getGenres = () => {
    axios.get(`http://${ip}:${port}/genres`)
    .then(resp => {
      setGenres(resp.data);
      setOriginalGenres(resp.data);
    })
    .catch(error => console.log(error));
  }

  const refreshContent = () => {
    getArtists();
    getAlbums();
    getSongs();
    getGenres();
  }

  useEffect(() => {
   refreshContent();
  }, [])

  const speedDialAction = e => {
    switch (e) {
      case "Add Song":
        setTheModalToCreate('Song');
        setModalShow(true);
        break;
      case "Add Genre":
        setTheModalToCreate('Genre');
        setModalShow(true);
        break;
      case "Add Album":
        setTheModalToCreate('Album');
        setModalShow(true);
        break;
      case "Add Artist":
        setTheModalToCreate('Artist');
        setModalShow(true);
        break;
    }
  }

  //ModalValues={modalValues} ModalValuesHook={setModalValues}
  const Search = (query) => {
    if (query !== "") {
      const filteredArtists = artistss.filter(artist => artist.name.toLowerCase().includes(query.toLowerCase()));
      setArtists(filteredArtists);

      const filteredAlbums = albums.filter(album => album.name.toLowerCase().includes(query.toLowerCase()));
      setAlbums(filteredAlbums);

      const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query.toLowerCase()));
      setSongs(filteredSongs);

    }
    else {
      setArtists(originalArtists);
      setAlbums(originalAlbums);
      setSongs(originalSongs);
    }
  }

  return (
    <div className="App">
      <Header SearchMethod={Search} CurrentFilter={filterSelected} FilterSelector={setActiveFilter} />
      <MusicContent Artists={artistss} Albums={albums} Genres={genres} ModeTypeHook={setTheModalToCreate} Songs={songs} ModalModeToCreateValue={theModalModeToCreate} ModalModeToCreateHook={setTheModalModeToCreate} ModalVisibilityTrigger={setModalShow} CurrentFilter={filterSelected} ModalValues={modalValues} ModalValuesHook={setModalValues} />

      <Footer ShowModalProp={isModalShowing} ShowModalFunc={setModalShow} />



      <SpeedDial ariaLabel='SpeedDial'
        sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
        {
          actions.map(action => {
            return <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={(e) => {
              // e.preventDefault();
              // alert("Yes" + e.action);
              // setModalShow(true);
              speedDialAction(action.name);
            }} />;
          })
        }
      </SpeedDial>
      <Music_Modal Action={ACTION} State={state} Dispatch={dispatch} IP={ip} Port={port} RefreshContent={refreshContent} ModalModeToCreateValue={theModalModeToCreate} ModalModeToCreateHook={setTheModalModeToCreate} Showing={isModalShowing} Modal={theModalToCreate} VisibilityTrigger={setModalShow} ModalValues={modalValues} ModalValuesHook={setModalValues} />
    </div>
  );
}

export default App;
