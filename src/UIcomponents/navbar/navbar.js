import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Css from './navbar.module.css'
import { logoutUser } from '../../store/actions/userAction/UserAuthAction'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../UIcomponents/loader/loader";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.userLoginReducer);
  const logout = () => {
    dispatch(logoutUser(history))
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={Css.navbar}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className={Css.logoText} onClick={() => history.push('/')}>
            Renting
          </Typography>
              {
                isLoading ?
                  <Loader />
                  :
                  <div className={Css.loginButton} onClick={() => logout()}>Logout</div>
              }
           
        </Toolbar>
      </AppBar>
    </Box>
  );
}
