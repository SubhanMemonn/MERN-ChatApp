import useGetConversation from "../hooks/useGetConversation.js";
import Conversation from "./Conversation.jsx";
import { getRandomEmoji } from "../utils/emojis.js";
const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  return (
    <div className="py-2 flex flex-col overflow-y-auto" id="p">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading && <span className=" loading loading-spinner"></span>}
    </div>
  );
};
export default Conversations;
