const saveContraction = (startTime, endTime) => {
  return {
    type: 'SAVE_CONTRACTION',
    startTime,
    endTime
  };
};

const allowKnocking = () => {
  return {
    type: 'ALLOW_KNOCKING'
  };
};

export {
  allowKnocking,
  saveContraction
};
