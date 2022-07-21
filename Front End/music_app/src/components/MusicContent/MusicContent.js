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

    const [items,setItems] = useState([]);
    const axios = require('axios');

    useEffect(() => { 
                axios.get(`http://localhost:3000/${props.ItemTypeToServe}s`)
            .then(resp => {
                console.log(`This is my data howzit ${resp.data}`);
                // let itemss = resp.data.map((item) => (
                //     // <Card ItemID={item.id}  
                //     // Title={item.name}
                //     // Type='Album'
                //     // Name={item.name}
                //     // />    
                    
                // ));
                let items = resp.data.map(data => {
                    //return <p key={data.id}>{data.name}sda</p>
                    return  <Card ItemID={data.id}  
                     Title={data.name}
                    Type='Album'
                    Name={data.name}
                    />    
                })
                setItems(items);
            })
            .catch(error => {
                console.log(error);
            })
    },[])
    



    let defaultContent = <div className='d-flex overflow-auto flex-column align-items-center overflow-scroll m-5'>
        
                                                        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Artists' ? 'row custom-music-content-row col-md-11' : 'd-none'} >
                                                        <p className={`text-start bg-white`}>Artists</p>
                                                            <div className='col'>
                                                                <div className='container'> 
                                                                    <div className='row gap-5 p-4 d-flex justify-content-center'>
                                                                        {props.Artists !== undefined ? props.Artists.map(artist => (
                                                                            <Card ItemID={artist.id}  
                                                                                ModalModeToCreateValue={props.ModalModeToCreateValue}
                                                                                ModalModeToCreateHook={props.ModalModeToCreateHook} 
                                                                                ModalValues={props.ModalValues} 
                                                                                ModalValuesHook={props.ModalValuesHook} 
                                                                                EditPopupEventTrigger={props.ModalVisibilityTrigger} 
                                                                                ItemImageSrc='' 
                                                                                Title={artist.name}
                                                                                Type='Artist'
                                                                                Name={artist.name}
                                                                                />)    
                                                                        ) : undefined} 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Albums' ? 'row custom-music-content-row col-md-11' : 'd-none'}>
                                                        <p className='text-start bg-white'>Albums</p>
                                                        <div className='col'>
                                                        <div className='container'> 
                                                            <div className='row gap-5 p-4 d-flex justify-content-center'>
                                                                { props.Albums !== undefined ? props.Albums.map(album => (
                                                                    <Card ItemID={album.id} ModalValues={props.ModalValues} 
                                                                    ModalValuesHook={props.ModalValuesHook}  Title={album.name} EditPopupEventTrigger={props.ModalVisibilityTrigger}
                                                                    ModalModeToCreateHook={props.ModalModeToCreateHook} ModeTypeHook={props.ModeTypeHook} ModeType='Album'  
                                                                    Type='Album'
                                                                    Name={album.name}
                                                                    />)    
                                                                ) : undefined}
                                                            </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        
                                                        <div className={props.CurrentFilter === 'All' || props.CurrentFilter === 'Genres' ? 'row custom-music-content-row col-md-11' : 'd-none'}>
                                                        <p className='text-start bg-white'>Songs</p>
                                                        <div className='col'>
                                                        <div className='container'> 
                                                            <div className='row gap-5 p-4 d-flex justify-content-center'>
                                                                    {
                                                                    props.Songs !== undefined ? props.Songs.map(song => (
                                                                        <Card ModalValues={props.ModalValues} 
                                                                        ModalValuesHook={props.ModalValuesHook}  ItemID={song.id} Title={song.name} ModalModeToCreateHook={props.ModalModeToCreateHook}  EditPopupEventTrigger={props.ModalVisibilityTrigger} ModeTypeHook={props.ModeTypeHook} ModeType='Song'   Type='Album'
                                                                        Name={song.name}/>        
                                                                    )) : undefined}
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                        </div>
                                                        
                                                    </div>





       if(props.Type === 'PerItem')
       {
            defaultContent = <div className='container'>
            <div className='row'>
                        <div className='col bg-primary col-xl-12 p-3'>
                            <img className='w-50' src='https://cdn.britannica.com/52/175552-050-3090FE37/Kirk-Hammett-James-Hetfield-Metallica-2013.jpg?w=400&h=300&c=crop'></img>
                            <h1>{props.PerItemName}</h1>
                        </div>
                        {/* <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-secondary'> */}
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-secondary'>
                            {/* d-flex flex-sm-row flex-xl-row justify-content-between p-3 */}
                            <div className='row gap-5 p-4 d-flex justify-content-center'>
                            {items
                                // props.Albums.map((song) => (
                                //     <Card ModalValues={props.ModalValues} 
                                //         ModalValuesHook={props.ModalValuesHook}  ItemID={song.id} Title={song.name} ModalModeToCreateHook={props.ModalModeToCreateHook}  EditPopupEventTrigger={props.ModalVisibilityTrigger} ModeTypeHook={props.ModeTypeHook} ModeType='Song'   Type='Album'
                                //         Name={song.name}/>
                                // ))}
       }                        
                            </div>
                        </div>
            </div>

    </div>
       }                                                                 



  return (
      <div className='m-0'>
        {defaultContent}

    {/* Artist Layout Item View */}
    
    
    </div>

    
  )
}

export default MusicContent