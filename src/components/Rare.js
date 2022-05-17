import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'))
  const [staff, setStaffState] = useState(localStorage.getItem('staff'))

  const setToken = (newToken, is_staff) => {
    localStorage.setItem('token', newToken)
    setTokenState(newToken)
    localStorage.setItem('staff', is_staff)
    setStaffState(is_staff)
  }


  return <>
    {
      token
        ?
        <Route>
          <NavBar token={token} setToken={setToken} />
          <ApplicationViews />
        </Route>
        :
        <Redirect to="/login" />
    }

    <Route exact path="/login" >
      <NavBar token={token} setToken={setToken} />
      <Login token={token} setToken={setToken} />
    </Route>

    <Route path="/register" exact>
      <NavBar token={token} setToken={setToken} />
      <Register token={token} setToken={setToken} />
    </Route>

  </>
}
