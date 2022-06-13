import React from 'react'
import './Card.css'

function Card(props) {

  const handleCardEdit = e =>
  {
    // Setup the Modal with the current values
    //ModalValues={props.ModalValues} ModalValuesHook={props.ModalValuesHook}
    // ModalModeToCreateValue={props.ModalModeToCreateValue} ModalModeToCreateHook={props.ModalModeToCreateHook}
    if(props.ModalModeToCreateHook !== undefined)
    {
      props.ModalModeToCreateHook('Edit');
    }
    
    if(props.ModeTypeHook !== undefined)
    {
      props.ModeTypeHook(props.ModeType);
    }
    
    if(props.ModalValuesHook !== undefined)
    {
      props.ModalValuesHook({
        ...props.ModalValues,
        Name:props.Title,
        ID:props.ItemID
      });
    }
    
    if(props.EditPopupEventTrigger !== undefined)
    {
      props.EditPopupEventTrigger(true);
    }
    
    // pass the params to the modal
  }

  const handleCardRemove = e => {
    if(props.ModalModeToCreateHook !== undefined)
    {
      props.ModalModeToCreateHook('Remove');
    }

    if(props.ModalValuesHook !== undefined)
    {
        props.ModalValuesHook({
          ...props.ModalValues,
          ID:props.ItemID
        });
    }

    if(props.ModeTypeHook !== undefined)
    {
      props.ModeTypeHook(props.ModeType);
    }

    if(props.EditPopupEventTrigger !== undefined)
    {
      props.EditPopupEventTrigger(true);
    }
    
  }


  return (
    <div className='col-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 col-xxl-3 W-50 H-25'>
        <div key={props.ItemID + props.Title} ID={props.ItemID} className='card'>
            <div className='card-header bg-light text-primary'>
                <p className='card-title'>{props.Title}</p>    
            </div>    
            <div className='card-body bg-primary'>
                <img className='img-fluid rounded-circle w-75' src={props.ItemImageSrc} alt='test'/>
            </div>
            <button className="bg-primary" onClick={handleCardEdit}> 
              Edit
            </button>
            <button className="bg-secondary" onClick={handleCardRemove}>
              Remove
            </button>
        </div>   
    </div>
  )
}

export default Card