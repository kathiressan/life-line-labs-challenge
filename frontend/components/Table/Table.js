import { TableData } from "../TableData/TableData";
import styles from "./Table.module.scss";

export const Table = ({ items }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableData key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
