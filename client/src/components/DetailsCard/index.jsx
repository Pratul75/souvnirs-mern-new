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
    <div className="w-full flex justify-between">
      <div className="w-1/2 bg-teal-400">
        <div className="w-8 h-8 bg-rose-300 rounded-lg"></div>
      </div>
      <div className="w-1/2 bg-purple-500">right</div>
    </div>
  );
};

export default DetailsCard;
