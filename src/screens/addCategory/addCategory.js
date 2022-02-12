import React, { useState, useEffect } from 'react';
import { uploadCategoryImg,uploadCategoryAction } from '../../store/actions/settingAction/settingAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../UIcomponents/loader/loader';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Css from './addCategory.module.css'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";

const AddCategory = () => {
    const history = useHistory();
    const dispatch = useDispatch();
const [addImage,setAddImage]= useState('');
const [catText,setCatText]= useState('');
const { user } = useSelector((state) => state.userLoginReducer)
const { isLoadingImg,uploadCatImg } = useSelector((state) => state.settingReducer)

const uploadCategory =()=>{
    console.log('asdasd',catText,'asdasd',uploadCatImg)
    if(!catText.trim()){
        console.log('1')
        toast.error("Enter category title")
    }else if(!uploadCatImg){
        console.log('2')
        toast.error("Select category icon")
    }
    else{
        console.log('sadkahsdka')
        dispatch(uploadCategoryAction(user.userId,catText,uploadCatImg[0].url,0));
        setCatText('')
    }
}

const uploadImg=(img)=>{
    console.log(img,'img')
          let flag = false;

            const size = (img.size / 1024 / 1024).toFixed(2);
            if (size > 10) {
              flag = true
            } else {
                dispatch(uploadCategoryImg(img))
            }
          if (flag) {
            toast.error('image are not allowed bigger then 10mb')
          }

}

    return (
        <>
                  <ToastContainer />
            <div className={Css.mainContainer}>
<div className={Css.addCatDiv}>

<div style={{width:'30%'}}>
    <label className={Css.labelStl}>Company Name</label>
    <br />
<input maxLength={15} type="text" value={catText} onChange={(e)=>setCatText(e.target.value)} className={Css.cateInp}/>
</div>

{
isLoadingImg?
<Loader />
:
<input type="file" className="uploadCV"
  style={{
      border: "1px dotted #006838",
      padding: 8,
      marginLeft: '3%',
      marginTop:40,
      height:50,
      width: "40%",
    }}
    accept="image/*"
    onChange={(e) => {
        console.log(e.target.files,'e.target.files')
        uploadImg(e.target.files[0])
    }}
/>
}
<button className={Css.addBtnStl} onClick={()=>uploadCategory()}>
    Add Category
</button>
</div>
{
    uploadCatImg ? 
<img src={uploadCatImg[0].url} style={{widht:300,height:200}} />
    :null
}
            </div>
        </>
    )
}

export default AddCategory
