import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardComponent from '../board/board';
import singleBoardView from '../singleBoardView/singleBoardView';

const removeBoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.board-card').id;
  console.error('boardId', boardId);
  boardData.deleteBoard(boardId)
    .then(() => {
      boardComponent.boardMaker();
    })
    .catch((err) => console.error('could not delete board', err));
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  console.error('myuid are you there?', firebase.auth().currentUser);
  boardData.getBoards(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h2>Board</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('board', domString);
      $('body').on('click', '.board-card', singleBoardView.viewSingleBoardEvent);
      $('body').on('click', '.delete-board', removeBoard);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
