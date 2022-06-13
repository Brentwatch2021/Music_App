
import React from 'react'
import ReactDOM  from 'react-dom'

export default function ModalV2({open, children,onClose})
{
    if(!open) return null;

    return (
            <div className='modal' tabIndex='-1'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>im the title</h5>
                            <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                <div className='modal-body'>
                    {children}
            </div>

            <div className='modal-footer'>
                <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
                <button type="button" className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>
    )
}


// const ModalV2 = ({isShowing, hide}) => isShowing ? ReactDOM.createPortal(
// <React.Fragment>
// <div className='modal' tabIndex='-1'>
// <div className='modal-dialog'>
//     <div className='modal-content'>
        
//         <div className='modal-header'>
//             <h5 className='modal-title'>im the title</h5>
//             <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
//         </div>

//         <div className='modal-body'>
//             <p>Modal Content goes here</p>
//         </div>

//         <div className='modal-footer'>
//             <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={hide}>Cancel</button>
//             <button type="button" className='btn btn-primary' data-bs-dismiss="modal">Submit</button>
//         </div>
//     </div>
// </div>
// </div>
// </React.Fragment>,document.body
// ) : null;

// export default ModalV2;