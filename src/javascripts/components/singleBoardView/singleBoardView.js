import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';


const closeSingleViewEvent = () => {
  utils.printToDom('singleView', '');
  $('#board').removeClass('hide');
  $('#singleView').addClass('hide');
};

const removePin = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  const { boardId } = e.target.closest('.card').dataset;
  pinData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(boardId);
    })
    .catch((err) => console.error('could not delete pin', err));
};

const viewSingleBoard = (uid) => {
  smash.getSingleBoardWithPins(uid)
    .then((singleBoard) => {
      let domString = '';
      domString += '<div class="container d-inline-block text-right mt-5" id="SingleBoardContainer">';
      domString += '<button id="close-single-view" class="btn btn-danger">Close</button>';
      domString += '</div>';
      domString += `<div id="${singleBoard.id}" class="container">`;
      domString += `<h2 id="singleBoardTitle">${singleBoard.description}</h2>`;
      domString += '<h4 id="singleBoarPinsTitle">Your Pins</h4>';
      domString += '<div class="container d-flex flex-wrap">';
      domString += '<div class="row row-cols-1 row-cols-md-3">';
      if (singleBoard.pins) {
        singleBoard.pins.forEach((item) => {
          domString += '<div class=" pinDiv col mb-3">';
          domString += `<div class="card pin-card bg-light mb-3 h-100" id="${item.id}" data-board-id="${singleBoard.id}">`;
          domString += `<div class="card-header">${item.title}</div>`;
          domString += '<div class="card-body">';
          domString += `<img class="pin-image" src="${item.imageUrl}" alt="Title"></img>`;
          domString += `<p class="pinsDescr">${item.description}</p>`;
          domString += '</div>';
          domString += '<button class="btn btn-secondary delete-pin-button"><i class="fas fa-trash-alt"></i></button>';
          domString += '</div>';
          domString += '</div>';
        });
      } else {
        domString += '<h1>You Have No Pins</h1>';
      }
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      utils.printToDom('singleView', domString);
      document.getElementById('close-single-view').addEventListener('click', closeSingleViewEvent);
      $('#singleView').removeClass('hide');
      $('#board').addClass('hide');
      $('.pinDiv').on('click', '.delete-pin-button', removePin);
    })
    .catch((err) => console.error('single board goofed up, hyuck', err));
};

const viewSingleBoardEvent = (e) => {
  const boardid = e.target.closest('.card').id;
  boardData.getBoardById(boardid)
    .then((response) => {
      if ($(e.target).hasClass('delete-board', response)) {
        return;
      }
      const boardId = e.target.closest('.card').id;
      viewSingleBoard(boardId);
    })
    .catch((err) => console.error('problem with singleView', err));
};


export default { viewSingleBoard, viewSingleBoardEvent };
