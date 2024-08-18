import './Home.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// landing component first load of app
const Home = () => {
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to='generic'><b>Default Search</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='fetchAll'><b>Load All Stock</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='multiple'><b>Get Multiple Stock</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='single-api'><b>Search With Single Api</b></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
