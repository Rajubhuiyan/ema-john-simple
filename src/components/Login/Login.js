import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import { createUserWithEmailAndPasswordd, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPasswordd } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFrameWork()

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }


    const handleBlur = (event) => {

        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            isFieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);

        }
        if (isFieldValid) {
            //[...cart, newCart]
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPasswordd(user.email, user.name, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPasswordd(user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }
        event.preventDefault()
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }

    const handleResponse = (res, handleRedirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (handleRedirect) {
            history.replace(from);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                {
                    user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>
                }<br />
                <button onClick={fbSignIn}>Login using Facebook</button>
                {
                    user.isSignedIn &&
                    <div>
                        <p>Welcome {user.name}</p>
                        <img src={user.photo} alt="" />
                    </div>
                }
                <h1>Self Authenication</h1>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User SignUp</label>
                <form onSubmit={handleSubmit}>
                    {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Enter Your Name" required />}
                    <br />
                    <input onBlur={handleBlur} type="email" name="email" required placeholder='Enter your email' />
                    <br />
                    <input onBlur={handleBlur} type="password" name="password" id="" required placeholder='enter your password' />
                    <br />
                    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                </form>
                {
                    user.success ? <h1 style={{ color: "green" }}>User {newUser ? 'Created' : 'Logged In'} Succes</h1 > : <h1 style={{ color: 'red' }}>{user.error}</h1>
                }
            </div>
        </div>
    );
}

export default Login;
