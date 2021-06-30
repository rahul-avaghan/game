function shuffleArray(data) {
  return [...data].sort(() => Math.random() - 0.5);
}

function transformData(inputData) {
  const gameData = [];
  let currentOrder = 0;
  Object.keys(inputData).forEach((item, index) => {
    gameData.push({
      key: item,
      value: inputData[item],
      order: currentOrder++
    });

    gameData.push({
      key: inputData[item],
      value: item,
      order: currentOrder++
    });
  });

  return shuffleArray(gameData);
}
export { transformData };
