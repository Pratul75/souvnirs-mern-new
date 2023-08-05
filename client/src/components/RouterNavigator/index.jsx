import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const RouteNavigator = () => {
  const [route, setRoute] = useState("");

  const [toggleSearchInput, setToggleSearchInput] = useState(false);

  const handleInputChange = (e) => {
    setRoute(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      window.location.href = route;
    }
  };

  return (
    <>
      <CiSearch
        onClick={() => setToggleSearchInput((prevState) => !prevState)}
        className="text-3xl cursor-pointer"
      />
      {toggleSearchInput && (
        <div className="form-control flex flex-row items-center gap-4 transition-all ease-in-out duration-150">
          <input
            type="text"
            className="input input-sm input-primary outline-none select-none "
            placeholder="ex- /admin-dashboard"
            value={route}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </>
  );
};

export default RouteNavigator;
