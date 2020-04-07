import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const boardMaker = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardData.getBoards(myUid)
    .then((boards) => {
      let domString = '';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += `<div class="card board-card" id="${board.id}">`;
        domString += `<div class="card-header">${board.name}</div>`;
        domString += '<div class="card-body">';
        domString += '<h5 class="card-title">Title Here</h5>';
        domString += `<p class="card-text">${board.description}</p>`;
        domString += '<button class="btn btn-danger delete-board"><i class="fas fa-cut"></i></button>';
        domString += '</div>';
        domString += '</div>';
      });
      domString += '</div>';
      utils.printToDom('board', domString);
      utils.printToDom('singleBoardView', '');
    })
    .catch((err) => console.error('board broke', err));
};

export default { boardMaker };
