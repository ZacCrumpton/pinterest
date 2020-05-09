import boardData from './boardData';
import pinData from './pinData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      board.pins = [];
      pinData.getPins(board.id).then((pins) => {
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
          });
          resolve(board);
        }
      });
    })
    .catch((err) => reject(err));
});

export default { getSingleBoardWithPins };
