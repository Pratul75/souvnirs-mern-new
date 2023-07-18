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

export const getStatusStyles = (status) => {
  switch (status) {
    case "ACTIVE":
      return (
        <p className="flex justify-center rounded-full p-2 border-2 border-emerald-500 bg-emerald-900 font-bold w-20">
          Active
        </p>
      );

    case "PENDING":
      return (
        <p className="px-1 py-2 border-2 border-yellow-500 bg-yellow-400">
          PENDING
        </p>
      );

    default:
      return (
        <p className="flex justify-center rounded-full p-2 border-2 border-rose-500 bg-rose-900 font-bold w-28">
          DEACTIVE
        </p>
      );
  }
};
