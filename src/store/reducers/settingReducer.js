import ActionType from "../constants/constants";

const INITIAL_STATE = {

    categories: [],
    allTags: [],
    isLoading: false,
    adImages: [],
    productDetail: [],
    deletingProductId: null,
    imgLoad: false,
    isLoadingTag: false,
    uploadCatImg:"",
    isLoadingImg:false,
    editCategory:{}
};


const settingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionType.FETCHING_CATEGORY:
            return {
                ...state,

            };
        case ActionType.FETCHED_CATEGORY_SUCCESS:
            return {
                ...state,

                categories: action.payload.data
            };
        case ActionType.FETCHED_CATEGORY_FAILED:
            return {
                ...state,
                categories: []
            };
        case ActionType.FETCHED_TAG_SUCCESS:
            return {
                ...state,
                allTags: action.payload
            }
        case ActionType.DELETING_TAG:
            return {
                ...state,
                isLoadingTag: true
            };
        case ActionType.TAG_DELETED_SUCCESS:
            let arr = [...state.allTags];
            arr.splice(action.payload, 1);
            return {
                ...state,
                isLoadingTag: false,
                allTags: arr
            };
        case ActionType.TAG_DELETED_FAIL:
            return {
                ...state,
                isLoadingTag: false,
            };
            case ActionType.DELETING_CATEGORY:
                return {
                    ...state,
                    isLoading: true
                };
            case ActionType.CATEGORY_DELETED_SUCCESS:
                let arr1 = [...state.categories];
                arr1.splice(action.payload, 1);
                return {
                    ...state,
                    isLoading: false,
                    categories: arr1
                };
            case ActionType.CATEGORY_DELETED_FAIL:
                return {
                    ...state,
                    isLoading: false,
                };
                case ActionType.ADDING_TAG:
                    return {
                        ...state,
                        isLoadingTag: true
                    };
                case ActionType.TAG_ADDED_SUCCESS:                
                    return {
                        ...state,
                        isLoadingTag: false,
                    };
                case ActionType.TAG_ADDED_FAIL:
                    return {
                        ...state,
                        isLoadingTag: false,
                    }; 
                case ActionType.UPDATING_TAG:
                    return {
                        ...state,
                        isLoadingTag: true
                    };
                case ActionType.TAG_UPDATED_SUCCESS:
                    console.log(action.payload,'action.payload')
                    let arr2 = [...state.allTags];
                    // arr1.splice(action.payload, 1);
                    arr2[action.payload.ind]={...arr2[action.payload.ind],name:action.tag_name}
                    console.log(arr2)
                    return {
                        ...state,
                        isLoadingTag: false,
                        allTags: arr2
                    };
                case ActionType.TAG_UPDATED_FAIL:
                    return {
                        ...state,
                        isLoadingTag: false,
                    };
                    case ActionType.IMAGES_UPLOAD_START:
                        return {
                            ...state,
                            isLoadingImg: true
                        }
                        case ActionType.IMAGES_UPLOADED_SUCCESS:
                            return {
                                ...state,
                                isLoadingImg: false,
                                uploadCatImg:action.payload
                            }
                        case ActionType.UPLOAD_CATEGORY_FAIL:
                            return {
                                ...state,
                                isLoadingImg: false
                            };
                    case ActionType.UPLOADING_CATEGORY:
                        return {
                            ...state,
                            isLoading: true
                        }
                        case ActionType.UPLOAD_CATEGORY_SUCCESS:
                            return {
                                ...state,
                                isLoading: false,
                                uploadCatImg:""
                            }
                        case ActionType.UPLOAD_CATEGORY_FAIL:
                            return {
                                ...state,
                                isLoading: false
                            };
                            case ActionType.ADD_CATEGORY_DATA_TO_REDUX:
                            console.log(action.payload)    
                            return{
                                    ...state,
                                    editCategory:action.payload
                                }
                                case ActionType.IMAGES_UPDATE_CATEGORY_UPLOADED_SUCCESS:
                                    console.log(action,'state',state)
                                    return {
                                        ...state,
                                        isLoadingImg:false,
                                        editCategory:{...state.editCategory,image:action.payload[0].url} 
                                    }
                                    case ActionType.UPDATE_CATEGORY_DATA_START:
                                        return {
                                            ...state,
                                            isLoadingImg: true
                                        }
                                        case ActionType.UPDATE_CATEGORY_DATA_SUCCESS:
                                            return {
                                                ...state,
                                                isLoadingImg: false
                                            }
                                            case ActionType.UPDATE_CATEGORY_DATA_FAIL:
                                                return {
                                                    ...state,
                                                    isLoadingImg: false
                                                }
        default:
            return state;
    }
};




export { settingReducer }