
import './Header.scss';
import './Header.css';
import {useHistory} from 'react-router-dom';

function Header(props) {

  let history = useHistory();
  let defaultHeader;

  const handleSearchInputValueChanged = e => {
    e.preventDefault();
    props.SearchMethod(e.target.value);
  }

  const FilterClicked = e => {

    if(e.target.name === props.CurrentFilter)
    {
      props.FilterSelector('All');
    }
    else
    {
      props.FilterSelector(e.target.name);
    }
  }

  

  


  switch(props.Type)
  {
    case 'PerItem':
    defaultHeader = <div className='navbar fixed-top text-primary justify-content-around'>
                      <div className=''><button onClick={() => history.goBack()}><h1><i className="fas fa-arrow-alt-circle-left"></i></h1></button></div>
                      <p></p>
                    </div>;
    break;
    default:
      defaultHeader = <nav className='navbar fixed-top navbar-light bg-light bg-transparent'>
      <div className='container-fluid justify-content-center'>
        <form className='d-flex flex-column'>
          <input className='form-control ml-2' type='search' placeholder='Search Artists,Albums and Songs' aria-label='Search' onChange={handleSearchInputValueChanged}/>
          &nbsp;
          <div className='container'>
            <div className='btn-group btn-group-toggle' data-toggle="buttons">
            <label className={props.CurrentFilter === 'All' ? 'pill_filter pill_filter_active text-dark' : 'pill_filter text-dark'}>
              <input type="radio" name="All" id="all" autoComplete='off' onClick={FilterClicked}/>All
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
              <label className={props.CurrentFilter === 'Artists' ? 'pill_filter pill_filter_active text-dark' : 'pill_filter text-dark'}>
                <input type="radio" name="Artists" id="artist" autoComplete='off' onClick={FilterClicked}/>Artists
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <label className={props.CurrentFilter === 'Albums' ? 'pill_filter pill_filter_active text-dark' : 'pill_filter text-dark'}>
                <input type="radio" name="Albums" id="albums" autoComplete='off' onClick={FilterClicked} />Albums
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <label className={props.CurrentFilter === 'Genres' ? 'pill_filter pill_filter_active text-dark' : 'pill_filter text-dark'}>
                <input type="radio" name="Genres" id="genres" autoComplete='off' onClick={FilterClicked}/>Songs
              </label>
            </div>
          </div>  
        </form>
      </div>
    </nav>
    break;

  }

  
  







  return (
    <header>
      {defaultHeader}
    </header>
  );
}

export default Header;

