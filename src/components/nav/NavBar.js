import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = ({ token, setToken }) => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" /> <h1 className="title is-4">Rare Publishing</h1>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token
              ?
              <>
                <Link to="/posts/all" className="navbar-item">All Posts</Link>
                <div className="navbar-item">
                  <Link to="/posts/myPosts" className="navbar-item">My Posts</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/categories" className="navbar-item">Category Manager</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/tags" className="navbar-item">Tag Manager</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/users" className="navbar-item">Users</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/newPost" className="navbar-item">New Post</Link>
                </div>
                {/* add link to UserList view */}
              </>
              : ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    history.push('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
