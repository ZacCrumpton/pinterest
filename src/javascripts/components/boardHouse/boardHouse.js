import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardComponent from '../board/board';

// const singleBoardView = (e) => {
//   const boardUid = e.target.closest('.card').id;
//   const selectedBoard = getBoards.find((x) => boardUid === x.id);
//   let domString = '';
//   domString += '<div class="card>';
//   domString += `<div class="card-header">${selectedBoard.name}</div>`;
//   domString += '<div class="d-flex justify-content-center" id="single-view">';
//   domString += '<div class="row">';
//   domString += '</div>';
//   utils.printToDom();
//   utils.printToDom('board', domString);
// };

const removeBoard = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.board-card').id;
  console.error('boardId', boardId);
  boardData.deleteBoard(boardId)
    .then(() => {
      boardComponent.boardMaker();
    })
    .catch((err) => console.error('could no delete board', err));
};

const buildBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h2>Board</h2>';
      domString += '<div class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardComponent.boardMaker(board);
      });
      domString += '</div>';
      utils.printToDom('board', domString);
      $('body').on('click', '.delete-board', removeBoard);
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
