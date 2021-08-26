import { useState } from "react";
import Modal from "react-modal";
import { TableModal } from "../TableModal/TableModal";
import styles from "./TableData.module.scss";

export const TableData = ({ item }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      color: "black",
    },
  };
  Modal.setAppElement("body");
  return (
    <>
      <tr onClick={openModal} className={styles.tableRow}>
        <td>
          <img src={item.picture.medium} alt="" />
        </td>
        <td>{item.name.first}</td>
        <td>{item.name.last}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
      </tr>
      <tr className={styles.separator} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className={styles.btn}>
          X
        </button>
        <TableModal item={item} />
      </Modal>
    </>
  );
};
