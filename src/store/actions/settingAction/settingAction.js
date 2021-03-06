import axios from "axios";
import { baseUrl } from "../../../util/utils";
import ActionType from "../../constants/constants";
import { toast } from "react-toastify";

const getAllCategory = () => {
    return (dispatch) => {
      dispatch({
        type: ActionType.FETCHING_CATEGORY,
      });
      axios
        .get(`${baseUrl}category`)
        .then((success) => {
          dispatch({
            type: ActionType.FETCHED_CATEGORY_SUCCESS,
            payload: success,
          });
        })
        .catch((err) => {
          dispatch({
            type: ActionType.FETCHED_CATEGORY_FAILED,
          });
        });
    };
  };

  const getAllTags = () => {
    return (dispatch) => {
      axios
        .get(`${baseUrl}tag`)
        .then((success) => {
          dispatch({
            type: ActionType.FETCHED_TAG_SUCCESS,
            payload: success.data.map((val) => {
              return { id: val._id, name: val.tag_name };
            }),
          });
        })
        .catch((err) => {
          dispatch({
            type: ActionType.FETCHED_FAILED_FAILED,
          });
        });
    };
  };

  const deleteCategoryAction =(id,index)=>{
    console.log(id,index)
  return (dispatch) => {
      dispatch({
        type: ActionType.DELETING_CATEGORY,
        payload: id
      })
      // let obj = { data: { owner: ownerId } }
      axios.delete(`${baseUrl}category/${id}`)
        .then((success) => {
          if (success.data.code) {
            toast.error(success.data.reason || success.data.message)
            dispatch({
              type: ActionType.CATEGORY_DELETED_FAIL,
            })
          } else {
            toast.success(success.data.message)
              dispatch({
                type: ActionType.CATEGORY_DELETED_SUCCESS,
                payload: index
              })
          }
        })
        .catch((err) => {
          toast.error("tag not deleted")
          dispatch({
            type: ActionType.CATEGORY_DELETED_FAIL,
          })
        })
    }
}



  const deleteTagAction =(id,index)=>{
      console.log(id,index)
    return (dispatch) => {
        dispatch({
          type: ActionType.DELETING_TAG,
        })
        // let obj = { data: { owner: ownerId } }
        axios.delete(`${baseUrl}tag/${id}`)
          .then((success) => {
            if (success.data.code) {
              toast.error(success.data.reason || success.data.message)
              dispatch({
                type: ActionType.TAG_DELETED_FAIL,
              })
            } else {
              toast.success(success.data.message)
                dispatch({
                  type: ActionType.TAG_DELETED_SUCCESS,
                  payload: index
                })
            }
          })
          .catch((err) => {
            toast.error("tag not deleted")
            dispatch({
              type: ActionType.TAG_DELETED_FAIL,
            })
          })
      }
  }


  const addTagAction=(admin_ref,tag_name)=>{
      console.log(admin_ref,tag_name,'admin_ref,tag_name')
      return (dispatch)=>{
        dispatch({
            type: ActionType.ADDING_TAG,
          })
          let obj = { admin_ref,tag_name }
          axios.post(`${baseUrl}tag`,obj)
            .then((success) => {
                console.log(success,'success')
              if (success.data.code) {
                toast.error(success.data.reason || success.data.message)
                dispatch({
                  type: ActionType.TAG_ADDED_FAIL,
                })
              } else {
                toast.success(success.data.message)
                  dispatch({
                    type: ActionType.TAG_ADDED_SUCCESS
                  })
                  dispatch(getAllTags())
              }
            })
            .catch((err) => {
              toast.error("tag not Addedd")
              dispatch({
                type: ActionType.TAG_ADDED_FAIL,
              })
            })
      }
  }


  const updTagAction =(admin_ref,tag_name,tagData)=>{
    console.log(admin_ref,tag_name,tagData,'admin_ref,tag_name')
    return (dispatch)=>{
      dispatch({
          type: ActionType.UPDATING_TAG,
        })
        let obj = { admin_ref,tag_name }
        axios.post(`${baseUrl}tag/${tagData.id}`,obj)
          .then((success) => {
              console.log(success,'success')
            if (success.data.code) {
              toast.error(success.data.reason || success.data.message)
              dispatch({
                type: ActionType.TAG_UPDATED_FAIL,
              })
            } else {
              toast.success(success.data.message)
                dispatch({
                  type: ActionType.TAG_UPDATED_SUCCESS,
                  payload:tagData,
                  tag_name
                })
                dispatch(getAllTags())
            }
          })
          .catch((err) => {
            toast.error("tag not Addedd")
            dispatch({
              type: ActionType.TAG_UPDATED_FAIL,
            })
          })
    }
  }


  const uploadCategoryAction=(admin_ref,category_name,image,position)=>{
    return (dispatch)=>{
      dispatch({
        type: ActionType.UPLOADING_CATEGORY,
      })
      let obj = { admin_ref,
        category_name,
        image,
        position }
      axios.post(`${baseUrl}category`,obj)
      .then((success) => {
          console.log(success,'success')
        if (success.data.code) {
          toast.error(success.data.reason || success.data.message)
          dispatch({
            type: ActionType.UPLOAD_CATEGORY_FAIL,
          })
        } else {
          toast.success(success.data.message)
            dispatch({
              type: ActionType.UPLOAD_CATEGORY_SUCCESS,
            })
            dispatch(getAllCategory())
        }
      })
      .catch((err) => {
        toast.error("category not Addedd")
        dispatch({
          type: ActionType.UPLOAD_CATEGORY_FAIL,
        })
      })
    }
  }

const saveEditCatToRedux=(val,ind)=>{
return (dispatch)=>{
dispatch({
  type:ActionType.ADD_CATEGORY_DATA_TO_REDUX,
  payload:{...val,ind}
})
}
}

  const updateCatDataAction =(editCategoryData)=>{
    console.log(editCategoryData,'editCategoryData')
    return (dispatch)=>{
dispatch({
  type:ActionType.UPDATE_CATEGORY_DATA_START,
})
let {admin_ref,_id,category_name,image,position}= editCategoryData
let obj = { admin_ref,category_name,image,position}
axios.post(`${baseUrl}category/${_id}`,obj)
  .then((success) => {
      console.log(success,'success')
    if (success.data.code) {
      toast.error(success.data.reason || success.data.message)
      dispatch({
        type: ActionType.UPDATE_CATEGORY_DATA_FAIL,
      })
    } else {
      toast.success(success.data.message)
        dispatch({
          type: ActionType.UPDATE_CATEGORY_DATA_SUCCESS,
        })
        dispatch(getAllTags())
    }
  })
  .catch((err) => {
    toast.error("tag not Addedd")
    dispatch({
      type: ActionType.UPDATE_CATEGORY_DATA_FAIL,
    })
  })

    }
  }

const uploadCategoryImg =(img,cond,editCategory,admin_ref)=>{
  return (dispatch)=>{
    dispatch({
      type: ActionType.IMAGES_UPLOAD_START
    })
    const headers = { "Content-Type": "application/json" };
    var formData = new FormData();
    formData.append("imgCollection", img);
    formData.append("product_uid", "");
    formData.append("updateFlag",false );
    axios
      .post(`${baseUrl}imageupload`, formData, {
        headers,
      })
      .then((success) => {
        console.log(success,'success')
        if (success.data.code) {
          toast.error(success.data.reason || success.data.message)
          dispatch({
            type: ActionType.UPLOAD_CATEGORY_FAIL,
          })
        } else {
          if(cond == "updateImgCat"){
            dispatch({
              type: ActionType.IMAGES_UPDATE_CATEGORY_UPLOADED_SUCCESS,
              payload: success.data,
            })
            dispatch(updateCatDataAction({...editCategory,image:success.data[0].url,admin_ref}))
          }else{
            dispatch({
              type: ActionType.IMAGES_UPLOADED_SUCCESS,
              payload: success.data
            })
          }
        }
      })
      .catch((err) => {
        dispatch({
                    type: ActionType.IMAGES_UPLOADED_FAILED,
                  });
                });
            };
  }





  export {
    updTagAction,
    getAllCategory,
    getAllTags,
    deleteCategoryAction,
    deleteTagAction,
    addTagAction,
    uploadCategoryAction,
    uploadCategoryImg,
    updateCatDataAction,
    saveEditCatToRedux
  };
  