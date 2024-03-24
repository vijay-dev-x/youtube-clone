import React, { useState } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { apiKey } from "./youtubeInfo";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function VidioCart({ value }) {
  const [channelDetails, setChannelDetails] = useState([]);
  const catagory = useSelector((store) => store.app.catagory);
  console.log("vijay");

  const fetchChannelDetails = async () => {
    try {
      const chennelRes = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${value?.id?.videoId}&key=${apiKey}`
      );
      console.log("vijay");

      setChannelDetails(
        chennelRes?.data?.items[0]?.snippet?.thumbnails?.medium.url
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChannelDetails();
  }, [catagory, value]);

  return (
    <div>
      <div>
        <img
          className=" rounded-2xl w-full mt-5 cursor-pointer"
          src={value.snippet.thumbnails.medium.url}
          alt="thumblane vidio"
        />
        <div className="flex items-center mt-2">
          {/* <Avatar
            src={value.snippet.thumbnails.medium.url}
            size="40"
            round={true}
          /> */}
          <img
            src={value.snippet.thumbnails.medium.url}
            className=" rounded-full w-10 h-10"
            alt="c-logo"
          />

          <div className="ml-4">
            <h1 className=" font-semibold">{value?.snippet?.title}</h1>
            <p className=" text-sm text-gray-600">
              {value.snippet.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
