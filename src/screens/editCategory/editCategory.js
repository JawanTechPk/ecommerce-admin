import React, { useState, useEffect } from 'react';
import { updateCatDataAction,uploadCategoryImg,uploadCategoryAction } from '../../store/actions/settingAction/settingAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../UIcomponents/loader/loader';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Css from './editCategory.module.css'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import Navbar from '../../UIcomponents/navbar/navbar'

const EditCategory = () => {
    const history = useHistory();
    const dispatch = useDispatch();
const [addImage,setAddImage]= useState('');
const [catText,setCatText]= useState('');
const [catPosi,setCatPosi]= useState('');
const { user } = useSelector((state) => state.userLoginReducer)
const { isLoadingImg,uploadCatImg,editCategory } = useSelector((state) => state.settingReducer)

const editCategoryData =()=>{
    console.log('asdasd',catText,'asdasd',uploadCatImg)
    if(!catText.trim()){
        console.log('1')
        toast.error("Enter category title")
    }else if(!editCategory.image){
        console.log('2')
        toast.error("Select category icon")
    }
    else{
        console.log('sadkahsdka')
        dispatch(updateCatDataAction({...editCategory,position:catPosi,category_name:catText,admin_ref:user.userId}));
        setCatText('')
    }
}

const editImg=(img)=>{
    console.log(img,'img')
          let flag = false;

            const size = (img.size / 1024 / 1024).toFixed(2);
            if (size > 10) {
              flag = true
            } else {
                dispatch(uploadCategoryImg(img,'updateImgCat',editCategory,user.userId))
            }
          if (flag) {
            toast.error('image are not allowed bigger then 10mb')
          }

}

useEffect(()=>{
setCatText(editCategory.category_name);
setAddImage(editCategory.image);
setCatPosi(editCategory.position)
},[])

    console.log(editCategory,'addImage')
    return (
        <>
               <div >
            <Navbar />
            <div className="container">

    
                  <ToastContainer />
            <div className={Css.mainContainer}>
<div className={Css.addCatDiv}>

<input  type="text" value={catText} onChange={(e)=>setCatText(e.target.value)} style={{ width:'20%',
    borderRadius:10,
    height:50,
    paddingLeft:10,
    backgroundColor:'#f2eded',
    border: 'none'}}/>
<input  type="text" value={catPosi} onChange={(e)=>setCatPosi(e.target.value)} style={{ width:'20%',
    borderRadius:10,
    height:50,
    paddingLeft:10,
    marginLeft:10,
    backgroundColor:'#f2eded',
    border: 'none'}}/>

<input type="file" className="uploadCV"
  style={{
      border: "1px dotted #006838",
      padding: 8,
      marginLeft:20,
      height:50,
      width: "40%",
    }}
    accept="image/*"
    onChange={(e) => {
        console.log(e.target.files,'e.target.files')
        editImg(e.target.files[0])
    }}
/>
{
    
    isLoadingImg?
    <Loader />
    :
<button className={Css.addBtnStl} onClick={()=>editCategoryData()}>

    Update Category
</button>
}
    </div>
{/* {
    uploadCatImg ? 
<img src={editCategory.image[0].url} style={{widht:300,height:200}} />
    : */}
    <img src={editCategory.image} style={{widht:300,height:200}} />
{/* } */}
            </div>
            </div>
            </div>
        </>
    )
}

export default EditCategory
