import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  document.title = "Giriş | ER2 Studio";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const openToken = jwtDecode(token);
      if (
        openToken.email === process.env.REACT_APP_ENTERING &&
        openToken.password === process.env.REACT_APP_PASSWORD
      ) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("token");
      }
    } else {
    }
  }, []);

  const login = async (item) => {
    const result = await axios.post(
      `${process.env.REACT_APP_BOSS}/admin/login`,
      item
    );

    if (result.data.res === 2) {
      alert("Hatalı giriş !");
    } else {
      localStorage.setItem("token", JSON.stringify(result.data.token));
      navigate("/dashboard");
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <div style={{height:"100vh"}} className="bg-pattern">
        <div className="bg-overlay"></div>
        <div className="account-pages pt-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xl={4}>
                <Card style={{marginTop:120}}>
                  <CardBody className="p-4">
                    <div>
                      <div className="text-center">
                        <img
                          src={logodark}
                          alt=""
                          height="24"
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="24"
                          className="auth-logo logo-light mx-auto"
                        />
                      </div>
                      <h4 className="font-size-18 text-muted mt-2 text-center">
                        Hoşgeldin dayi !
                      </h4>

                      <Formik
                        initialValues={{
                          email: "",
                          password: "",
                        }}
                        onSubmit={(values) => {
                          login(values);
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <Row>
                              <Col md={12}>
                                <div className="mb-4">
                                  <Label className="form-label">
                                    Kullanıcı Adı
                                  </Label>
                                  <Input
                                    name="email"
                                    className="form-control"
                                    placeholder="Kullanıcı Adınız"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                </div>
                                <div className="mb-4">
                                  <Label className="form-label">Şifre</Label>
                                  <Input
                                    name="password"
                                    value={values.password}
                                    type="password"
                                    placeholder="Şifreniz"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </div>

                                <div className="d-grid mt-4">
                                  <button
                                    className="btn btn-primary waves-effect waves-light"
                                    type="submit"
                                  >
                                    Giriş Yap
                                  </button>
                                </div>
                                <div className="mt-4 text-center"></div>
                              </Col>
                            </Row>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
