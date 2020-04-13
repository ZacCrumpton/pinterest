import boardData from './boardData';
import pinData from './pinData';

const getSingleBoardWithPins = (boardId) => new Promise((resolve, reject) => {
  boardData.getBoardById(boardId)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      console.error('checking error', boardId.response);
      board.pins = [];
      pinData.getPins(board.id).then((pins) => {
        if (pins) {
          pins.forEach((pin) => {
            board.pins.push(pin);
            console.log('pins?', pin.boardid);
          });
          resolve(board);
          console.error('are you there board data?', board);
        }
      });
      console.error('is smash working properly', boardId);
    })
    .catch((err) => reject(err));
});

export default { getSingleBoardWithPins };
