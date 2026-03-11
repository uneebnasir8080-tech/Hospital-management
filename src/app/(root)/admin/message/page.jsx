import ChatScreen from "@/components/ChatScreen";
import Message from "@/components/Message";
import React from "react";

const MessagePage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px] mb-6">
      <div className="lg:w-[380px] h-full"> 
        <Message/>
      </div>
      <div className="flex-1 h-full">
        <ChatScreen/>
      </div>
    </div>
  );
};

export default MessagePage;
