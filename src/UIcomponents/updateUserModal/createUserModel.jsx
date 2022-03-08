import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  emptyCreateUserMsgAction,
  userCreateAction,
} from "../../store/actions/userUpdateAction/createUser";
import ButtonLoader from "../loader/buttonLoader";
import styles from "./createUserModal.module.css";
const CreateUserModel = ({
  createModalShow,
  setCreateModalShow,
  createModalClose,
  createModalShowFun,
}) => {
  const dispatch = useDispatch();
  const {
    userCreateData,
    userCreateMessage,
    userCreateError,
    userCreateLoading,
  } = useSelector((state) => state.createUserReducer);

  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const createUserHandler = () => {
    if (!userName || !userPassword || !userNumber) {
      toast.error("Required field are missing");
    } else {
      dispatch(userCreateAction(userName, userPassword, userNumber));
    }
  };

  createModalClose = () => {
    setCreateModalShow(false);
  };

  useEffect(() => {
    if (userCreateMessage || userCreateError) {
      setCreateModalShow(false);
      dispatch(emptyCreateUserMsgAction());
      setUserNumber("");
      setUserPassword("");
      setUsername("");
    }
  }, [userCreateMessage]);
  return (
    <>
      <Modal
        dialogClassName={styles.modalMainBOx}
        show={createModalShow}
        onHide={createModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.userCreateBox}>
          <section>
            <label htmlFor="name">User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              id="name"
              placeholder="User Name"
            />
            <label htmlFor="number">User Number:</label>
            <input
              type="number"
              id="number"
              value={userNumber}
              onChange={(e) => setUserNumber(e.target.value)}
              placeholder="User Number"
            />
            <label htmlFor="password">User Password:</label>
            <input
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="User Password"
            />
          </section>
        </Modal.Body>
        <Modal.Footer>
          {userCreateLoading ? (
            <ButtonLoader />
          ) : (
            <>
              <Button variant="secondary" onClick={createModalClose}>
                Close
              </Button>
              <Button
                className={styles.modalFooterBtn}
                variant="primary"
                onClick={createUserHandler}
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

export default CreateUserModel;
