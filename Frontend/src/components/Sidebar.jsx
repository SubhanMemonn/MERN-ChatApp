import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 sm:p-4 flex flex-col w-[50%]">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
