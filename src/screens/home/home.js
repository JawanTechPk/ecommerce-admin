import React, { useRef, useEffect, useState } from "react";
import Css from "./home.module.css";
import Navbar from '../../UIcomponents/navbar/navbar'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../store/actions/userAction/UserAuthAction';
import { saveEditCatToRedux, updTagAction, addTagAction, getAllTags, getAllCategory, deleteTagAction, deleteCategoryAction } from '../../store/actions/settingAction/settingAction';
import { BsPersonCircle, BsThreeDotsVertical } from "react-icons/bs";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import Loader from '../../UIcomponents/loader/loader';
import AddCategory from '../addCategory/addCategory';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [tagName, setTagName] = useState("");
    const [tagNameUpd, setTagNameUpd] = useState(false);
    const [tagUpdData, setTagUpdData] = useState({})
    const { user } = useSelector((state) => state.userLoginReducer)
    const { isLoadingTag, isLoading, categories, allTags } = useSelector((state) => state.settingReducer)
    const [characters, updateCharacters] = useState(categories);

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getUserData())
        dispatch(getAllCategory());
    }, [])


    const deleteTag = (id, ind) => {
        dispatch(deleteTagAction(id, ind))
    }

    const deleteCategory = (id, ind) => {
        dispatch(deleteCategoryAction(id, ind))
    }

    const addTag = (e) => {
        e.preventDefault();
        dispatch(addTagAction(user.userId, tagName))
        setTagName("");
    }

    const updateTag = () => {
        dispatch(updTagAction(user.userId, tagName, tagUpdData));
        setTagName("");
        setTagNameUpd(false)
    }

    const toEditCategory = (val, ind) => {
        dispatch(saveEditCatToRedux(val, ind));
        history.push('/editcategory')
    }

    useEffect(()=>{
        updateCharacters(categories);
    },[categories])
    const handleOnDragEnd=(result)=>{
        console.log(result,'result');
        if (!result.destination) return;
        const items = Array.from(characters);
const [reorderedItem] = items.splice(result.source.index, 1);
items.splice(result.destination.index, 0, reorderedItem);
updateCharacters(items);
    }
    

    return (
        <div >
            <Navbar />
            <div className="container">
                <div>
                    <h2 className={Css.mainHead}>Renting Admin</h2>
                    <h3>Categories </h3>
                    <h4>Add New Category</h4>
                    <AddCategory />
                    <div className="container">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
    {(provided) => (
                        <div className="characters" {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30 }}>

                            {isLoading ?
                                <Loader />
                                :
                                characters && characters.length > 0 && characters.map((val, ind) => {
                                    // console.log(val, 'cal')
                                    return  <Draggable key={val._id} draggableId={val._id} index={ind}>
                                    {(provided) => (<div className={Css.cateDiv} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div className={Css.dropdown} >
                                            <BsThreeDotsVertical className={`${Css.threeDot} ${Css.dropbtn}`} />
                                            <div className={Css.dropdownContent}>
                                                <a onClick={() => toEditCategory(val, ind)}>Edit</a>
                                                <a onClick={() => { deleteCategory(val._id, ind) }} >Delete</a>
                                            </div>
                                        </div>
                                        <div style={{ padding: 10 }}>
                                            <img src={val.image} className={Css.cateImg} />
                                            <h6 className={Css.catName}>{val.category_name.split(" ").join("\n")}</h6>
                                        </div>
                                    </div>
                                     )}
                                     </Draggable>
                                })
                            }
                        </div>
                            )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>


                <div>
                    <h3 className={Css.tagHead}>Tags</h3>
                    <h4>Add New Tag</h4>
                    <div style={{ display: 'fex', }}>
                        <form style={{ display: 'inline' }} onSubmit={addTag}>
                            <input type="text" maxLength={15} value={tagName} onChange={(e) => setTagName(e.target.value)} className={Css.tagInp} required />
                            {isLoadingTag ?

                                <Loader />

                                :
                                <input type="submit" value="Add Tag" className={Css.addBtnStl} />
                            }
                        </form>
                    </div>
                    <div className="container">
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30 }}>
                            {
                                allTags && allTags.length > 0 && allTags.map((val, ind) => {
                                    return <div className={Css.tagDiv}>
                                        <div className={Css.dropdown}>
                                            <BsThreeDotsVertical className={`${Css.threeDot} ${Css.dropbtn}`} />
                                            <div className={Css.dropdownContent}>
                                                <a data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop" onClick={() => { setTagNameUpd(true); setTagName(val.name); setTagUpdData({ ...val, ind }) }}>Edit</a>
                                                <a onClick={() => { deleteTag(val.id, ind) }}>Delete</a>
                                            </div>
                                        </div>
                                        <h6 className={Css.tagName}>{val.name}</h6>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content borderradius-remove">
                            <div className="modal-header d-flex justify-content-center">
                                <h5 className="modal-title" id="staticBackdropLabel">Add Tag</h5>
                            </div>
                            <div className="modal-body">
                                <form id="addingmemberform" className="container">
                                    <div className="form-outline">
                                        <input className={Css.tagInp} name="tagName" type="text" onChange={(e) => setTagName(e.target.value)} value={tagName} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type='button' onClick={() => { tagNameUpd ? updateTag() : addTag() }} className={`${Css.updBtn} btn btn-info text-white borderradius-remove shadow-remove`} data-bs-dismiss="modal">
                                    {tagNameUpd ? "Update" : 'Add'}
                                </button>
                                <button onClick={() => { setTagName(""); setTagNameUpd(false) }} type="button" className={`${Css.cnlBtn} btn btn-warning text-white borderradius-remove shadow-remove`} data-bs-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;