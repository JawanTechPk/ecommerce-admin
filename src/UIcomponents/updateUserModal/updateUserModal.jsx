import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PhoneNumberChange from "./phoneNumberChange";
import UserNameChange from "./userNameChange";
import styles from "./updateUserModal.module.css";
import PasswordChange from "./passwordChange";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyUserUpdateMsgAction,
  userUpdateAction,
} from "../../store/actions/userUpdateAction/userUpdateAction";
import ButtonLoader from "../loader/buttonLoader";
import { toast } from "react-toastify";
const UpdateUserModal = ({ show, handleClose, setShow, selectedUser }) => {
  const dispatch = useDispatch();
  const { userUpdateMessage, userUpdateError, userUpdateLoading } = useSelector(
    (state) => state.userUpdateReducer
  );

  const [phoneNumberUi, setPhoneNumberUi] = useState(false);
  const [passwordUi, setPasswordUi] = useState(false);
  const [userNameUi, setUserNameUi] = useState(false);

  const [newNumber, setNewNumber] = useState("");
  const [newPassword, setNewPasword] = useState("");
  const [newUserName, setNewUserName] = useState("");

  handleClose = () => {
    setShow(false);
    if (passwordUi) {
      setPasswordUi(false);
      setNewPasword("");
    }
    if (phoneNumberUi) {
      setNewNumber("");
      setPhoneNumberUi(false);
    }
    if (userNameUi) {
      setUserNameUi(false);
      setNewUserName("");
    }
  };

  const updateHandle = () => {
    if (newNumber || newPassword || newUserName) {
      dispatch(
        userUpdateAction(newNumber, newPassword, newUserName, selectedUser._id)
      );
    } else {
      toast.error("Please Enter Value");
    }
  };

  useEffect(() => {
    if (userUpdateMessage || userUpdateError) {
      setShow(false);
      dispatch(emptyUserUpdateMsgAction());
      if (passwordUi) {
        setPasswordUi(false);
        setNewPasword("");
      }
      if (phoneNumberUi) {
        setNewNumber("");
        setPhoneNumberUi(false);
      }
      if (userNameUi) {
        setUserNameUi(false);
        setNewUserName("");
      }
    }
  }, [userUpdateMessage]);

  return (
    <>
      <Modal
        dialogClassName={styles.modalMainBOx}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>USER UDPATE</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.userUpdateBox}>
          <section>
            {!phoneNumberUi && !passwordUi && !userNameUi ? (
              <ul>
                <li onClick={() => setPhoneNumberUi(true)}>
                  Change User Phone Number
                </li>
                <li onClick={() => setPasswordUi(true)}>
                  Change Or Reset User Password
                </li>
                <li onClick={() => setUserNameUi(true)}>Change User Name</li>
              </ul>
            ) : phoneNumberUi ? (
              <PhoneNumberChange
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                phoneNumber={selectedUser.phone_number}
              />
            ) : passwordUi ? (
              <PasswordChange
                newPassword={newPassword}
                setNewPasword={setNewPasword}
              />
            ) : userNameUi ? (
              <UserNameChange
                setNewUserName={setNewUserName}
                newUserName={newUserName}
                userName={selectedUser.user_name}
              />
            ) : null}
          </section>
        </Modal.Body>
        <Modal.Footer>
          {!phoneNumberUi &&
          !passwordUi &&
          !userNameUi ? null : userUpdateLoading ? (
            <ButtonLoader />
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                className={styles.modalFooterBtn}
                variant="primary"
                onClick={updateHandle}
              >
                Save Changes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
