import pinData from '../../helpers/data/pinData';

const makePins = () => {
  pinData.getPins()
    .then((response) => console.error('pins got', response.data))
    .catch((err) => console.error('pinsj broke', err));
};

export default { makePins };
