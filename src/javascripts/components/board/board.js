const boardMaker = (board) => {
  let domString = '';
  domString += '<div class="card">';
  domString += `<div class="card-header">${board.name}</div>`;
  domString += '<div class="card-body">';
  domString += '<h5 class="card-title">Title Here</h5>';
  domString += `<p class="card-text">${board.description}</p>`;
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { boardMaker };
