import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/chatSlice";
import { randomMessageGenrator, randomNameGenrator } from "../redux/helper";

export default function LiveChat() {
  const message = useSelector((store) => store.chat.message);
  // console.log(message);
  const dispath = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      dispath(
        setMessage({
          name: randomNameGenrator(),
          message: randomMessageGenrator(7),
        })
      );
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className=" py-2">
      {message.map((value, index) => (
        <ChatMessage key={index} value={value}></ChatMessage>
      ))}
    </div>
  );
}
