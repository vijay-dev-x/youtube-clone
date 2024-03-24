import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { apiKey } from "./youtubeInfo";
import Avatar from "react-avatar";
import { IoMdDownload } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/chatSlice";
import { setChannelLogo } from "../redux/Slice";

export default function Watch() {
  const [inputText, setInputText] = useState("");
  const [vidioData, setVidioData] = useState(null);
  const [chanenlId, setChanenlId] = useState(null);
  const [searchParams] = useSearchParams();
  const vidioId = searchParams.get("v");
  const dispatch = useDispatch();
  const fetchSingleData = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vidioId}&key=${apiKey}`
      );

      setVidioData(res?.data?.items[0]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchChennelDetails = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${vidioData.snippet.channelId}&key=${apiKey}`
      );
      console.log("chennel id---", res?.data?.items[0]);
      setChanenlId(res?.data?.items[0]);
      // await dispatch(
      //   setChannelLogo(res?.data?.items[0]?.snippet?.thumbnails?.medium?.url)
      // );
    } catch (error) {
      console.log(error);
    }
  };

  // dispatch(setChannelLogo(chanenlId?.snippet?.thumbnails?.medium?.url));
  useEffect(() => {
    // setInterval(() => {
    //   dispatch(setChannelLogo(chanenlId?.snippet?.thumbnails?.medium?.url));
    // }, 1000);
    fetchSingleData();
    fetchChennelDetails();
  }, []);

  const sendEvent = (e) => {
    dispatch(setMessage({ name: "vijay", message: inputText }));
    // alert(inputText);
    setInputText("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(setMessage({ name: "vijay", message: inputText }));
      // alert(inputText);
      setInputText("");
    }
  };

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  }
  return (
    <div className=" w-[130%] flex p-5">
      <div className="w-[75%] border border-blue-800">
        <iframe
          className=" rounded-2xl"
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${vidioId}?si=EKPeWXsrwi7YBrFX?`}
          title="YouTube video player"
          frameorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h1 className="font-bold text-xl mt-2 ml-2">
          {vidioData?.snippet?.localized?.title}
        </h1>
        <p className=" mb-1 ml-2 text-gray-600">
          {formatNumber(vidioData?.statistics?.viewCount)}&nbsp;views
        </p>
        <div className="flex border justify-between w-[100%] gap-3 ">
          <div className=" flex gap-3">
            <Avatar
              src={chanenlId?.snippet?.thumbnails?.medium?.url}
              size="40"
              round={true}
            />
            <div className="m= mx-1">
              <p>{vidioData?.snippet?.channelTitle}</p>
              <p className=" text-gray-500">
                {formatNumber(chanenlId?.statistics?.subscriberCount)}
                &nbsp;subscribers
              </p>
            </div>
            <button className=" flex items-center h-10 my-auto bg-black text-white px-4 rounded-full gap-2">
              Subscribe
              <span>
                <FaRegBell size={20}></FaRegBell>
              </span>
            </button>
          </div>
          <div className=" flex px-5 gap-3  rounded-full">
            <div className=" flex bg-gray-400 items-center h-10 my-auto rounded-full px-4">
              <button className=" border-r-2 flex px-2 gap-1  border-gray-500">
                <AiOutlineLike size={25}></AiOutlineLike>
                <span>{formatNumber(vidioData?.statistics?.likeCount)}</span>
              </button>
              <button className="px-2 font-semibold">
                <AiOutlineDislike size={25}></AiOutlineDislike>
              </button>
            </div>
            <button className=" bg-gray-400 px-3 h-10 my-auto flex items-center gap-2  rounded-full">
              <IoIosShareAlt></IoIosShareAlt>
              <p>Share</p>
            </button>
            <button className=" bg-gray-400 flex h-10 my-auto items-center gap-2  px-3  rounded-full">
              <IoMdDownload></IoMdDownload>
              <p>Download</p>
            </button>
            <button className=" bg-gray-400 px-5 h-10 my-auto  rounded-full">
              <BsThreeDots></BsThreeDots>
            </button>
          </div>
        </div>
      </div>
      <div className=" w-[40%] border-red-600 border">
        <div className=" border border-gray-400 rounded-xl p-4 w-[80%] flex flex-col justify-between my-5 m-auto h-[70vh]">
          <div>
            <div className="flex justify-between">
              <div className=" flex gap-2 items-center">
                <p>Top chat</p>
                <span className=" cursor-pointer">
                  <IoIosArrowDown></IoIosArrowDown>
                </span>
              </div>
              <span className=" cursor-pointer">
                <BsThreeDots></BsThreeDots>
              </span>
            </div>
            <div className=" overflow-y-scroll h-[50vh] mt-2 flex flex-col-reverse">
              <LiveChat></LiveChat>
            </div>
          </div>
          <div className=" flex gap-2 items-center w-[100%] border border-red-700">
            <Avatar
              className=" w-[5%]"
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg"
              size="40"
              round={true}
            />
            <input
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className=" outline-none w-[75%] border border-gray-400 px-5 py-2  rounded-xl"
              type="text"
              placeholder="your massage here"
              value={inputText}
            />
            <span className=" cursor-pointer text-gray-600">
              <IoMdSend onClick={sendEvent} size={28}></IoMdSend>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
