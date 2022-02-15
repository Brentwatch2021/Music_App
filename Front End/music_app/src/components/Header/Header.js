
import './Header.scss';
import './Header.css';

function Header(props) {


  

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


  return (
    <header>
          <nav className='navbar fixed-top navbar-light bg-light'>
            <div className='container-fluid justify-content-center'>
              <form className='d-flex flex-column'>
                <input className='form-control me-2' type='search' placeholder='Search Artists, Albums etc' aria-label='Search'/>
                &nbsp;
                <div className='container'>
                  <div className='btn-group btn-group-toggle' data-toggle="buttons">
                    <label className={props.CurrentFilter === 'All' ? 'pill_filter pill_filter_active' : 'pill_filter'}>
                      <input type="radio" name="All" id="all" autoComplete='off' onClick={FilterClicked}/>All
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label className={props.CurrentFilter === 'Artists' ? 'pill_filter pill_filter_active' : 'pill_filter'}>
                      <input type="radio" name="Artists" id="artist" autoComplete='off' onClick={FilterClicked}/>Artists
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label className={props.CurrentFilter === 'Albums' ? 'pill_filter pill_filter_active' : 'pill_filter'}>
                      <input type="radio" name="Albums" id="albums" autoComplete='off' onClick={FilterClicked} />Albums
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label className={props.CurrentFilter === 'Genres' ? 'pill_filter pill_filter_active' : 'pill_filter'}>
                      <input type="radio" name="Genres" id="genres" autoComplete='off' onClick={FilterClicked}/>Genres
                    </label>
                  </div>
                </div>  
              </form>
            </div>
          </nav>
    </header>
  );
}

export default Header;

