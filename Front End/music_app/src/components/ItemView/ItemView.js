import React, { useEffect,useState } from 'react'
import './ItemView.css'
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Header from '../../components/Header/Header';
import MusicContent from '../MusicContent/MusicContent';

function ItemView(props) {

    
    const { search } = useLocation();
    const { type,name} = queryString.parse(search);
    const [items,setItems] = useState([]);

    let header;
    let content;
    switch(type)
    {
        case 'Artist':
           header  = <Header Type='PerItem' PerItemName={name}/>
           content = <MusicContent ItemTypeToServe='Album' Type='PerItem' PerItemName={name}/>
        break;
        case 'Album':
            header  = <Header Type='PerItem' PerItemName={name}/>
            content = <MusicContent ItemTypeToServe='Song' Type='PerItem' PerItemName={name}/>
        break;
        case 'Song':
            //header  = <Header Type='PerItem' PerItemName={name}/>
            //content = <MusicContent Type='PerItem' PerItemName={name}/>
        break;
    }

    // useEffect(() => {
    //     SetupUpItemView();
    // },[])

    return (
        <div className='d-flex flex-column justify-content-around '>
            {header}
            {content}
        </div>
    );
}

export default ItemView;
