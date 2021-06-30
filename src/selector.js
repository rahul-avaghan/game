const getItem = (value, data) => {
  return data.find((t) => t.value === value);
};

const sortOrder = (data) => {
  return [...data].sort((a, b) => a.order - b.order);
};

const rightPair = (currentSelection, value, gameData) => {
  return gameData.some(
    (t) => t.value === value && t.key === currentSelection.value
  );
};
export { getItem, sortOrder, rightPair };
