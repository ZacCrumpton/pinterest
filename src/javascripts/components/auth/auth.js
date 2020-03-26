import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  console.error('something happened >_>');
};

const loginButton = () => {
  const domString = '<button id="googleAuth" class="btn btn-danger">Google Login</button>';
  utils.printToDom('auth', domString);
  $('#googleAuth').click(signMeIn);
};

export default { loginButton };
