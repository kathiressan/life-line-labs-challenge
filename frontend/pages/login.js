import { useEffect, useState } from "react";
import md5 from "md5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circle } from "better-react-spinkit";
import styles from "../styles/Login.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/slices/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (getUser) {
      router.push("/");
    }
  }, [getUser]);

  const notifySuccess = () =>
    toast.success("Login Succesful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  const notifyFailed = () =>
    toast.error("Invalid Credentials!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const submitCredentials = async () => {
    setLoading(true);
    await fetch(
      `https://lll-challenge-api.herokuapp.com/user/login/?username=${username}`
    ).then((res) => {
      const waitjson = async () => {
        const data = await res.json();
        const hashedPassword = password + data.salt;
        const password_md5 = md5(hashedPassword);
        if (password_md5 == data.md5) {
          console.log("Correct credentials");
          notifySuccess();
          dispatch(setUser());
          console.log(getUser);
        } else {
          console.log("Wrong credentials");
          notifyFailed();
        }
        setLoading(false);
      };
      waitjson();
    });
  };
  return (
    <div>
      {!getUser && (
        <div className={styles.container}>
          <div>
            <ToastContainer />
            <div className={styles.usernameContainer}>
              <div>Username:</div>
              <div>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                />
              </div>
            </div>
            <div className={styles.passwordContainer}>
              <div>Password:</div>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                />
              </div>
            </div>
            <div>
              <button onClick={submitCredentials}>Submit</button>
            </div>
            <div className={styles.spinner}>
              {loading && <Circle size={50} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
