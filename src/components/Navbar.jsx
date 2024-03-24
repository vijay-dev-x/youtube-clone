import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiVideoOn } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory, setSuggestion, toggleAction } from "../redux/Slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const Suggestion = useSelector((store) => store.app.Suggestion);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigation = useNavigate();

  const toggleHamburgar = () => {
    dispatch(toggleAction());
  };
  const searchSubmit = () => {
    dispatch(setCatagory(search));
    setShowSuggestions(true);
  };
  const sujjestionFetch = async () => {
    try {
      const res = await axios.get(
        `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`
      );
      dispatch(setSuggestion(res?.data[1]));
      // console.log(res?.data[1]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      sujjestionFetch();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  const liEvent = (text) => {
    // console.log(text);
    setShowSuggestions(true);

    dispatch(setCatagory(text));
  };
  const imgEvent = () => {
    navigation("/");
  };
  return (
    <div className=" flex fixed w-[100%]  justify-between py-5 px-5 mb-5 bg-white top-0">
      <div className="flex gap-5 items-center">
        <span onClick={toggleHamburgar} className=" cursor-pointer text-3xl">
          <RxHamburgerMenu></RxHamburgerMenu>
        </span>

        <img
          onClick={imgEvent}
          className=" w-[100px]"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1920px-YouTube_Logo_2017.svg.png"
          alt=""
        />
      </div>

      <div className=" flex relative  w-[50%] justify-center">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(false);
          }}
          className="outline-none w-[80%] px-5 py-3 bg-transparent border rounded-l-full"
          type="text"
          placeholder="Search"
        />
        <div>
          <ul
            className={`${
              search === "" || showSuggestions ? " hidden" : " absolute"
            } top-20 left-[30px] rounded-md w-[70%] p-5 bg-white gap-10 `}
          >
            {Suggestion.map((value, index) => (
              <li
                onClick={() => liEvent(value)}
                className=" my-2 cursor-pointer text-[18px] flex gap-3 items-center font-semibold"
                key={index}
              >
                <span>
                  <IoSearch></IoSearch>
                </span>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={searchSubmit}
          className=" outline-none  px-5 border-gray-300 border rounded-r-full"
        >
          <CiSearch size={"24px"}></CiSearch>
        </button>
      </div>
      <div className=" flex gap-5 items-center">
        <span className=" cursor-not-allowed">
          <CiVideoOn size={"27px"}></CiVideoOn>
        </span>
        <span className=" cursor-not-allowed ">
          <IoMdNotificationsOutline size={"27px"}></IoMdNotificationsOutline>
        </span>
        <span className=" cursor-not-allowed">
          <Avatar
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-2379004.jpg&fm=jpg"
            size="40"
            round={true}
          />
        </span>
      </div>
    </div>
  );
}
