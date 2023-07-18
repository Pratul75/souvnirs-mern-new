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
      return <div className="badge badge-accent font-bold">ACTIVE</div>;

    case "PENDING":
      return <div className="badge badge-secondary font-bold">PENDING</div>;

    default:
      return <div className="badge badge-error font-bold">DEACTIVE</div>;
  }
};
