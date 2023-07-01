const DetailsCard = ({
  label,
  amount,
  total,
  current,
  color,
  percentage,
  icon,
}) => {
  return (
    <div className="w-full rounded-xl flex justify-between ">
      <div className="w-1/2 p-4 bg-teal-400 flex flex-col"></div>
      <div className="w-1/2 bg-purple-500 flex flex-col">right</div>
    </div>
  );
};

export default DetailsCard;
