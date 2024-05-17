const InfoBox = ({ title, count, icon }) => {
  return (
    <div className="xs:p-0 lg:p-2  text-white lg:text-base xs:text-[9px]">
      <div className="flex gap-2 ">
        <div>{title} : </div>
        <div>{count}</div>
        {/* {icon} */}
      </div>
    </div>
  );
};

export default InfoBox;
