import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MusicContent from './components/MusicContent/MusicContent';
import Music_Modal from './components/MusicModal/Music_Modal';
import MA_SpeedDial from './components/M_A_Speed_Dial/MA_SpeedDial';
import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDialAction, SpeedDialIcon } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ItemView from './components/ItemView/ItemView';

// REDUX
import { useDispatch, useSelector} from 'react-redux';
import { loadArtists, loadFilteredArtists } from './redux/actions';
import { loadAlbums } from './redux/albums-redux/albums-actions';

const initialFieldValues = {
  Name: "",
  // Could use default online image for default
  File_Name: '',
  File_Src: '/Img/default-cover-art',
  File: null
}

function App() {
  const axios = require('axios');

  // REDUX 
  let dispatch = useDispatch();
  const  { artistsFromAPI }  = useSelector(state => state.data);

  // this second selector does not update unable to dispatch multiple actions at once RND
  const { albumsData } = useSelector(state => state.albumsData);
  //const [artists, setArtists] = useState([]);
  //const [originalArtists, setOriginalArtists] = useState([]);

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
    { icon: <i class="fa-solid fa-record-vinyl"></i>, name: 'Add Album' },
    { icon: <i class="fa-solid fa-dna"></i>, name: 'Add Genre' },
    { icon: <i class="fa-solid fa-music"></i>, name: 'Add Song' },
  ];

  const getArtists = e => {
    // axios.get(`http://${ip}:${port}/artists`)
    //   .then(resp => {
    //      setArtists(resp.data);
    //     setOriginalArtists(resp.data);
    //   })
    //   .catch(error => console.log(error))

      // REDUX
      dispatch(loadArtists());

  }

  const getAlbums = () => {
    axios.get(`http://${ip}:${port}/albums`)
    .then(resp => {
      setAlbums(resp.data);
      setOriginalAlbums(resp.data);
    })
    .catch(error => console.log(error))

    
    dispatch(loadAlbums());
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
    // While integrtating Redux into our app I have clearly been a complete dumbass and 
    // now we gotta create do batch dispatches all at once to initate every selector like
    // const  { artistsFromAPI }  = useSelector(state => state.data);
    // and apparentyly each of these need all to be dispatched very lost right now :)
    // Moving over to Redux Toolkit for this reason above.


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
      const filteredArtists = artistsFromAPI && artistsFromAPI.artistsFromAPI.filter(artist => artist.name.toLowerCase().includes(query.toLowerCase()));
      //setArtists(filteredArtists);
      dispatch(loadFilteredArtists(filteredArtists));


      const filteredAlbums = albums.filter(album => album.name.toLowerCase().includes(query.toLowerCase()));
      setAlbums(filteredAlbums);

      const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query.toLowerCase()));
      setSongs(filteredSongs);

    }
    else {
      dispatch(loadFilteredArtists(artistsFromAPI.originalartistsFromAPI));
      //setArtists(originalArtists);
      setAlbums(originalAlbums);
      setSongs(originalSongs);
    }
  }

  return (
    <Router>
    <div className="App">
            <Switch>
          <Route path="/perItemView">
            <ItemView/>
          </Route>
          <Route path="/">
          <Header SearchMethod={Search} CurrentFilter={filterSelected} FilterSelector={setActiveFilter} />
          <MusicContent Artists={artistsFromAPI.artistsFromAPI} Albums={albums} Genres={genres} ModeTypeHook={setTheModalToCreate} Songs={songs} ModalModeToCreateValue={theModalModeToCreate} ModalModeToCreateHook={setTheModalModeToCreate} ModalVisibilityTrigger={setModalShow} CurrentFilter={filterSelected} ModalValues={modalValues} ModalValuesHook={setModalValues} />
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
      <Music_Modal IP={ip} Port={port} RefreshContent={refreshContent} ModalModeToCreateValue={theModalModeToCreate} ModalModeToCreateHook={setTheModalModeToCreate} Showing={isModalShowing} Modal={theModalToCreate} VisibilityTrigger={setModalShow} ModalValues={modalValues} ModalValuesHook={setModalValues} />

          </Route>
        </Switch>
    </div>

    


    </Router>

    
  );
}

export default App;
