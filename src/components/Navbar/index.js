import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Navbar = props => {
  const onLogoutWeb = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <div className="link">
        <Link to="/">
          <p className="text">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="text">Jobs</p>
        </Link>
      </div>
      <button type="button" onClick={onLogoutWeb} className="logout">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Navbar)
