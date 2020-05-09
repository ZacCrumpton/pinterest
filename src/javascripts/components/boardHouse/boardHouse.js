import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardComponent from '../board/board';
import singleBoardView from '../singleBoardView/singleBoardView';
import boardModalForm from '../boardModalForm/boardModalForm';

const removeBoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.board-card').id;
  console.error('boardId', boardId);
  boardData.deleteBoard(boardId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((err) => console.error('could not delete board', err));
};

const addBoard = () => {
  const myUid = firebase.auth().currentUser.uid;
  const newBoard = {
    name: $('#board-name').val(),
    description: $('#board-desc').val(),
    uid: myUid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      $('#moadlBodyAddBoard input').val('');
      $('#modalAddBoard').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildBoards();
    })
    .catch((error) => console.error('could not make new board', error));
};

const boardClickInit = () => {
  $('body').on('click', '#button-save-board', addBoard);
  $('body').on('click', '#add-board-button', boardModalForm.showAddBoardForm);
};

const buildBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  console.error('myuid are you there?', firebase.auth().currentUser);
  boardData.getBoards(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<h2>Board</h2>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      domString += '<button id="add-board-button" type="button" class="btn-default add-board-button"><i class="fas fa-calendar-plus"></i></button>';
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

export default { buildBoards, boardClickInit };
