import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2 overflow-hidden">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full bg-zinc-900 text-slate-500 w-full"
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 text-white btn-sm sm:btn-md"
      >
        <IoSearchSharp className="sm:w-6 sm:h-6 outline-none w-4 h-4" />
      </button>
    </form>
  );
};
export default SearchInput;
