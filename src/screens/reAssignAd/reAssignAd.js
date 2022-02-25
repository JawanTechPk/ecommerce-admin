import React, { useState, useEffect } from "react";
import {
    assignAdAction,
} from "../../store/actions/settingAction/settingAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Css from "./reAssignAd.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Navbar from "../../UIcomponents/navbar/navbar";
import swal from "sweetalert";
import Loader from "../../UIcomponents/loader/loader";
const Reassignadd = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLoginReducer);
  const { allUsers,assignLoading } = useSelector((state) => state.settingReducer);
  const [searchUserText, setSearchUserText] = useState("");
  const [searchUserArr, setSearchUserArr] = useState(allUsers);

  const searchUser = (e) => {
    setSearchUserText(e.target.value);
    if (e.target.value.trim().length > 0) {
      const abc = allUsers.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (abc.length > 0) {
        setSearchUserArr(abc);
      } else {
        // console.log('no data')
      }
    } else {
      setSearchUserArr(allUsers);
    }
  };

  useEffect(() => {
    setSearchUserArr(allUsers);
  }, [allUsers]);

  const assignToUser = (newUserId) => {
      console.log(newUserId,)
      let adId = location.state.val._id;
      let adIndex = location.state.ind;
      swal({
        title: "Are you sure?",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        //   swal("Poof! Your imaginary file has been deleted!", {
        //     icon: "success",
        //   });
         dispatch(assignAdAction(adId,newUserId,user.userId,adIndex))
        } 
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
      <ToastContainer />
        <h3 className="mt-5">All Users</h3>
        <input
          placeholder="Search User"
          maxLength={15}
          type="text"
          value={searchUserText}
          onChange={(e) => {
            searchUser(e);
          }}
          className={Css.cateInp}
        />
        {
assignLoading ? 
<Loader />
:
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
          {searchUserArr &&
            searchUserArr.length > 0 &&
            searchUserArr.map((val, ind) => {
                return (
                    <div
                    onClick={() => assignToUser(val._id)}
                    className={Css.tagDiv}
                    key={ind}
                    >
                  <h6 className={Css.tagName}>{val.user_name}</h6>
                </div>
              );
            })}
        </div>
        }
      </div>
    </>
  );
};

export default Reassignadd;
