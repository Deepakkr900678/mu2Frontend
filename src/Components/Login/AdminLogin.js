import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import "./StudentLogin.css";
import Logo from "./logo.png";
import { Card, Col } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Slices/authSlice";
import { useHistory } from "react-router-dom";

//MSAL
import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../../authConfig";
import {
  useAdminOrWardenMsalLoginMutation,
  useStudentMsalLoginMutation,
} from "../../Slices/authApiSlice";

const AdminLogin = () => {
  const [msalStudenLogin] = useStudentMsalLoginMutation();
  const [msalAdminOrWardenLogin] = useAdminOrWardenMsalLoginMutation();
  const [userName, setUserName] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance, accounts } = useMsal();

  const handleLogin = async (loginType) => {
    // let res;
    // if (loginType === "popup") {
    //   res = await instance.loginPopup(loginRequest).catch((e) => {});
    //   const msalLoginRes = await msalAdminOrWardenLogin({
    //     email: res.account.username,
    //   });
    //   console.log(msalLoginRes);
    //   if (msalLoginRes) {
    //     dispatch(
    //       setCredentials({
    //         ...msalLoginRes.data.UserInfo,
    //         MuAuthToken: msalLoginRes.data.MuToken,
    //         isAuthenticated: true,
    //         role: msalLoginRes.data.UserInfo.TYPE,
    //       })
    //     );
    //     history.push("/approval");
    //   }
    // }
  };

  const handleAdminLogin = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  useEffect(() => {
    const handleRedirect = () => {
      if (accounts.length > 0) {
        const account = accounts[0];
        const email = account.username;
        msalAdminOrWardenLogin({ email })
          .then((msalLoginRes) => {
            if (msalLoginRes) {
              dispatch(
                setCredentials({
                  ...msalLoginRes.data.UserInfo,
                  MuAuthToken: msalLoginRes.data.MuToken,
                  isAuthenticated: true,
                  role: msalLoginRes.data.UserInfo.TYPE,
                })
              );
              history.push("/approval");
            }
          })
          .catch((error) => {
            console.error("Error logging in:", error);
          });
      }
    };
    handleRedirect();
  }, [accounts, dispatch, history, msalAdminOrWardenLogin]);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     if (userName) {
  //       const msalLoginRes = await msalAdminOrWardenLogin({
  //         email: userName,
  //       });
  //       console.log(msalLoginRes);
  //       if (msalLoginRes) {
  //         dispatch(
  //           setCredentials({
  //             ...msalLoginRes.data.UserInfo,
  //             MuAuthToken: msalLoginRes.data.MuToken,
  //             isAuthenticated: true,
  //             role: msalLoginRes.data.UserInfo.TYPE,
  //           })
  //         );
  //         history.push("/approval");
  //       }
  //     }
  //   };
  //   fetchInfo();
  // });

  //Firebase
  const onFinish = (values) => {
    const auth = getAuth();
    const { username, password } = values;
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const email = user.email;
        dispatch(
          setCredentials({
            email,
            role: "warden",
            isAuthenticated: true,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div>
        <Card>
          <img className="logo-reset" src={Logo} alt="Mahindra University" />
          <br />
          <Card.Body>
            {/* <Card.Title>Admin Login for outpass Approval</Card.Title> */}
            <Card.Text>
              <Col>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  // onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button onClick={handleAdminLogin}>Microsoft Login</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Card.Text>

            <br />
            <br />
          </Card.Body>
        </Card>
      </div>

    </div>
  );
};

export default AdminLogin;
