import utils from '../../helpers/utils';

const makePins = (item) => {
  let domString = '';
  domString += '<div class=" pinDiv col mb-3">';
  domString += `<div class="card pin-card bg-light mb-3 h-100" id="${item.id}" data-board-id="">`;
  domString += `<div class="card-header">${item.title}</div>`;
  domString += '<div class="card-body">';
  domString += `<img class="pin-image" src="${item.imageUrl}" alt="Title"></img>`;
  domString += `<p class="pinsDescr">${item.description}</p>`;
  domString += '</div>';
  domString += '<button class="btn btn-secondary delete-pin-button"><i class="fas fa-trash-alt"></i></button>';
  domString += '</div>';
  domString += '</div>';
  utils.printToDom('singleView', domString);
};

export default { makePins };
