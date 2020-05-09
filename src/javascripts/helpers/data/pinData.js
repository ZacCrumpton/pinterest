import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin.json?orderBy="boardid"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((pinId) => {
        demPins[pinId].id = pinId;
        pins.push(demPins[pinId]);
      });
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getPinById = (pinId) => axios.get(`${baseUrl}/pin/${pinId}.json`);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pin/${pinId}.json`);

const addPin = (newPin) => axios.post(`${baseUrl}/pin.json`, newPin);

const updatePin = (pinId, editedPin) => axios.put(`${baseUrl}/pin/${pinId}.json`, editedPin);

export default {
  getPins,
  deletePin,
  getPinById,
  addPin,
  updatePin,
};
