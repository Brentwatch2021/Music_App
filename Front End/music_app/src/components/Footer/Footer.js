import React from 'react'
import './Footer.css'


function Footer() {
  return (
    <footer>
        <nav className='navbar fixed-bottom navbar-light bg-light'>
            <div className='container-fluid align-content-center justify-content-between'>
                <p>1:45</p>
                <div className='flex-row'>
                        <div className='d-flex justify-content-between media-controls'>
                            <i class="fa-solid fa-shuffle"></i>
                            <i class="fa-solid fa-backward-step"></i>
                            <i className="fa-solid fa-circle-play"></i>
                            <i class="fa-solid fa-forward-step"></i>
                            <i class="fa-solid fa-repeat"></i>
                        </div>
                    <input type='range' className='form-range' id='custom'/>
                    <p>song title</p>
                </div>
                <p>3:56</p>
            </div>
        </nav>
    </footer>
  )
}

export default Footer