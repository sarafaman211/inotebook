import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    let history = useHistory()
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email , password: credentials.password})
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token', json.authtoken)
            history.push('/')
        }else{
            alert('Fill correct credentials')
        }
    }
    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChange} name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
                </div>
                <button disabled={credentials.email.length <5 || credentials.password.length <4} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
