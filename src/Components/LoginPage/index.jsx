import { useState } from 'react'
import "./index.css"
import Cookies from 'js-cookie'
import { useNavigate, Navigate } from 'react-router-dom'

const LoginPage = () => {
    const token = Cookies.get("JWTTOKEN")
    if(token!==undefined){
        return <Navigate to="/" replace />
    }
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [isWrong, setIsWrong] = useState(null);
    const navigate = useNavigate()
    const submit = () => {
        let options = {
            method:"POST",
            body:JSON.stringify({
                "username": userName,
                "password" : passWord
            })
        }
        fetch("https://apis.ccbp.in/login", options)
        .then((response) => response.json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then(({ status, body }) => {
            if (status === 200) {
                Cookies.set("JWTTOKEN", body.jwt_token, { expires: 7 });
                navigate("/", { replace: true });
            } else {
                setIsWrong(true);
            }
        })
        .catch(() => {
            setIsWrong(true);
        });
    }

  return (
    <div className='loginPage'>
        <img src="https://res-console.cloudinary.com/dez8wfcvn/thumbnails/v1/image/upload/v1751608406/SWxsdXN0cmF0aW9uX2ZqZ210aA==/drilldown" />
        <div className='mainLogin'>
            <div className='icon'>
                <img src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751611659/Group_ldfylf.png" />
                <h3>Insta Share</h3>
            </div>
            <div>
                <div className='userSection'>
                    <label>USERNAME</label>
                    <br/>
                    <input onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div className='passSection'>
                    <label>PASSWORD</label>
                    <br/>
                    <input type='password' onChange={(e)=>setPassWord(e.target.value)} />
                </div>
                <div className='error'>
                    {isWrong!=null && isWrong ? <p style={{color:"red"}}>Username or Password is Invalid</p> : ""}
                </div>
                <div className='loginButton'>
                    <button onClick={submit}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage