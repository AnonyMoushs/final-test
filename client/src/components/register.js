import { Link } from "react-router-dom"
import Axios from 'axios'
import { useState } from "react"

const Register = () => {

  const [name, setName] = useState();
  const [emailAdd, setEmailAdd] = useState();
  const [pass, setPass] = useState();

  const regInfo = {
    full_name: name,
    email_address: emailAdd,
    password: pass
  }

  const SubmitData = () => {

    Axios.post("http://localhost:3001/reg", regInfo).then(() => {

    console.log("success")

    })
    
  }



  return (

    <>
    
    <p>Register</p>

      <div className="form-div">

        <input placeholder="Full Name" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <input placeholder="Email Address" value={emailAdd} onChange={(e) => {setEmailAdd(e.target.value)}}/>
        <input placeholder="Password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
        <button onClick={SubmitData}>Register</button>

      </div>

      <Link to='/'>Login</Link>

    </>

  )
}

export default Register