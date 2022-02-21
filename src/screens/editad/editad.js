import React, { useEffect, useState } from "react";
import Navbar from "../../UIcomponents/navbar/navbar";
import Css from "./editAd.module.css";
import DropDown from "../../UIcomponents/dropdown/dropdown";
import Input from "../../UIcomponents/input/input";
import Textarea from "../../UIcomponents/textarea/textarea";
import Pricefield from "../../UIcomponents/priceField/priceField";
import Otherfield from '../../UIcomponents/otherField/otherField'
import Buttons from "../../UIcomponents/button/button";
import { ToastContainer } from "react-toastify";
import { getUserData } from "../../store/actions/userAction/UserAuthAction";
// import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { editAds } from "../../store/actions/editAdAction/editAdAction";
import { useHistory, useLocation, Prompt } from "react-router-dom";
import {
  editAdField,
  editAdData,
  getAllTags,
  getAllCategory
} from "../../store/actions/settingAction/settingAction";
import TagsInput from "../../UIcomponents/tagInput/tagsInputs";
import Loader from "../../UIcomponents/loader/loader";
import { ImCross } from "react-icons/im";

const EditAd = () => {

  // const myfun = () => {
  //   alert("Hello world");
  // };
  // window.onbeforeunload = function () {
  //   myfun();
  //   return "Are you sure you want to leave?";
  // };

  const history = useHistory();
  const locationdata = useLocation();
  const [imgDisplay, setImgDisplay] = useState("");
  const { user } = useSelector((state) => state.userLoginReducer);
  const [optionsArr, setOptionsArr] = useState([]);
  const dispatch = useDispatch();
  const [addObj, setAddObj] = useState({});

  const editAdButton = () => {
    dispatch(editAds(addObj, user, history));
  };
console.log(user,'user')
  const { isLoading } = useSelector((state) => state.createAdReducer);
  const { categories, editAd, imgLoad } = useSelector(
    (state) => state.settingReducer
  );
  let { allTags } = useSelector((state) => state.settingReducer);
  useEffect(() => {
    setOptionsArr(categories.map((val) => val.category_name));
  }, [categories]);

  useEffect(() => {
    const editAdDatafromStorage = JSON.parse(
      sessionStorage.getItem("editaddata")
    );
    dispatch(getAllTags());
    dispatch(getAllCategory());
    dispatch(editAdData(editAdDatafromStorage));
    setAddObj(editAd);
    dispatch(getUserData());
    console.log(editAdDatafromStorage);
  }, []);

  useEffect(() => {
    setAddObj(editAd);
  }, [editAd]);

//   const deleteSingleImg = async (ind) => {
//     let arr = [...addObj.images];
//     var deleteImg = arr.slice(ind, ind + 1);
//     arr.splice(ind, 1);
//     dispatch(updateImgArrFromDeletes(arr, deleteImg, addObj._id, "true"));
//   };
//   const addMoreImages = (files) => {
//     dispatch(addMoreImg(addObj.images, files, "edit", addObj._id, "true"));
//   };

console.log(addObj,'addObj')
  return (
    <div>
      {/* <Prompt
        message="You have unsaved changes, are you sure you want to leave?"
        title="Leave this page"
        cancelText="Cancel"
        okText="Confirm"
        onOK={() => true}
        onCancel={() => false}
      /> */}
      <Navbar />
      <ToastContainer />
      <div className={Css.mainDiv}>
        <div className={Css.leftDiv}>
          <img
            src={
              imgDisplay
                ? imgDisplay
                : addObj && addObj.images && addObj.images[0].url
            }
            className={Css.mainImg}
          />

          {/* <Buttons onclick={() => alert("uploaded")} btnTxt="Upload Image" btnStyle={Css.uploadImgBtn} /> */}
          {/* {imgLoad ? (
            <Loader />
          ) : (
            <>
              {addObj &&
              addObj.images &&
              addObj.images.length != 0 &&
              addObj.images.length < 20 ? (
                <>

                  <div className={Css.fileSpan}>
                    <label>
                      Upload Images
                      <input
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        onChange={(e) => {
                          addMoreImages(e.target);
                        }}
                      />
                    </label>
                  </div>
                </>
              ) : null}
            </>
          )} */}
          <Input
            maxLength="50"
            value={addObj.title}
            // onchange={(value) => setAddObj({ ...addObj, title: value })}
            onchange={(value) => dispatch(editAdField("title", value))}
            inputStyle={Css.inputStyle}
            type="text"
            head="AD Title"
            addTitleCss={Css.addTitleCss}
            h5Element={Css.h5Element}
          />
          <DropDown
            value={addObj.type}
            h5Element={Css.h5Element}
            // onchange={(value) => setAddObj({ ...addObj, type: value })}
            onchange={(value) => dispatch(editAdField("type", value))}
            options={["Select type", ...optionsArr]}
            addTypeSelect={Css.addTypeSelect}
            addTypeDiv={Css.addTypeDiv}
            head="Enter AD type:"
          />
          <Textarea
            value={addObj.details}
            // onchange={(value) => setAddObj({ ...addObj, details: value })}
            onchange={(value) => dispatch(editAdField("details", value))}
            inputStyle={Css.inputStyle}
            type="text"
            head="AD Details"
            addTitleCss={Css.addTitleCss}
            h5Element={Css.h5Element}
          />
          <div className={Css.ReactTags}>
            <h5 className={Css.h5Element}>Add Tags</h5>
            <TagsInput
              suggestions={allTags}
              value={addObj.tags}
              deleteTags={(val) => setAddObj({ ...addObj, tags: val })}
              setAddObj={(val) =>
                setAddObj({ ...addObj, tags: [...addObj.tags, val] })
              }
              inputStyle={Css.inputStyle}
            />
          </div>
          <h5 className={Css.h5Element}>Rental Price</h5>

          <div className={Css.priceDivStyle}>
            <div className={`row`}>
              <div className={`col-lg-3 col-md-6 col-sm-6`}>
                <Pricefield
                  value={
                    addObj && addObj.rental_price && addObj.rental_price.day
                  }
                  //  onchange={(value) => setAddObj({ ...addObj, rental_price:{...addObj.rental_price,day: value} })}
                  // onchange={(value) =>
                  //   dispatch(
                  //     editAdField("rental_price", {
                  //       ...addObj.rental_price,
                  //       day: value,
                  //     })
                  //   )
                  // }
                  title="Daily"
                />
              </div>
              <div className={`col-lg-3 col-md-6 col-sm-6`}>
                <Pricefield
                  value={
                    addObj && addObj.rental_price && addObj.rental_price.weekly
                  }
                  //  onchange={(value) => setAddObj({ ...addObj, rental_price:{...addObj.rental_price,weekly: value} })}
                  // onchange={(value) =>
                  //   dispatch(
                  //     editAdField("rental_price", {
                  //       ...addObj.rental_price,
                  //       weekly: value,
                  //     })
                  //   )
                  // }
                  title="Weekly"
                />
              </div>
              <div className={`col-lg-3 col-md-6 col-sm-6`}>
                <Pricefield
                  value={
                    addObj && addObj.rental_price && addObj.rental_price.montly
                  }
                  // onchange={(value) => setAddObj({ ...addObj, rental_price:{...addObj.rental_price,montly: value} })}
                  // onchange={(value) =>
                  //   dispatch(
                  //     editAdField("rental_price", {
                  //       ...addObj.rental_price,
                  //       montly: value,
                  //     })
                  //   )
                  // }
                  title="Monthly"
                />
              </div>
              <div className={`col-lg-3 col-md-6 col-sm-6`}>
                <Otherfield
                  value={
                    addObj && addObj.rental_price && addObj.rental_price.other
                  }
                  //  onchange={(value) => setAddObj({ ...addObj, rental_price:{...addObj.rental_price,other: value} })}
                  // onchange={(value) =>
                  //   dispatch(
                  //     editAdField("rental_price", {
                  //       ...addObj.rental_price,
                  //       other: value,
                  //     })
                  //   )
                  // }
                  title="Other"
                />
              </div>
            </div>
          </div>
          <div>
            <h5 className={Css.h5Element}>
              Do you want to feature free delivery ?
            </h5>
            <Buttons
              // onclick={() => setAddObj({ ...addObj, free_delivery: true })}
              // onclick={() => dispatch(editAdField("free_delivery", true))}
              btnTxt="Yes"
              btnStyle={
                addObj.free_delivery
                  ? Css.deliveryBtnSelected
                  : Css.deliveryBtnUnSelected
              }
            />
            <Buttons
              // onclick={() => setAddObj({ ...addObj, free_delivery: false })}
              // onclick={() => dispatch(editAdField("free_delivery", false))}
              btnTxt="No"
              btnStyle={
                !addObj.free_delivery
                  ? Css.deliveryBtnSelected
                  : Css.deliveryBtnUnSelected
              }
            />
          </div>
          <div className={Css.insuranceDivStyle}>
            <h5 className={Css.h5Element}>Insurance</h5>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Buttons
                // onclick={() => setAddObj({ ...addObj, insurance: true })}
                // onclick={() => dispatch(editAdField("insurance", true))}
                btnTxt="Yes"
                btnStyle={
                  addObj.insurance
                    ? Css.deliveryBtnSelected
                    : Css.deliveryBtnUnSelected
                }
              />
              <Buttons
                // onclick={() => dispatch(editAdField("insurance", false))}
                // onclick={() => setAddObj({ ...addObj, insurance: false })}
                btnTxt="No"
                btnStyle={
                  !addObj.insurance
                    ? Css.deliveryBtnSelected
                    : Css.deliveryBtnUnSelected
                }
              />
            </div>
            {addObj.insurance ? (
              <div className={Css.insAmountDiv}>
                <span className={Css.insSpan}>Insurance amount : </span>
                <input
                disabled
                  value={addObj.insurance_price}
                  // onChange={(e) => { setAddObj({ ...addObj, insurance_price: e.target.value }) }}
                  // onChange={(e) =>
                  //   dispatch(editAdField("insurance_price", e.target.value))
                  // }
                  type="number"
                  className={Css.insFildStl}
                />
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Buttons
                onclick={() => history.push("/")}
                btnTxt="Cancel"
                btnStyle={Css.deliveryBtnUnSelected}
              />
              {isLoading ? (
                <Loader />
              ) : (
                <Buttons
                  onclick={() => editAdButton()}
                  btnTxt="Update Ad"
                  btnStyle={Css.deliveryBtnSelected}
                />
              )}
            </div>
          </div>
        </div>
        <div className={Css.rightDiv}>
          <div className={Css.innerstyleImage}>
            {addObj &&
              addObj.images &&
              addObj.images.map((val, ind) => {
                return (
                  <div key={ind}>
                    <img
                      onClick={() => setImgDisplay(val.url)}
                      src={val.url}
                      className={Css.otherImg}
                    />
                    {/* {addObj.images.length !== 1 ? (
                      <span
                        className={Css.crossIconStyle}
                        // onClick={() => deleteSingleImg(ind)}
                      >
                        <ImCross
                          className={Css.crossIcon}
                        />
                      </span>
                    ) : null} */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAd;
