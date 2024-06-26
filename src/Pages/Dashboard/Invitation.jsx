/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/image 2.png";
import icon from "../../assets/Logo.png";
import Woman from "../../assets/default.png";
import { useState, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { auth } from "../../../firebaseConfig";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";

const Invitation = () => {
  const [checkedbox, setcheckedbox] = useState("");
  const { eventId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [plusOnes, setPlusOnes] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [loading, setloading] = useState(true);
  const [event, setEvent] = useState([]);
  console.log(checkedbox);
  const instance = axios.create({
    baseURL: "https://db-lhsk5bihpq-uc.a.run.app/",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    setLoaded(true);
    instance
      .post("api/rsvp", {
        name: name,
        email: email,
        message: message,
        event: eventId,
        plusOnes: plusOnes,
        isAttending: checkedbox == "present",
      })
      .then(() => {
        setLoaded(false);
        toast.success("Your response has been sent successfully", {
          theme: "colored",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoaded(false);
        if (
          error.response.data ===
          "You have already rsvp'ed using this email , please use another email address"
        )
          return toast.error(error.response.data, {
            theme: "colored",
            autoClose: 3000,
          });
        else
          toast.error("An error occoured: " + error.message, {
            theme: "colored",
            autoClose: 3000,
          });
      });
  };
  useEffect(() => {
    setloading(true);
    instance
      .get(`/api/event/getEventName/${eventId}`)
      .then((res) => {
        setloading(false);
        console.log(res.data);
        setEvent(res.data.name);
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="hidden md:w-[15%] bg-primary h-screen fixed left-0 top-0 bottom-0 md:flex items-center">
        <img src={logo} alt="" />
      </div>
      <div className="md:ml-[15%]">
        <div className="flex items-center justify-between p-6">
          <div className="md:w-[224px] h-[50px]">
            <img src={icon} alt="" />
          </div>
          {!auth.currentUser ? (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="w-[104px] flex items-center justify-center h-[40px] border-2 rounded-[24px] text-blue-500 border-blue-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-[104px] h-[40px] flex items-center justify-center border-2 rounded-[24px] bg-blue-500 text-white"
              >
                Register
              </Link>
            </div>
          ) : (
            <span className=" cursor-pointer flex items-center gap-2 text-dark text-sm">
              <Link to="/profile">
                <img
                  className="w-12 rounded-full"
                  src={auth.currentUser?.photoURL || Woman}
                  alt="profile-pic"
                />
              </Link>
              {auth.currentUser?.displayName}
            </span>
          )}
        </div>
        {!loading && (
          <div className="lg:px-24 px-6">
            <h1 className="font-[700] text-center text-[24px] capitalize">
              You are invited to {event} !
            </h1>
            <p className="font-[500] text-center">
              Please confirm your attendance below
            </p>
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col w-full mt-9">
                <label className="font-[500] text-[14px]" htmlFor="">
                  Guest Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border-gray border-2 outline-none shadow-md rounded-xl"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col w-full mt-9">
                <label className="font-[500] text-[14px]" htmlFor="">
                  Guest Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border-gray border-2 outline-none shadow-md rounded-xl"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-6 mt-6 text-[#101928] font-[500]">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    value="present"
                    checked={checkedbox === "present"}
                    onChange={() => setcheckedbox("present")}
                  />
                  {""} Yes, I will be there
                </label>
                <label htmlFor="">
                  <input
                    type="checkbox"
                    value="absent"
                    checked={checkedbox === "absent"}
                    onChange={() => setcheckedbox("absent")}
                  />
                  {""} Sadly, I can't be there
                </label>
              </div>
              {checkedbox == "present" && (
                <div className="my-6">
                  <label className="font-semibold">Additional Guest(s):</label>
                  <TagsInput
                    value={plusOnes}
                    onChange={setPlusOnes}
                    name="Plus Ones"
                    placeHolder="Enter names (Press enter to save)"
                  />
                </div>
              )}

              <div className="flex flex-col w-full mt-9">
                <label className="font-[500] text-[14px]" htmlFor="">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 border-gray border-2 outline-none shadow-md rounded-xl"
                  name=""
                  id=""
                  rows="3"
                  placeholder="Write a congratulatory message"
                  required
                ></textarea>
              </div>
              <button
                className="text-center bg-primary w-full my-6 py-4 text-white font-[600] rounded-lg"
                type="submit"
              >
                {loaded ? "Loading..." : "Send RSVP"}
              </button>
            </form>
            <ToastContainer transition={Zoom} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Invitation;
