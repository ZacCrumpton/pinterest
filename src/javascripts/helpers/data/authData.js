import firebase from 'firebase/app';
import 'firebase/auth';

import boardHouse from '../../components/boardHouse/boardHouse';
import singleBoardView from '../../components/singleBoardView/singleBoardView';

const authDiv = $('#auth');
const boardDiv = $('#board');
const pinDiv = $('#pin');
const logoutBtn = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      boardDiv.removeClass('hide');
      pinDiv.removeClass('hide');
      logoutBtn.removeClass('hide');
      boardHouse.buildBoards();
      boardHouse.boardClickInit();
      singleBoardView.pinClickInit();
    } else {
      authDiv.removeClass('hide');
      boardDiv.addClass('hide');
      pinDiv.addClass('hide');
      logoutBtn.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
