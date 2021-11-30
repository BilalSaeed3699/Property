import Cookies from 'js-cookie'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const history = useHistory()

  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [alert, setAlert] = React.useState(false)
  const [alert2, setAlert2] = React.useState(false)
  const [msg, setMsg] = React.useState('Please enter password')
  const [msg1, setMsg1] = React.useState('Please enter username')
  async function handleLogin() {
    setAlert2(false)
    setAlert(false)
    if ((username =="" && password == "")||(username ==null && password == null)||(username =="" && password == null)||(username ==null && password == "")) {
      setMsg1('Please enter username')
      setMsg('Please enter password')
      setAlert(true)
      setAlert2(true)
    }
    if (username == "" || username ==null) {
      setAlert(true)
    } else setAlert(false)
    if (password == "" || password == null) {
      setMsg('Please enter password')
      setAlert2(true)
    } 
   
    else {
     
      if (password != 'nwlt2021') {
        setMsg('Incorrect password')
        setAlert2(true)
        return
      }
      if(username !="" && username!=null)
      {
      Cookies.set('username', username)
      history.push('/')
      }
      else
      {
        setMsg1('Please enter username')
        setAlert(true)
      }
    }
  }
  return (
    <div class="login-wrapper">
      <div class="logo-section">
        { <h2><img src="assets/img/logo.png" alt="Logo" /></h2> }
      </div>

      <div class="login-box">
        <h5>Welcome</h5>
        <h3 class="text-center">Login into your account</h3>
        <form class="mt-5">
          <div class="form-group">
            <label>
              Email address{' '}
              {alert && (
                <span style={{ color: 'red' }}>{msg1}</span>
              )}
            </label>
            <input
              type="email"
              value={username}
              class="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>
              Password {alert2 && <span style={{ color: 'red' }}>{msg}</span>}
            </label>
            <input
              type="password"
              class="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class="form-group text-right mt-4 w-100">
            <a class="btn btn-secondary" onClick={handleLogin}>
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}