export const getRandomColor = () => {
  const colorArr = [
    "bg-primary",
    "bg-secondary",
    "bg-info",
    "bg-warning",
    "bg-error",
    "bg-accent",
  ];
  // Get a random index from the colorArr
  const randomIndex = Math.floor(Math.random() * colorArr.length);
  // Get the random color using the random index
  const randomColor = colorArr[randomIndex];

  return randomColor;
};

export const convertArrToSelectLabel = (arr) => {
  const result = arr
    .filter((item) => item.parentId[0] === "0")
    .map((item) => ({
      label: item.title,
      value: `${item._id}`,
    }));

  console.log(result);
  return result;
};
