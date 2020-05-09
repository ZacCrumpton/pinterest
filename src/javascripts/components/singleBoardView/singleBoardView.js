import 'bootstrap';

import smash from '../../helpers/data/smash';
import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import pinModalForm from '../pinModalForm/pinModalForm';
import pinEdit from '../pinEditForm/pinEditForm';


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

const makePin = () => {
  const boardid = $('.pin-card').data('board-id');
  const title = $('.pinDiv').attr('id');
  const newPin = {
    boardid,
    credit: $('#pin-credit').val(),
    description: $('#pin-desc').val(),
    imageUrl: $('#pin-imgUrl').val(),
    pinTitle: $('#pin-pinTitle').val(),
    title,
  };
  pinData.addPin(newPin)
    .then(() => {
      $('#modalBodyAddPin input').val('');
      $('#modalAddPin').modal('hide');
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(boardid);
      // eslint-disable-next-line no-use-before-define
    })
    .catch((error) => console.error('could not add new pin', error));
};

const editPin = (e) => {
  e.preventDefault();
  const pinId = e.target.closest('.pin-card').id;
  $('#modalEditPin').modal('show');
  pinEdit.showEditPinForm(pinId);
};

const updatePin = () => {
  const pinId = $('.edit-pin-form-tag').data('id');
  const boardid = $('.pin-card').data('board-id');
  const title = $('.pinDiv').attr('id');
  const editedPin = {
    boardid,
    credit: $('#edit-pin-credit').val(),
    description: $('#edit-pin-desc').val(),
    imageUrl: $('#edit-pin-imgUrl').val(),
    pinTitle: $('#edit-pin-pinTitle').val(),
    title,
  };
  pinData.updatePin(pinId, editedPin)
    .then(() => {
      $('#modalEditPin').modal('hide');
      // eslint-disable-next-line no-use-before-define
      viewSingleBoard(boardid);
    })
    .catch((error) => console.error('could not update the pin', error));
};

const viewSingleBoard = (uid) => {
  smash.getSingleBoardWithPins(uid)
    .then((singleBoard) => {
      let domString = '';
      domString += '<div class="d-inline-block text-right mt-5" id="singleBoardContainer">';
      domString += '<button id="close-single-view" class="btn btn-danger">Close</button>';
      domString += '<button id="add-pin-button" type="button" class="btn-default add-pin-button"><i class="fas fa-calendar-plus"></i></button>';
      domString += '</div>';
      domString += `<div id="${singleBoard.id}" class="board-container container bg-dark">`;
      domString += `<h2 class="text-light" id="singleBoardTitle">${singleBoard.description}</h2>`;
      domString += '<h4 id="singleBoardPinsTitle" class="text-light">Your Pins</h4>';
      domString += '<div class="container d-flex flex-wrap space-evenly">';
      domString += '<div class="">';
      if (singleBoard.pins) {
        singleBoard.pins.forEach((item) => {
          domString += `<div id="${item.title}" class="pinDiv col-3">`;
          domString += `<div class="card pin-card bg-light" id="${item.id}" data-board-id="${item.boardid}">`;
          domString += `<div class="card-header">${item.pinTitle}</div>`;
          domString += '<div class="card-body">';
          domString += `<img class="pin-image" src="${item.imageUrl}" alt="Title"></img>`;
          domString += `<p class="pinsDescr">${item.description}</p>`;
          domString += '</div>';
          domString += '<button type="button" class="edit-pin-button col-4 btn-default btn-lg glowing"><i class="fas fa-feather-alt"></i></button>';
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
      console.log('remove the pin', removePin);
    })
    .catch((err) => console.error('single board goofed up, hyuck', err));
};

const clickInit = () => {
  $('body').on('click', '#button-save-pin', makePin);
  $('body').on('click', '.edit-pin-button', editPin);
  $('body').on('click', '#button-save-edit-pin', updatePin);
  $('body').on('click', '#add-pin-button', pinModalForm.showAddPinForm);
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


export default { viewSingleBoard, viewSingleBoardEvent, clickInit };
