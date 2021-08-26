// import Head from "next/head";
import { useEffect, useState } from "react";
import { Table } from "../components/Table/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import styles from "../styles/Index.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useRouter } from "next/router";

export default function Home() {
  const getUser = useSelector(selectUser);
  const [users, setUsers] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [input, setInput] = useState("0");
  const router = useRouter();

  useEffect(() => {
    if (!getUser) {
      router.push("/login");
    }
  }, [getUser]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch("https://lll-challenge-api.herokuapp.com/user/");
      const data = await res.json();
      setUsers(data);
    };
    getUserData();
  }, []);

  useEffect(() => {
    setPages(Math.floor(users?.length / perPage));
  }, [perPage, users?.length]);

  useEffect(() => {
    setInput(String(page + 1));
  }, [page]);

  let items = users?.slice(page * perPage, (page + 1) * perPage);

  const notifyFailed = (message) =>
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const prevButton = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextButton = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const inputPage = (e) => {
    setInput(e.target.value);
  };

  const searchPage = () => {
    if (input.match(/^[0-9]+$/)) {
      if (parseInt(input) >= 1) {
        if (parseInt(input) <= pages + 1) {
          setPage(parseInt(input) - 1);
        } else {
          notifyFailed(`Error! You can only search up to ${pages + 1} pages.`);
        }
      } else {
        notifyFailed(
          `Error! You need to search for pages starting from 1 and above.`
        );
      }
    } else {
      notifyFailed(
        `Error! Your search can only contain positive numerical values.`
      );
    }
  };

  return (
    <div className={items && styles.containerWrapper}>
      <div className={styles.container}>
        {items ? (
          <div>
            <ToastContainer />
            <Table items={items} />
            <div className={styles.bottomPart}>
              <div onClick={prevButton} className={styles.btn}>
                Previous
              </div>
              <div>
                <input type="text" value={input} onChange={inputPage} />
              </div>
              <div onClick={nextButton} className={styles.btn}>
                Next
              </div>
            </div>
            <div
              onClick={searchPage}
              className={classnames(styles.btn, styles.btn_search)}
            >
              Search (Pages: 1 - {pages + 1})
            </div>
          </div>
        ) : (
          <div className={styles.loader}>Loading data...</div>
        )}
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://lll-challenge-api.herokuapp.com/user/");
//   const users = await res.json();

//   return {
//     props: {
//       users,
//     },
//   };
// }
