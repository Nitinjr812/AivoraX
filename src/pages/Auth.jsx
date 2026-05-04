import { useState } from "react"


const Auth = () => {
    const [user, setuser] = useState({})
    const signup = (e) => {
        setuser({
            ...user, [e.target.name]: e.target.value
        })
        console.log(user)
    }
    return (
        <>
            <div className="container">
                <div className="forms">
                    <input type="text" name="name" onChange={signup} placeholder="enter name " autoComplete="none" />
                    <input type="email"  onChange={signup}   name="email" id="" />
                    <input type="password"  onChange={signup}   name="password" id="" />

                    <button>Signup</button>
                </div>
            </div>
        </>
    )
}

export default Auth
