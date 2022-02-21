import ActionType from "../../constants/constants";
import { baseUrl } from "../../../util/utils";
import { toast } from "react-toastify";
import axios from "axios";

const stopLoading = () => {
  return (dispatch) => {
    dispatch({
      type: ActionType.LOADING_STOPS,
    });
  };
};

const editAds = (addObj, user, history) => {
  return (dispatch) => {
    let {
      _id,
      type,
      title,
      details,
      images,
      insurance,
      insurance_price,
      address,
      status,
      location,
      tags,
      free_delivery,
      rental_price,
    } = addObj;
    dispatch({
      type: ActionType.USER_AD_UPDATING,
    });

    if (!type.trim()) {
      toast.warning("Select AD Type");
      dispatch(stopLoading());
    } else if (!address.country.trim()) {
      toast.warning("Select Country Name");
      dispatch(stopLoading());
    } else if (!address.state.trim()) {
      toast.warning("Select State Name");
      dispatch(stopLoading());
    } else if (!address.city.trim()) {
      toast.warning("Select City Name");
      dispatch(stopLoading());
    } else if (!title.trim()) {
      toast.warning("Select AD Title");
      dispatch(stopLoading());
    } else if (!details.trim()) {
      toast.warning("Select AD Detail");
      dispatch(stopLoading());
    } else if (images.length == 0) {
      toast.warning("Select AD Images");
      dispatch(stopLoading());
    } else if (!rental_price.day.trim()) {
      toast.warning("Select AD Daily Price");
      dispatch(stopLoading());
    } else if (!rental_price.weekly.trim()) {
      toast.warning("Select AD Weekly Price");
      dispatch(stopLoading());
    } else if (!rental_price.montly.trim()) {
      toast.warning("Select AD Monthly Price");
      dispatch(stopLoading());
    } else if (!rental_price.other.trim()) {
      toast.warning("Select AD Other Price");
      dispatch(stopLoading());
    } else if (insurance && insurance_price == 0) {
      toast.warning("Select AD Insurance Price");
      dispatch(stopLoading());
    } else {
      let obj = {
        admin: user.userId,
        images,
        location: {
          type: "Point",
          coordinates: [location.coordinates[0], location.coordinates[1]],
        },
        type,
        title,
        details,
        tags,
        rental_price: {
          day: rental_price.day,
          weekly: rental_price.weekly,
          montly: rental_price.montly,
          other: rental_price.other,
        },
        address: {
          country: address.country,
          state: address.state,
          city: address.city,
        },
        free_delivery,
        insurance,
        insurance_price,
        status,
      };
      axios
        .post(`${baseUrl}product/${_id}`, obj)
        .then((success) => {
          if (success.data.code) {
            toast.error(success.data.reason || success.data.message);
            dispatch({
              type: ActionType.USER_AD_UPDATE_FAIL,
            });
          } else {
            dispatch(stopLoading());
            toast.success(success.data.message);
            setTimeout(()=>{
                history.push('/home')
            },2000)
            dispatch({
              type: ActionType.USER_AD_UPDATE_SUCCESS,
            });
          }
        })
        .catch((err) => {
          dispatch(stopLoading());
          dispatch({
            type: ActionType.USER_AD_UPDATE_FAIL,
          });
        });
    }
  };
};

export { editAds };
