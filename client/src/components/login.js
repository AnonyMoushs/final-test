import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Axios from 'axios'

const Login = () => {

  Axios.defaults.withCredentials = true

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [isAuthorized, setIsAuthorized] = useState()
  const Navigate = useNavigate()

  const loginInfo = {

    email_address: email,
    password: pass

  }

  const Submit = () => {

    Axios.post("http://localhost:3001/login", loginInfo).then((response) => {

    if(response.data.message === "Login successful") {
      Navigate("/welcome")
    }


    })

  }

  useEffect(() => {

    Axios.get("http://localhost:3001/LoggedIn").then((response) => {

    if(response.data.Message === "Authorized") {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }

    })

  }, [])


  if (isAuthorized) {
    Navigate("/welcome"); 
    return null; 
  }


  
  return (


    <>


      <p>Login</p>

      <div className="form-div">
        <input value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <input value={pass} onChange={(e) => {setPass(e.target.value)}}/>
        <button onClick={Submit}>Login</button>
      </div>

      <Link to='/reg'>Signup</Link>
      


    </>



  )
}

export default Login