import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

export default function ChatMessage({ value }) {
  const chennalLogo = useSelector((store) => store.app.channelLogo);
  return (
    <div>
      <div className=" flex gap-1 my-2 items-center">
        <Avatar src={chennalLogo} size="30" round={true} />
        <h2 className=" text-sm font-semibold">{value.name}</h2>
        <p className=" text-xs"> {value.message}</p>
      </div>
    </div>
  );
}
