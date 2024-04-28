/* eslint-disable react/no-unescaped-entities */
import Sidebar from "../../Components/Sidebar";
import Nav from "../../Components/Nav";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import Mobilesidebar from "../../Components/Mobilesidebar";
import axios from "axios";
import { auth } from "../../../firebaseConfig";
import { useState, useEffect } from "react";
const AllEvents = () => {
  const [showEvents, setShowEvents] = useState([]);
  const [loading, isLoading] = useState(false);
  const instance = axios.create({
    baseURL: "https://db-lhsk5bihpq-uc.a.run.app/",
    headers: {
      Authorization: `Bearer ${auth.currentUser.accessToken}`,
    },
  });
  const formatday = (dateTimeString) => {
    const formattedDateTime = new Date(dateTimeString).toDateString("en-GB");
    return formattedDateTime;
  };

  useEffect(() => {
    isLoading(true);
    instance
      .get("/api/event/getAllEvents")
      .then((res) => {
        isLoading(false);
        console.log(res.data);
        setShowEvents(res.data);
      })
      .catch((error) => {
        isLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Sidebar />
      <Mobilesidebar />
      <div>
        <div className="lg:ml-[17%]">
          <Nav />
          <div className="bg-[#F9FAFB] min-h-[90vh] overflow-x-auto p-4">
            <table className="text-left w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th className="p-2">Recent Events</th>
                  <th className="p-4">Created</th>
                  <th className="p-4">Event Day</th>
                  <th className="p-4">Stats</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              {loading && "Loading..."}
              <tbody>
                {showEvents.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t-[1px] border-[#E4E7EC] font-semibold text-sm lg:text-base"
                  >
                    <td className="p-4 capitalize">{item.name}</td>
                    <td className="p-4 capitalize">
                      {formatday(item.createdAt)}
                    </td>
                    <td className="p-4 capitalize">
                      {formatday(item.startDate)}
                    </td>
                    <td
                      className="p-4 capitalize"
                      style={{
                        color:
                          item.stats === "Open"
                            ? "green"
                            : item.stats === "Draft"
                            ? "gold"
                            : "black",
                      }}
                    >
                      {item.stats}
                    </td>
                    <td className="flex items-center p-4 gap-2">
                      <FaPen size={25} color="#667185" role="button" />
                      <LuEye size={25} color="#667185" role="button" />
                      <RiDeleteBin6Fill size={25} color="red" role="button" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
