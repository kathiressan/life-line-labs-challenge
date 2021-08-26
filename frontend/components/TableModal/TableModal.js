import styles from "./TableModal.module.scss";

export const TableModal = ({ item }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.Img}>
        <img src={item.picture.medium} alt="" />
      </div>
      <div>
        <span>First Name:</span> {item.name.first}
      </div>
      <div>
        <span>Last Name:</span> {item.name.last}
      </div>
      <div>
        <span>Email:</span> {item.email}
      </div>
      <div>
        <span>Phone:</span> {item.phone}
      </div>
      <div>
        <span>Address:</span> {item.location.street.number},{" "}
        {item.location.street.name}, {item.location.postcode}{" "}
        {item.location.city}, {item.location.state}, {item.location.country}
      </div>
      <div>
        <span>Date of Birth:</span> {item.dob.date}
      </div>
    </div>
  );
};
