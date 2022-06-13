import React from 'react'
import MA_SpeedDial from '../M_A_Speed_Dial/MA_SpeedDial'
import './Footer.css'
import Button from 'react-bootstrap/Button'

const music_Nav =  <nav className='navbar fixed-bottom navbar-light gradient m-0 p-0 vh-20 bg-transparent'>
<div className='row container-fluid'>
    <div className='col-2 d-none d-md-block'>
        <div className='d-flex'>
            <span>album Name</span>
            &nbsp;
            <img className='img-fluid w-25 rounded-circle' src='https://robohash.org/2?set=set2&size=400x400' alt='test'/>
        </div>
    </div>
    <div className='col-12 col-sm-12 col-md-4'>
        <div className='d-flex justify-content-center align-content-center flex-column'>
            <div className='d-flex justify-content-around media-controls'>
                <i className="fa-solid fa-shuffle"></i>
                <i className="fa-solid fa-backward-step"></i>
                <i className="fa-solid fa-circle-play"></i>
                <i className="fa-solid fa-forward-step"></i>
                <i className="fa-solid fa-repeat"></i>
            </div>
            <div className='d-flex'>
                <span>1:45</span>
                <input type='range' className='form-range' id='custom'/>
                <span>3:56</span>
            </div> 
            <p>song title</p>
        </div>
    </div>
    <div className='col-2 d-none d-md-flex'>
        <i class="fa-solid fa-volume-high"></i>
        &nbsp;
        &nbsp;
        &nbsp;
        <input type='range' className='form-range' id='custom'/>
    </div>
</div>

</nav>;

function Footer(props) {

  return (
    <footer>
    
    </footer>
  )
}

export default Footer