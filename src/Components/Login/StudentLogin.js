import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import "./StudentLogin.css";
import Logo from "./logo.png";
import { Card, Col } from "react-bootstrap";
import {
  useStudentLoginMutation,
  useStudentMsalLoginMutation,
} from "../../Slices/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Slices/authSlice";
import { useHistory } from "react-router-dom";

//MSAL
import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "../../authConfig";

const StudentLogin = (props) => {
  const [studentLogin] = useStudentLoginMutation();
  const [msalStudenLogin] = useStudentMsalLoginMutation();
  const [normalLogin, setNormalLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    const { username, password } = values;
    setNormalLogin(true);
    // const result = await studentLogin({ username, password });

    // localStorage.setItem("jwtToken", result.data.token);
    // dispatch(
    //   setCredentials({ HTNO: username, role: "Student", isAuthenticated: true })
    // );
    // if (result) {
    //   history.push("/form");
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //MSAL
  const { instance, accounts } = useMsal();

  const onClickLogin = async () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  useEffect(() => {
    const handleRedirect = () => {
      if (accounts.length > 0) {
        const account = accounts[0];
        const email = account.username;
        msalStudenLogin({
          emailId: email,
        })
          .then((msalLoginRes) => {
            if (msalLoginRes) {
              const credentials = msalLoginRes.data.response;
              if (msalLoginRes) {
                dispatch(
                  setCredentials({
                    ...credentials,
                  })
                );
                history.push("/form");
              }
            }
          })
          .catch((error) => {
            console.error("Error logging in:", error);
          });
      }
    };
    handleRedirect();
  }, [accounts, dispatch, history, msalStudenLogin]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
        //className="resetcard"
      >
        <Card>
          <img className="logo-reset" src={Logo} alt="Mahindra University" />
          <br />
          <Card.Body>
            {/* <Card.Title>Login</Card.Title> */}
            <Card.Text>
              <Col>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <div>
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
                  </div>
                  {props.error === "error" && (
                    <div className="alert-danger" style={{ margin: "20px" }}>
                      Incorrect details!
                    </div>
                  )}
                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Button type="primary" disabled={true} htmlType="submit">
                        Submit
                      </Button>
                    </div>
                    {normalLogin && (
                      <div
                        className="alert-danger"
                        style={{ margin: "20px", color: "red" }}
                      >
                        Login using Microsoft authentication
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button onClick={onClickLogin}>Microsoft Login</Button>
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

export default StudentLogin;
