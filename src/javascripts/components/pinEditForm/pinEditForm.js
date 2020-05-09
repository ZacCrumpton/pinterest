import pinData from '../../helpers/data/pinData';
import utils from '../../helpers/utils';

const showEditPinForm = (pinId) => {
  pinData.getPinById(pinId)
    .then((response) => {
      const selectedPin = response.data;
      let domString = '';
      domString += `<form id="modalForm" class="edit-pin-form-tag" data-id="${pinId}">`;
      domString += '<div class="form-group">';
      domString += '<label for="edit-pin-pinTitle">Pin Title</label>';
      domString += `<input type="text" class="form-control" id="edit-pin-pinTitle" aria-describedby="pinTitle" placeholder="Enter Pin Title" value="${selectedPin.pinTitle}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-pin-desc">Last Name</label>';
      domString += `<input type="text" class="form-control" id="edit-pin-desc" aria-describedby="desc" placeholder="Enter Description" value="${selectedPin.description}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-pin-imgUrl">img Url</label>';
      domString += `<input type="text" class="form-control" id="edit-pin-imgUrl" aria-describedby="imgUrl" placeholder="Enter a Image Url" value="${selectedPin.imageUrl}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-pin-credit">Credit</label>';
      domString += `<input type="text" class="form-control" id="edit-pin-credit" aria-describedby="credit" placeholder="Credit original creator" value="${selectedPin.title}">`;
      domString += '</div>';
      domString += '</form>';
      utils.printToDom('modalBodyEditPin', domString);
    })
    .catch((error) => console.error('could not edit the selected crew', error));
};

export default { showEditPinForm };
