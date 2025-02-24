import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react"; // Add useState
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { X, Trash2 } from "lucide-react"; // Import X icon for close button
import toast from "react-hot-toast";

const ChatContainer = () => {
  // Add state for enlarged image
  const [enlargedImage, setEnlargedImage] = useState(null);
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDeleteMessage = async (messageId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await deleteMessage(messageId);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSent ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isSent
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div
                className={`flex flex-col group relative ${
                  message.text
                    ? `chat-bubble ${
                        isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-200"
                      }`
                    : ""
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setEnlargedImage(message.image)}
                  />
                )}
                {message.text && <p>{message.text}</p>}

                {/* Delete button - only show for sent messages */}
                {isSent && (
                  <button
                    onClick={() => handleDeleteMessage(message._id)}
                    className="absolute -top-2 -right-2 size-6 rounded-full bg-base-300 
                    opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center
                    hover:bg-error hover:text-error-content"
                  >
                    <Trash2 className="size-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />

      {/* Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setEnlargedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
