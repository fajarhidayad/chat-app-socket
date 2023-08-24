import { FaSearch, FaPlus, FaChevronUp } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="bg-darkgrey w-[325px] flex flex-col ">
      <nav className="shadow-md flex justify-between items-center px-6 text-white h-20">
        <h3 className="font-bold text-lg">Channels</h3>
        <button className="bg-lightgrey rounded-lg w-10 h-10 flex items-center justify-center">
          <FaPlus />
        </button>
      </nav>

      <section className="py-5 px-6 text-white">
        <div className="flex items-center rounded-lg bg-lightgrey p-3 space-x-2 mb-8">
          <FaSearch />
          <input
            className="bg-transparent focus:outline-0 font-medium w-full flex-1"
            placeholder="Search channel"
          />
        </div>

        <ul>
          <li className="hover:bg-lightgrey/50 px-2 py-3 rounded-lg flex items-center space-x-3 hover:cursor-pointer">
            <span className="bg-lightgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold">
              W
            </span>
            <h3 className="font-bold">Welcome</h3>
          </li>
          <li className="hover:bg-lightgrey/50 px-2 py-3 rounded-lg flex items-center space-x-3 hover:cursor-pointer">
            <span className="bg-lightgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold">
              W
            </span>
            <h3 className="font-bold">Frontend Channel</h3>
          </li>
        </ul>
      </section>

      <div className="mt-auto bg-[#0B090C] px-6 py-3 text-white flex items-center">
        <span className="bg-lightgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold mr-3">
          W
        </span>
        <p>Username</p>
        <button className="ml-auto h-10 w-10 hover:bg-lightgrey flex items-center justify-center rounded-full">
          <FaChevronUp />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
