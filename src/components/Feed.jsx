import { useEffect, useState } from "react";
import axios from "axios";
import { vidioUrl, apiKey } from "./youtubeInfo.js";
import VidioCart from "./VidioCart.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory, setVidio } from "../redux/Slice.jsx";
const buttonList = [
  {
    id: 1,
    text: "Trending",
  },
  {
    id: 2,
    text: "Javascript",
  },
  {
    id: 3,
    text: "Programing",
  },
  {
    id: 4,
    text: "Node js",
  },
  {
    id: 5,
    text: "Shark Tank India",
  },
  {
    id: 6,
    text: "Bollywood",
  },
  {
    id: 7,
    text: "South hindi",
  },
  {
    id: 8,
    text: "Comady",
  },
  {
    id: 9,
    text: "TKSS",
  },
  {
    id: 10,
    text: "Kaplil sharma",
  },
  {
    id: 11,
    text: "Dhruv rathi",
  },
  {
    id: 12,
    text: "Vlogs",
  },
  {
    id: 10,
    text: "Forner vlogs",
  },
  {
    id: 11,
    text: "Netflix shows",
  },
  {
    id: 12,
    text: "Bhojpuri songs",
  },
];

function Feed() {
  const selector = useSelector((store) => store.app.open);
  const dispatch = useDispatch();
  const storeVidios = useSelector((store) => store.app.vidio);
  const catagory = useSelector((store) => store.app.catagory);
  const fetchVideoByCategory = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${catagory}&type=video&key=${apiKey}`
      );
      dispatch(setVidio(res?.data?.items));
      console.log("feed--", res?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVideoByCategory();
    dispatch(setCatagory(catagory));
  }, [catagory]);

  const ativeButtonEvent = (e) => {
    if (e.text !== catagory) {
      dispatch(setCatagory(e.text));
    }
  };

  return (
    <div
      className={`${
        selector ? "w-[85%]" : "w-[94%]"
      } border h-[85vh] border-lime-700 overflow-y-hidden no-scrollbar px-5 mt-4 no-scrollbar`}
    >
      <div className=" no-scrollbar w-[100%]  my-2 scroll-smooth mx-auto border border-red-600 flex overflow-x-auto">
        {buttonList.map((value, index) => (
          <div key={index}>
            <button
              onClick={() => {
                ativeButtonEvent(value);
              }}
              key={value.id}
              className={` ${
                catagory === value.text
                  ? " bg-black text-white"
                  : " bg-gray-300"
              }  mx-1 py-2 px-5 rounded-md`}
            >
              <span className=" whitespace-nowrap">{value.text}</span>
            </button>
          </div>
        ))}
      </div>
      {/* vidio card */}
      <div className=" grid border w-[100%] h-[92%] no-scrollbar overflow-y-scroll border-blue-600 grid-cols-3 gap-4">
        {storeVidios.map((value) => (
          <Link key={value.id} to={`/watch?v=${value?.id?.videoId}`}>
            <VidioCart value={value}></VidioCart>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Feed;
