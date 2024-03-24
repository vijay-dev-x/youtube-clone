import React from "react";
import { RiHome4Line } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory } from "../redux/Slice";
import { CiMusicNote1 } from "react-icons/ci";
import { PiFilmSlateDuotone } from "react-icons/pi";
import { FaPodcast } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdOutlineSportsCricket } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import { GiIndiaGate } from "react-icons/gi";
import { SiCoursera } from "react-icons/si";

const topList = [
  {
    icon: <RiHome4Line></RiHome4Line>,
    title: "Home",
  },
  {
    icon: <SiYoutubeshorts></SiYoutubeshorts>,
    title: "Shorts",
  },
  {
    icon: <MdOutlineSubscriptions></MdOutlineSubscriptions>,
    title: "Subscriptions",
  },
  {
    icon: <CiMusicNote1></CiMusicNote1>,
    title: "Music",
  },
  {
    icon: <PiFilmSlateDuotone></PiFilmSlateDuotone>,
    title: "Film",
  },
  {
    icon: <PiFilmSlateDuotone></PiFilmSlateDuotone>,
    title: "Films",
  },
  {
    icon: <FaPodcast></FaPodcast>,
    title: "Podcasts",
  },
  {
    icon: <FaRegNewspaper></FaRegNewspaper>,
    title: "News",
  },
  {
    icon: <MdOutlineSportsCricket></MdOutlineSportsCricket>,
    title: "Cricket",
  },
  {
    icon: <IoIosFootball></IoIosFootball>,
    title: "Football",
  },
  {
    icon: <IoTrendingUp></IoTrendingUp>,
    title: "Trending",
  },
  {
    icon: <MdOutlineShoppingBag></MdOutlineShoppingBag>,
    title: "Shopping",
  },
  {
    icon: <CgMediaLive></CgMediaLive>,
    title: "Live",
  },
  {
    icon: <GiIndiaGate></GiIndiaGate>,
    title: "Indian",
  },
  {
    icon: <SiCoursera></SiCoursera>,
    title: "Courses",
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.app.open);
  // console.log(selector);
  const sidebarEvent = (text) => {
    console.log(text);
    dispatch(setCatagory(text));
  };
  return (
    <div
      className={`py-1 ${
        selector ? " w-[25%]" : " w-[8%]"
      } px-8 overflow-y-scroll overflow-x-hidden h-[88vh] `}
    >
      {topList.map((value, index) => {
        return (
          <div
            onClick={() => sidebarEvent(value.title)}
            key={index}
            className={`flex w-fit my-6 items-center gap-6 cursor-pointer`}
          >
            <span className=" text-2xl ">{value.icon}</span>
            <h3 className={selector ? "" : " hidden"}> {value.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
