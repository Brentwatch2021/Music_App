// import React from 'react'
// import Modal from 'react-bootstrap/Modal'
// import ReactDom from 'react-dom'
// import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
// import Form from 'react-bootstrap/Form'
// import Image from 'react-bootstrap/Image'

// function Music_Modal(props) {
//     if(!props.Showing) return null;

//     let Title = "Create Artist";
//     let children;
//     props.action = "Artist";
//     if(props.action === 'Artist')
//     {

//         children = <FloatingLabel controlId="floatingArtistInput" label="Artist" className='mb-3'>
//         <Form.Control type="text" placeholder="Artist" name='name' />
//         <br></br>
//         <Form.Group controlId="formFile" className='mb-3'>
//         <Form.Control type="file" accept='image/*' id='image-uploader' />
//         <br></br>
//         <Image  fluid/>
//         </Form.Group>
//         </FloatingLabel>;
//     }

//   return ReactDom.createPortal(
//     <Modal show={props.Showing} onHide={props.Cancel}>
//         <Modal.Header closeButton>
//             <Modal.Title>{Title}</Modal.Title> 
//         </Modal.Header>
//         <Modal.Body>
//             { children }
//         </Modal.Body>
//         <Modal.Footer>
//             <div className='btn btn-secondary' onClick={props.Cancel}>Cancel</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <div className='btn btn-primary' onClick={props.Cancel}>Submit</div>
//         </Modal.Footer>
//     </Modal>
//   ,document.getElementById('portal'));
// }

// export default Music_Modal

// import { Button } from '@mui/material';
import React,{useState,useEffect} from 'react'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Modal from 'react-bootstrap/esm/Modal';
import Form from 'react-bootstrap/esm/Form';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select'
import { useDispatch } from 'react-redux';
import { deleteArtist, loadArtists,createArtist,updateArtist } from '../../redux/actions';
// import axios from 'axios'
// import { Card } from '../card/card.component';
// import Container from 'react-bootstrap/esm/Container';

const InitialFieldValues = {
    Name:"",
    // Could use default online image for default
    File_Name: '',
    File_Src:'/Img/default-cover-art',
    File:null
}

function Music_Modal(props)
{
    const axios = require('axios');

    let dispatch = useDispatch();


    // const [modalValues, setModalValues] = useState(initialFieldValues)
    // ModalValues={modalValues} ModalValuesHook={setModalValues}
    const modalType = props.Modal;
    
    const [artists,setArtists] = useState([]);
    const [isArtistsLoaded,setloadingSequence] = useState(false);

    const showPreview = e => {
        if(e.target.files && e.target.files[0])
        {
            let File_Image = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                props.ModalValuesHook({
                    ...props.ModalValues,
                    File_Image,
                    File_Src: x.target.result
                })
            }
            reader.readAsDataURL(File_Image);   
        }
        else
        {
            props.ModalValuesHook(
                {   ...props.ModalValues,
                    File:null,
                    File_Src:"/Img/default-cover-art"
                })
        }
    }


    const handleClose = () => {
        props.VisibilityTrigger(false);
        ResetForm();    
    } 

    const handleSubmit = e => {

        const URL = `http://${props.IP}:3000/${props.Modal}s`

        // axios.post(URL, {
        //     id: Math.random(),
        //     name: props.ModalValues.Name,
        //     cover_URL:''
        // })
        // .then(resp => {
        //     console.log(resp.data);
        //     props.RefreshContent();
        // })
        // .catch(error => {
        //     console.log(error);


        // })

        // REDUX LOGIC does not take into account other type creations
        // NBNB
        //const createArtistt = createArtist({id: Math.random(),name: props.ModalValues.Name,cover_URL:''});
         dispatch(createArtist({id: Math.random(),
             name: props.ModalValues.Name,
             cover_URL:''}));
             props.RefreshContent();

        ResetForm();
        props.VisibilityTrigger(false);
    };

    const handleNameChange = e => {
        const {name,value} = e.target;
        props.ModalValuesHook({
            ...props.ModalValues,
            [name]:value
        })
    };

    const ResetForm = () => {
        props.ModalModeToCreateHook('Create');
        props.ModalValuesHook(InitialFieldValues);
    }

    const handleEdit = e => {
        
        // axios.put(`http://${props.IP}:3000/${props.Modal}s/${props.ModalValues.ID}`, {
        //     id: props.ModalValues.ID,
        //     name: props.ModalValues.Name,
        //     cover_URL:''
        // })
        // .then(resp => {
        //     console.log(resp.data);
        //     props.RefreshContent();
        // })
        // .catch(error => {
        //     console.log(error);
        // })

        // REDUX
        dispatch(updateArtist({
            id: props.ModalValues.ID,
            name: props.ModalValues.Name,
            cover_URL:''
        }));
        props.RefreshContent();

        ResetForm();
        props.VisibilityTrigger(false);
    }

    const mode = props.ModalModeToCreateValue;

    const toptitle = () => {
        if(mode === 'Create')
        {
            return `Create ${props.Modal}`;
        }
        else if(mode === 'Edit')
        {
            return `Edit ${props.Modal}`;
        }
        else if(mode === 'Remove')
        {
            return `Remove ${props.Modal}`;
        }
    }

    let ImageUploadControl =   <Form.Group controlId={'floating' + modalType + 'Input'} className='mb-3'>
                                <Form.Control type="file" accept='image/*' id='image-uploader' onChange={showPreview}/>
                                <br/><br/>
                                <Image src={props.ModalValues.File_Src} fluid/>
                                </Form.Group>
    
    let FloatingLabelControl = <FloatingLabel controlId={'floating' + modalType + 'Input'} label={modalType} className='mb-3'>
                                <Form.Control type="text" placeholder={modalType} name={'Name'} value={props.ModalValues.Name} onChange={handleNameChange}/>
                                </FloatingLabel>

    let dropDownMenu = <FormControl fullWidth>
    <InputLabel id="artist-label">Artist</InputLabel>
    <Select labelId='artist-label' id='artist-label'
    label='Age' >
        {artists}
    </Select>
    </FormControl>;


    if(modalType === 'Album' && !isArtistsLoaded && props.Showing)
    {
        // Load up artists that will be attached to this album
        axios.get(`http://${props.IP}:${props.Port}/artists`)
                                                .then(resp => {
                                                    setloadingSequence(true);
                                                     let Selections = resp.data.map(data => {
                                                             return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                                     })
                                                    setArtists(Selections);
                                                })
                                                .catch(error => console.log(error));
                                
    }

 

    switch(modalType)
    {
        case 'Genre':
        ImageUploadControl = null;
        dropDownMenu = null;
        break;
        case 'Album':
        break;
        case 'Artist':
        dropDownMenu = null;
        break;
        default:
    }

    if(mode === 'Remove')
    {
        FloatingLabelControl = null;
        ImageUploadControl = null;
        FloatingLabelControl = <FloatingLabel controlId={'floating' + modalType + 'Input'} label={'Are you sure you would like to remove this item?'} className='mb-3'>
        </FloatingLabel>;
    }

    const handleRemove = e => {
        // axios.delete(`http://${props.IP}:3000/${props.Modal}s/${props.ModalValues.ID}`, {
        //     id: props.ModalValues.ID,
        //     name: '',
        //     cover_URL:''
        // })
        // .then(resp => {
        //     console.log(resp.data);
        //     props.RefreshContent();
        // })
        // .catch(error => {
        //     console.log(error);
        // })

        dispatch(deleteArtist(props.ModalValues.ID));
        dispatch(loadArtists());

        ResetForm();
        props.VisibilityTrigger(false);
    }


    const SubmitAction = e => {
        if(mode === 'Create')
        {
            handleSubmit();
        }
        else if (mode === 'Edit')
        {
            handleEdit();
        }
        else if(mode === 'Remove')
        {
            handleRemove();
        }
    }

    //ModalModeToCreateValue={theModalModeToCreate} ModalModeToCreateHook={setTheModalModeToCreate}
        
        return (
            <Modal show={props.Showing} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{toptitle()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dropDownMenu}
                    <br/><br/>
                    {FloatingLabelControl}
                    <br/><br/>
                    {ImageUploadControl}
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>{mode === 'Remove' ? 'No' : 'Cancel'}</Button>
                    <Button variant="primary" onClick={SubmitAction}>{mode === 'Remove' ? 'Yes' : 'Save'}</Button>
                </Modal.Footer>
            </Modal>
        );
}

export default Music_Modal;