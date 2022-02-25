const ActionType = {

        GET_USER_DATA:"GET_USER_DATA",

        USER_LOGIN_REQUEST :  "USER_LOGIN_REQUEST",
        USER_LOGIN_SUCCESS : "USER_LOGIN_SUCCESS",
        USER_LOGIN_FAIL : "USER_LOGIN_FAIL",
        USER_LOGIN_EMPTY_MESSAGE : "USER_LOGIN_EMPTY_MESSAGE",
        USER_LOGIN_CRED_INVALID:"USER_LOGIN_CRED_INVALID",

        USER_LOGOUT_FAIL:"USER_LOGOUT_FAIL",
        USER_LOGOUT_SUCCESS:"USER_LOGOUT_SUCCESS",
        USER_LOGOUT_START:"USER_LOGOUT_START",

     

        LOADING_STOPS:"LOADING_STOPS",

        FETCHING_CATEGORY:"FETCHING_CATEGORY",
        FETCHED_CATEGORY_SUCCESS:"FETCHED_CATEGORY_SUCCESS",
        FETCHED_CATEGORY_FAILED:"FETCHED_CATEGORY_FAILED",

        FETCHED_TAG_SUCCESS:"FETCHED_TAG_SUCCESS",
        FETCHED_FAILED_FAILED:"FETCHED_FAILED_FAILED",

        DELETING_TAG:"DELETING_TAG",
        TAG_DELETED_FAIL:"TAG_DELETED_FAIL",
        TAG_DELETED_SUCCESS:"TAG_DELETED_SUCCESS",

        DELETING_CATEGORY:"DELETING_CATEGORY",
        CATEGORY_DELETED_SUCCESS:"CATEGORY_DELETED_SUCCESS",
        CATEGORY_DELETED_FAIL:"CATEGORY_DELETED_FAIL",

        ADDING_TAG:"ADDING_TAG",
        TAG_ADDED_SUCCESS:"TAG_ADDED_SUCCESS",
        TAG_ADDED_FAIL:"TAG_ADDED_FAIL",

        TAG_UPDATED_FAIL:"TAG_UPDATED_FAIL",
        TAG_UPDATED_SUCCESS:"TAG_UPDATED_SUCCESS",
        UPDATING_TAG:"UPDATING_TAG",

        UPLOADING_CATEGORY:"UPLOADING_CATEGORY",
        UPLOAD_CATEGORY_SUCCESS:"UPLOAD_CATEGORY_SUCCESS",
        UPLOAD_CATEGORY_FAIL:"UPLOAD_CATEGORY_FAIL",

        IMAGES_UPLOAD_START:"IMAGES_UPLOAD_START",
        IMAGES_UPLOADED_SUCCESS:"IMAGES_UPLOADED_SUCCESS",
        IMAGES_UPLOADED_FAILED:"IMAGES_UPLOADED_FAILED",

        IMAGES_UPDATE_CATEGORY_UPLOADED_SUCCESS:"IMAGES_UPDATE_CATEGORY_UPLOADED_SUCCESS",


        ADD_CATEGORY_DATA_TO_REDUX:"ADD_CATEGORY_DATA_TO_REDUX",

        UPDATE_CATEGORY_DATA_START:"UPDATE_CATEGORY_DATA_START",
        UPDATE_CATEGORY_DATA_SUCCESS:"UPDATE_CATEGORY_DATA_SUCCESS",
        UPDATE_CATEGORY_DATA_FAIL:"UPDATE_CATEGORY_DATA_FAIL",

        FETCHING_ALL_USERS:"FETCHING_ALL_USERS",
        FETCHED_ALL_USERS_SUCCESS:"FETCHED_ALL_USERS_SUCCESS",
        FETCHED_ALL_USERS_FAIL:"FETCHED_ALL_USERS_FAIL",

   
        DELETING_USER:"DELETING_USER",
        DELETED_USER_SUCCESS:"DELETED_USER_SUCCESS",
        DELETED_USER_FAIL:"DELETED_USER_FAIL",

        FETCHING_ALL_PRODUCTS:"FETCHING_ALL_PRODUCTS",
        FETCHED_ALL_PRODUCTS_SUCCESS:"FETCHED_ALL_PRODUCTS_SUCCESS",
        FETCHED_ALL_PRODUCTS_FAILED:"FETCHED_ALL_PRODUCTS_FAILED",

        FETCHING_PAGINATION_PRODUCTS:"FETCHING_PAGINATION_PRODUCTS",
        NODATA_FETCHING_PAGINATION_PRODUCTS:"NODATA_FETCHING_PAGINATION_PRODUCTS",
        FETCHING_PAGINATION_PRODUCTS_SUCCESS:"FETCHING_PAGINATION_PRODUCTS_SUCCESS",
        FETCHING_PAGINATION_PRODUCTS_FAILED:"FETCHING_PAGINATION_PRODUCTS_FAILED",

        DELETING_PRODUCT:"DELETING_PRODUCT",
        PRODUCT_DELETED_SUCCESS:"PRODUCT_DELETED_SUCCESS",
        PRODUCT_DELETED_FAIL:"PRODUCT_DELETED_FAIL",

        EDIT_AD_DATA:"EDIT_AD_DATA",
        EDIT_AD_FIELD:"EDIT_AD_FIELD",
        USER_AD_UPDATING:"USER_AD_UPDATING",


        USER_AD_UPDATE_FAIL:"USER_AD_UPDATE_FAIL",
        USER_AD_UPDATE_SUCCESS:"USER_AD_UPDATE_SUCCESS",

        USER_CREATEAD_REQUEST:"USER_CREATEAD_REQUEST",
        USER_AD_UPLOAD_FAIL:"USER_AD_UPLOAD_FAIL",
        USER_AD_UPLOAD_SUCCESS:"USER_AD_UPLOAD_SUCCESS",

        ASSIGNING_PRODUCT:"ASSIGNING_PRODUCT",
        ASSIGNING_PRODUCT_SUCCESS:"ASSIGNING_PRODUCT_SUCCESS",
        ASSIGNING_PRODUCT_FAIL:"ASSIGNING_PRODUCT_FAIL"
}


export default ActionType