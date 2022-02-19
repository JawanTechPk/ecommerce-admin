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
const { isLoadingImg,uploadCatImg,categories } = useSelector((state) => state.settingReducer)
const [catPosi,setCatPosi]= useState(categories.length);

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
        dispatch(uploadCategoryAction(user.userId,catText,uploadCatImg[0].url,catPosi));
        setCatText('')
    }
}

useEffect(()=>{
setCatPosi(categories.length+1)
},[categories])

const uploadImg=(img)=>{
    console.log(img.size / 1024 ,'img')
          let flag = false;

            const size = (img.size / 1024).toFixed(2);
            if (size > 10) {
              flag = true
            } else {
                dispatch(uploadCategoryImg(img))
            }
          if (flag) {
            toast.error('icon are not allowed bigger then 10kb')
          }

}

    return (
        <>
                  <ToastContainer />
            <div className={Css.mainContainer}>
<div className={Css.addCatDiv}>

<div className={Css.CateIptDiv}>
    <br />
<input placeholder="Category Name" maxLength={15} type="text" value={catText} onChange={(e)=>setCatText(e.target.value)} className={Css.cateInp}/>
</div>
<div className={Css.CateInpPosiDiv}>
<input placeholder="Position"
    type = "text"
    maxlength ="5"  value={catPosi} onChange={(e)=>setCatPosi(e.target.value)} className={Css.cateInpPosi}/>
</div>

{
isLoadingImg?
<div style={{     height:50,
      width:'30%',padding: 8,
      marginLeft: '3%',
      marginTop:10,}}>
<Loader />
</div>
:
<div className={Css.fileSpan}>
{/* <div className={Css.CateInpFileDiv} > */}
<label>
                      Upload Images
<input type="file" className="uploadCV"
    accept="image/*"
    onChange={(e) => {
        console.log(e.target.files,'e.target.files')
        uploadImg(e.target.files[0])
    }}
/>
</label>
</div>
}
<button className={Css.addBtnStl} onClick={()=>uploadCategory()}>
    Add Category
</button>
</div>
<p className={Css.notePara}>Note : This category will be put in the last of the list if your given category position already exist </p>
{
    uploadCatImg ? 
<img src={uploadCatImg[0].url} style={{widht:100,height:100,marginLeft:20}} />
    :null
}
            </div>
        </>
    )
}

export default AddCategory
