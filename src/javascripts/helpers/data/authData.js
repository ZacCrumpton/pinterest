import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const boardDiv = $('#board');
const logoutBtn = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      boardDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
    } else {
      authDiv.removeClass('hide');
      boardDiv.addClass('hide');
      logoutBtn.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
