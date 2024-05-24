const InfoBox = ({ title, count, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 text-white bg-gray-700 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-sm lg:text-base">{title}</div>
          <div className="text-xl font-bold lg:text-2xl">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
