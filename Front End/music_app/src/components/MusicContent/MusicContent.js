import React, { useEffect,useState } from 'react'
import Card from '../Card/Card'
import './MusicContent.css'


function MusicContent(props) {

    // const axios = require('axios');
    // let [artists,setArtists] = useState([]);

    // const getArtists = e => {
    //     axios.get('http://localhost:3000/artists')
    //     .then(resp => {
    //         // causing blank white screen investigate
    //         setArtists(resp.data);
    //     })
    //     .catch(error => console.log(error))
    // }

    // useEffect(() => {
    //     getArtists();
    // },[])



  return (
      <div className='m-0'>
        <div className='d-flex overflow-auto flex-column align-items-center overflow-scroll m-5'>
        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Artists' ? 'row custom-music-content-row col-md-11' : 'd-none'} >
        <p className={`text-start bg-white`}>Artists</p>
            <div className='col'>
                <div className='container'> 
                    <div className='row gap-5 p-4 d-flex justify-content-center'>
                        {props.Artists.map(artist => (
                            <Card ItemID={artist.id}  
                                  ModalModeToCreateValue={props.ModalModeToCreateValue}
                                  ModalModeToCreateHook={props.ModalModeToCreateHook} 
                                  ModalValues={props.ModalValues} 
                                  ModalValuesHook={props.ModalValuesHook} 
                                  EditPopupEventTrigger={props.ModalVisibilityTrigger} 
                                  ItemImageSrc='' 
                                  Title={artist.name}/>)    
                        )} 
                    </div>
                </div>
            </div>
        </div>
        
        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Albums' ? 'row custom-music-content-row col-md-11' : 'd-none'}>
        <p className='text-start bg-white'>Albums</p>
        <div className='col'>
        <div className='container'> 
            <div className='row gap-5 p-4 d-flex justify-content-center'>
                {props.Albums.map(album => (
                    <Card ItemID={album.id} ModalValues={props.ModalValues} 
                    ModalValuesHook={props.ModalValuesHook}  Title={album.name} EditPopupEventTrigger={props.ModalVisibilityTrigger}
                    ModalModeToCreateHook={props.ModalModeToCreateHook} ModeTypeHook={props.ModeTypeHook} ModeType='Album'  />)    
                )}
            </div>
        </div>
        </div>
        </div>
        
        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Genres' ? 'row custom-music-content-row col-md-11' : 'd-none'}>
        <p className='text-start bg-white'>Songs</p>
        <div className='col'>
        <div className='container'> 
            <div className='row gap-5 p-4 d-flex justify-content-center'>
                    {props.Songs.map(song => (
                        <Card ModalValues={props.ModalValues} 
                        ModalValuesHook={props.ModalValuesHook}  ItemID={song.id} Title={song.name} ModalModeToCreateHook={props.ModalModeToCreateHook}  EditPopupEventTrigger={props.ModalVisibilityTrigger} ModeTypeHook={props.ModeTypeHook} ModeType='Song'/>        
                    ))}
            
            </div>
        </div>
    </div>
        </div>
        
    </div>
    </div>
  )
}

export default MusicContent