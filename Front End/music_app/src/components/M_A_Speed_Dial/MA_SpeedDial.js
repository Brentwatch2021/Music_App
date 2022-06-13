import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import useModal from './../UseModalHook/useModal';
import ModalV2 from './../MusicModal/Music_ModalV2'

const actions = [
    {icon:<i class="fa-solid fa-hammer"></i>,name:'Add Artist'},
    {icon:<i class="fa-brands fa-font-awesome"></i>,name:'Add Album'},
    {icon:<i class="fa-solid fa-pencil"></i>,name:'Add Song'},
]

function MA_SpeedDial(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    


    const handleClick = e =>
    {
        setOpen(false);
        const action = e.target.tooltipTitle;
        switch(action)
        {
            case 'Add Artist':
            props.showModalFunc(true);
            //OpenArtistModal();
            break;
            case 'Add Album':

            break;
            case 'Add Song':

            break;
            default:

            break;

        }
    }


    const OpenArtistModal = (e) => {
        //alert("SpeedDial Clicked");
        props.showModal(true);
    }

  return (
    <div>
        <SpeedDial 
            ariaLabel="SpeedDial tooltip example"
            sx={{position: 'fixed',bottom:120,right: 16,'&button':{backgroundColor: 'red !important'}}}
            icon={<i class="fa-solid fa-plus"></i>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            FabProps={{
                sx:{
                    bgcolor:'orange',
                    color:'black',
                    '&:hover': {
                        opacity: '0.5',
                        bgcolor:'orange',
                    },
                    '&:active': {
                        bgcolor:'orange',
                    }
                } 
            }}
            >
                {actions.map(action => {
                    return  <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={OpenArtistModal}/>
                })}
            
            </SpeedDial>
                
            </div>
  )
}

export default MA_SpeedDial