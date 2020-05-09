import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import 'bootstrap';
import myNavbar from './components/myNavbar/myNavbar';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
};

init();
