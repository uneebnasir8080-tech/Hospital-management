import ChatScreen from "@/components/ChatScreen";
import Message from "@/components/Message";
import React from "react";

const MessagePage = () => {
  return (
    <div className="flex flex-5 gap-3 h-full">
      <div className="lg:flex-1"> 
        <Message/>
      </div>
      <div className="flex-2 bg-white rounded-t-xl">
        <ChatScreen/>
      </div>
    </div>
  );
};

export default MessagePage;
