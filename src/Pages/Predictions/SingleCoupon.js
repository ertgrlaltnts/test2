import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleCoupon = () => {
  const [dataBets, setDataBets] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const result = await axios.put(
      `${process.env.REACT_APP_BOSS}/admin/bet/update`,
      values
    );
    if (result.data.res === 1) {
      navigate("/coupons");
    } else {
      alert("Bir hata oluştu");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_BOSS}/admin/bet`);
      const temp = result.data.bets.find((item) => item._id === id);
      setDataBets(temp);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Kuponu Düzenle" />
          {loading ? (
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"70vh"}}>
            <Spinner
              style={{
                height: "10rem",
                width: "10rem",
              }}
            >
              Loading...
            </Spinner>
            </div>
          ) : (
            <Row>
              <Col>
                <Formik
                  innerRef={formRef}
                  initialValues={{ ...dataBets }}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    handleSubmit(values);
                    console.log(values);
                  }}
                >
                  {({ values, handleChange, handleBlur }) => (
                    <Form>
                      {values?.matches?.map((item, index) => (
                        <Card key={index}>
                          <CardBody>
                            <h4 className="card-title mb-4">#{index + 1}</h4>
                            <Row className="mb-4">
                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  placeholder="Tarih"
                                  name={`matches[${index}].day`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.day}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="time"
                                  name={`matches[${index}].time`}
                                  id="example-time-input"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.time}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  name={`matches[${index}].teamHome`}
                                  placeholder="Ev Sahibi"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.teamHome}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  name={`matches[${index}].teamAway`}
                                  placeholder="Deplasman"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.teamAway}
                                />
                              </div>
                            </Row>

                            <Row className="mb-4">
                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  placeholder="Tahmin"
                                  name={`matches[${index}].forecast`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.forecast}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  name={`matches[${index}].ratio`}
                                  placeholder="Oran"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.ratio}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  name={`matches[${index}].score.home`}
                                  placeholder="Ev Sahibi (Gol)"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.score?.home}
                                />
                              </div>

                              <div className="col-md-3">
                                <Field
                                  className="form-control"
                                  type="text"
                                  name={`matches[${index}].score.away`}
                                  placeholder="Deplasman (Gol)"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={item.score?.away}
                                />
                              </div>
                            </Row>

                            <Row className="mb-4">
                              <div className="col-md-12">
                                <select
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name={`matches[${index}].isFinished`}
                                  className="form-control"
                                  value={item.isFinished}
                                >
                                  <option value="wait">Beklemede</option>
                                  <option value="true">Kazandı</option>
                                  <option value="false">Kaybetti</option>
                                </select>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ))}

                      <Card>
                        <CardBody>
                          <h4 className="card-title mb-4">Kupon Ayarları</h4>
                          <Row className="mb-4">
                            <div className="col-md-4">
                              <Field
                                className="form-control"
                                type="text"
                                placeholder="Toplam Oran"
                                name="ratio"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.ratio}
                              />
                            </div>

                            <div className="col-md-4">
                              <Field
                                className="form-control"
                                type="text"
                                name="pay"
                                placeholder="Ücret"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.pay}
                              />
                            </div>

                            <div className="col-md-4">
                              <Field
                                className="form-control"
                                type="text"
                                name="comment"
                                placeholder="Yorum"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.comment}
                              />
                            </div>
                          </Row>

                          <Row className="mb-4">
                            <div className="col-md-12">
                              <select
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="isFinished"
                                className="form-control"
                                value={values.isFinished}
                              >
                                <option value="wait">Beklemede</option>
                                <option value="true">Kazandı</option>
                                <option value="false">Kaybetti</option>
                              </select>
                            </div>
                          </Row>
                        </CardBody>
                      </Card>
                      <Row>
                        <div className="col-md-12">
                          <Button
                            style={{ width: "100%" }}
                            color="primary"
                            type="submit"
                          >
                            Güncelle
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SingleCoupon;
