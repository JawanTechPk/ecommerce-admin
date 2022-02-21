import React, { useRef, useEffect, useState } from "react";
import Css from "./home.module.css";
import Navbar from "../../UIcomponents/navbar/navbar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../store/actions/userAction/UserAuthAction";
import {
  getAllUsersAction,
  saveEditCatToRedux,
  updTagAction,
  addTagAction,
  getAllTags,
  getAllCategory,
  deleteTagAction,
  deleteCategoryAction,
  deleteUserAction,
  getAllProduct,
  getAllProducts,
  deleteProductAction,
  editAdData,
} from "../../store/actions/settingAction/settingAction";
import { BsPersonCircle, BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoPricetag, IoLocation } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "../../UIcomponents/loader/loader";
import AddCategory from "../addCategory/addCategory";
import { ToastContainer, toast } from "react-toastify";
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState("");
  const [tagNameUpd, setTagNameUpd] = useState(false);
  const [tagUpdData, setTagUpdData] = useState({});
  const { user } = useSelector((state) => state.userLoginReducer);
  const {
    currentPaginationData,
    isPaginationLoading,
    paginationNo,
    allUsers,
    isLoadingTag,
    isLoading,
    categories,
    allTags,
    allProducts,
  } = useSelector((state) => state.settingReducer);
  const [characters, updateCharacters] = useState(categories);
  const [cateDisplay, setCateDisplay] = useState(true);
  const [tagDisplay, setTagDisplay] = useState(false);
  const [usersDisplay, setUsersDisplay] = useState(false);
  const [productsDisplay, setProductsDisplay] = useState(false);
  // const [tagDisplay, setTagDisplay] = useState(false);
  const [searchCatText, setSearchCatText] = useState("");
  const [searchTagText, setSearchTagText] = useState("");
  const [searchCatArr, setSearchCatArr] = useState(categories);
  const [searchTagArr, setSearchTagArr] = useState(allTags);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getUserData());
    dispatch(getAllCategory());
    dispatch(getAllUsersAction());
    dispatch(getAllProduct());
  }, []);

  const deleteTag = (id, ind) => {
    dispatch(deleteTagAction(id, ind));
  };

  const deleteCategory = (id, ind) => {
    dispatch(deleteCategoryAction(id, ind));
  };

  const addTag = (e) => {
    e.preventDefault();
    dispatch(addTagAction(user.userId, tagName));
    setTagName("");
  };

  const updateTag = (e) => {
    e.preventDefault();
    dispatch(updTagAction(user.userId, tagName, tagUpdData));
    setTagName("");
    setTagNameUpd(false);
  };

  const toEditCategory = (val, ind) => {
    dispatch(saveEditCatToRedux(val, ind));
    history.push("/editcategory");
  };

  useEffect(() => {
    setSearchCatArr(categories);
  }, [categories]);

  useEffect(() => {
    setSearchTagArr(allTags);
  }, [allTags]);

  const searchCategories = (e) => {
    console.log(e.target.value, "e.target.value");
    setSearchCatText(e.target.value);
    if (e.target.value.trim().length > 0) {
      const abc = categories.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (abc.length > 0) {
        setSearchCatArr(abc);
      } else {
        // console.log('no data')
      }
    } else {
      setSearchCatArr(categories);
    }
  };

  const searchTag = (e) => {
    setSearchTagText(e.target.value);
    if (e.target.value.trim().length > 0) {
      const abc = allTags.filter((obj) =>
        JSON.stringify(obj).toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (abc.length > 0) {
        setSearchTagArr(abc);
      } else {
        // console.log('no data')
      }
    } else {
      setSearchTagArr(allTags);
    }
  };

  const deleteUser = (id, ind) => {
    dispatch(deleteUserAction(id, ind));
  };
  const deleteProduct = (id, owner, ind) => {
    dispatch(deleteProductAction(id, owner, ind));
  };

  // const handleScrolls = (e) => {

  //     const bottom =
  //       e.target.scrollHeight - 10 - e.target.scrollTop < e.target.clientHeight;
  //     if (bottom) {
  //         if (currentPaginationData !== 0) {
  //         dispatch(getAllProducts(paginationNo));
  //         }
  //     }
  //   };

  const loadMore = () => {
    if (currentPaginationData !== 0) {
      dispatch(getAllProducts(paginationNo));
    }
  };

  const cardEditAd = (val) => {
    dispatch(editAdData(val));
    history.push("/editad");
    sessionStorage.setItem("editaddata", JSON.stringify(val));
  };

  return (
    <div>
      {/* <div      onScroll={handleScrolls}
    style={{ overflowY: "scroll", maxHeight: "100vh" }}> */}
      <Navbar />
      <div className="container">
        <ToastContainer />
        <div className={`${Css.tabbed}`}>
          <input
            type="radio"
            id="tab21"
            name="css-tabs2"
            onClick={() => {
              setCateDisplay(true);
              setTagDisplay(false);
              setUsersDisplay(false);
              setProductsDisplay(false);
            }}
            defaultChecked
          />
          <input
            type="radio"
            id="tab22"
            name="css-tabs2"
            onClick={() => {
              setCateDisplay(false);
              setTagDisplay(true);
              setUsersDisplay(false);
              setProductsDisplay(false);
            }}
          />
          <input
            type="radio"
            id="tab23"
            name="css-tabs2"
            onClick={() => {
              setCateDisplay(false);
              setTagDisplay(false);
              setUsersDisplay(true);
              setProductsDisplay(false);
            }}
          />
          <input
            type="radio"
            id="tab24"
            name="css-tabs2"
            onClick={() => {
              setCateDisplay(false);
              setTagDisplay(false);
              setUsersDisplay(false);
              setProductsDisplay(true);
            }}
          />
          <ul className={`${Css.tabs}`}>
            <li className={`${Css.tab}`}>
              <label htmlFor="tab21">Categories</label>
            </li>
            <li className={`${Css.tab}`}>
              <label htmlFor="tab22">Tags</label>
            </li>
            <li className={`${Css.tab}`}>
              <label htmlFor="tab23">Users</label>
            </li>
            <li className={`${Css.tab}`}>
              <label htmlFor="tab24">Ads</label>
            </li>
          </ul>
        </div>
        {/* CATEGORY WORK START */}
        {cateDisplay ? (
          <>
            <div>
              <h3>Categories </h3>
              <h4>Add New Category</h4>
              <AddCategory />
              <div className="container">
                {searchCatArr && searchCatArr.length > 0 ? (
                  <>
                    <input
                      placeholder="Search Category"
                      maxLength={15}
                      type="text"
                      value={searchCatText}
                      onChange={(e) => {
                        searchCategories(e);
                      }}
                      className={Css.cateInp}
                    />
                    <FaSearch className={Css.iconSearchStl} size="30" />
                  </>
                ) : null}
                <div
                  style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    searchCatArr &&
                    searchCatArr.length > 0 &&
                    searchCatArr.map((val, ind) => {
                      return (
                        <div className={Css.cateDiv}>
                          <div className={Css.imgDiv}>
                            <img src={val.image} className={Css.cateImg} />
                            <p className={Css.catName}>{val.category_name}</p>
                          </div>
                          <div className={Css.dropdownContentOne}>
                            <FiEdit
                              onClick={() => toEditCategory(val, ind)}
                              className={Css.iconEditStl}
                            />
                            <MdDeleteOutline
                              onClick={() => {
                                deleteCategory(val._id, ind);
                              }}
                              className={Css.iconDelStl}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
        {/* CATEGORY WORK END */}

        {/* TAGS WORK START */}
        {tagDisplay ? (
          <div>
            <h3 className={Css.tagHead}>Tags</h3>
            <h4>Add New Tag</h4>
            <div style={{ marginTop: -20 }}>
              <form
                style={{ display: "inline" }}
                onSubmit={(e) => (tagNameUpd ? updateTag(e) : addTag(e))}
              >
                <input
                  placeholder="Tag Name"
                  type="text"
                  maxLength={15}
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className={Css.tagInp}
                  required
                />
                {isLoadingTag ? (
                  <Loader />
                ) : (
                  <input
                    type="submit"
                    value={tagNameUpd ? "Update Tag" : "Add Tag"}
                    className={Css.addBtnStl}
                  />
                )}
              </form>
            </div>
            <div className="container">
              {searchTagArr && searchTagArr.length > 0 ? (
                <>
                  <input
                    placeholder="Search Tag"
                    maxLength={15}
                    type="text"
                    value={searchTagText}
                    onChange={(e) => {
                      searchTag(e);
                    }}
                    className={Css.cateInp}
                  />
                  <FaSearch className={Css.iconSearchStl} size="30" />
                </>
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
                {searchTagArr &&
                  searchTagArr.length > 0 &&
                  searchTagArr.map((val, ind) => {
                    return (
                      <div className={Css.tagDiv} key={ind}>
                        <h6 className={Css.tagName}>{val.name}</h6>
                        <div className={Css.dropdownContent}>
                          <FiEdit
                            type="button"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => {
                              setTagNameUpd(true);
                              setTagName(val.name);
                              setTagUpdData({ ...val, ind });
                            }}
                            className={Css.iconEditStl}
                          />
                          <MdDeleteOutline
                            onClick={() => {
                              deleteTag(val.id, ind);
                            }}
                            className={Css.iconDelStl}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : null}

        {/* TAGS WORK END */}

        {/* USERS WORK START */}
        {usersDisplay ? (
          <>
            <h3>All Users</h3>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
              {isLoading ? (
                <Loader />
              ) : (
                <div style={{ width: "100%", display: "flex" }}>
                  <table className={Css.mainTable}>
                    <tr className={Css.mainTr}>
                      <th>User Name</th>
                      <th>User Phone Number</th>
                      <td className={Css.actionTd}>Action</td>
                    </tr>
                    {allUsers &&
                      allUsers.length > 0 &&
                      allUsers.map((val, ind) => {
                        return (
                          <>
                            {(ind + 1) % 2 != 0 ? (
                              <tr className={Css.trHighlight} key={ind}>
                                <th>{val.user_name}</th>
                                <th>{val.phone_number}</th>
                                <td>
                                  {" "}
                                  <MdDeleteOutline
                                    onClick={() => {
                                      deleteUser(val._id, ind);
                                    }}
                                    className={Css.iconDelStl}
                                  />
                                </td>
                              </tr>
                            ) : null}
                          </>
                        );
                      })}
                  </table>
                  <table className={Css.mainTableTwo}>
                    <tr className={Css.mainTr}>
                      <th>User Name</th>
                      <th>User Phone Number</th>
                      <td className={Css.actionTd}>Action</td>
                    </tr>
                    {allUsers &&
                      allUsers.length > 0 &&
                      allUsers.map((val, ind) => {
                        return (
                          <>
                            {(ind + 1) % 2 == 0 ? (
                              <tr className={Css.trHighlight} key={ind}>
                                <th>{val.user_name}</th>
                                <th>{val.phone_number}</th>
                                <td>
                                  {" "}
                                  <MdDeleteOutline
                                    onClick={() => {
                                      deleteUser(val._id, ind);
                                    }}
                                    className={Css.iconDelStl}
                                  />
                                </td>
                              </tr>
                            ) : null}
                          </>
                        );
                      })}
                  </table>
                </div>
              )}
            </div>
          </>
        ) : null}
        {/* USERS WORK END */}

        {/* PRODUCTS WORK START */}

        {productsDisplay ? (
          <>
            <h3>All Products</h3>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
              {isLoading ? (
                <Loader />
              ) : (
                allProducts &&
                allProducts.length > 0 &&
                allProducts.map((val, ind) => {
                  return (
                    <>
                    <div className={Css.productDiv}>
                      <div style={{display:'flex',alignItems:'center'}}>
                      <img
                        src={
                          val.images[0] &&
                          val.images[0].url &&
                          val.images[0].url
                        }
                        style={{ height: 100, width: 70 }}
                      />
                      <div>
                        <div className={Css.adDetail}>
                          <BsPersonCircle
                            color="#008c8c"
                            style={{ marginTop: 5, marginRight: 5 }}
                          />
                          <p>{val.title}</p>
                        </div>
                        <div className={Css.adDetail}>
                          <IoPricetag
                            color="#008c8c"
                            style={{ marginTop: 5, marginRight: 5 }}
                          />
                          <p>{val.rental_price.day}</p>
                        </div>
                        <div className={Css.adDetail}>
                          <IoLocation
                            color="#008c8c"
                            style={{ marginTop: 5, marginRight: 5 }}
                          />
                          <p>{val.address.country + ", " + val.address.city}</p>
                        </div>
                      </div>
                      </div>
                      <div style={{display:'flex',position:'relative',top:-40}}>
                        <FiEdit
                          onClick={() => cardEditAd(val)}
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          className={Css.iconEditStlPro}
                        />
                        <MdDeleteOutline
                          className={Css.iconDelStl}
                          onClick={() =>
                            deleteProduct(val._id, val.owner._id, ind)
                          }
                        />
                      </div>
                    </div>

                    </>
                  );
                })
              )}

              {isPaginationLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 40,
                  }}
                >
                  <Loader />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        {productsDisplay && currentPaginationData != 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => loadMore()}
              style={{
                backgroundColor: "#008c8c",
                padding: 10,
                color: "white",
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              Load More
            </span>
          </div>
        ) : null}
        {/* PRODUCTS WORK END */}
      </div>
    </div>
  );
};

export default Home;
