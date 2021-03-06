const boardMaker = (board) => {
  let domString = '';
  domString += `<div class="card board-card col-3 m-1" id="${board.id}">`;
  domString += `<div class="card-header">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">${board.description}</h5>`;
  domString += '<button class="btn btn-danger delete-board"><i class="fas fa-cut"></i></button>';
  domString += '</div>';
  domString += '</div>';
  // utils.printToDom('board', domString);
  return domString;
};

export default { boardMaker };
