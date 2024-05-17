import { SearchCheckIcon } from "lucide-react";

const Search = ({ value, onChange }) => {
  return (
    <div className="flex gap-1 p-1 rounded-lg cursor-default">
      <div className="lg:scale-100 xs:scale-75">
        <SearchCheckIcon size={24} />
      </div>
      <input
        type="text"
        className="ml-1 rounded-sm lg:px-2 xs:px-1"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Search;
