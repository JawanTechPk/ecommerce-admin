import React, { useState, useEffect } from 'react';
import { UserLoginAction } from '../../store/actions/userAction/UserAuthAction';
import { useDispatch, useSelector } from 'react-redux';
import illustrateImg from '../../images/login-signup-illustrate.png'
import Loader from '../../UIcomponents/loader/loader';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Css from './login.module.css'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const Login = () => {
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false)
    // const [showPassword, setShowOrhide] = useState(false)
    const dispatch = useDispatch();
    const { isLoading, credentialClear } = useSelector((state) => state.userLoginReducer);


    const loginfunc = (e) => {
        e.preventDefault();
        dispatch(UserLoginAction(phoneNumber, password, history))
    }

    useEffect(() => {

        if (credentialClear) {
            setPhoneNumber("");
            setPassword("");
            // dispatch(UserSigupCredentialState())
        }
    }, [credentialClear])

    return (
        <>
            <div className={Css.mainContainer}>
                <ToastContainer />
                <div className={Css.leftContainer}>
                    <div className={Css.innerLeftContainer}>
                        <div className={Css.logo}>
                            <p>RENTING</p>
                        </div>
                        <div className={Css.heading}>
                            <p>WELCOME</p>
                        </div>
                        <form action="" onSubmit={loginfunc}>
                            <div className={Css.inputs}>

                                <label htmlFor="phonenumber">Mobile Number or User Name </label>
                                <br />
                                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="" id="phonenumber" placeholder='Mobile Number or User Name' required />
                                <br />
                                <label htmlFor="password">Password </label>
                                <br />
                                <span>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name="" id="password" placeholder='Enter Your Password' required />
                                    <span className={Css.showOrhide} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ?
                                            <FaRegEye />
                                            :
                                            <FaRegEyeSlash />
                                        }
                                    </span>
                                </span>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        isLoading ?
                                            <Loader /> :
                                            <button type='submit' className={Css.submitBtnStl}>
                                                Login
                                            </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={Css.rightContainer}>
                    <img src={illustrateImg} alt="renting illustrate" />
                </div>

            </div>
        </>
    )
}

export default Login
