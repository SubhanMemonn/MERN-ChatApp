import ReactScrollToBottom from "react-scroll-to-bottom";
import useGetMessages from "../hooks/useGetMessages.js";
import useListenMessages from "../hooks/useListenMessages.js";
import Message from "./Message.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";

const Messages = () => {
  const { loading, messages } = useGetMessages();

  useListenMessages();

  return (
    <div className="px-4 flex-1 overflow-auto" id="p">
      {!loading ? (
        <ReactScrollToBottom
          className="box-border overflow-hidden h-full"
          id="p"
        >
          {messages.map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </ReactScrollToBottom>
      ) : (
        [...Array(3)].map((i) => <MessageSkeleton key={i} />)
      )}
      {!loading && messages.length == 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
