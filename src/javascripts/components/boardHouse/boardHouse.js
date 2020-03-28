import boardData from '../../helpers/data/boardData';
import utils from '../../helpers/utils';
import boardComponent from '../board/board';

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
    })
    .catch((err) => console.error('get boards broke', err));
};

export default { buildBoards };
