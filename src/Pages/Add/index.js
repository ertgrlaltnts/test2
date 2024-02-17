import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Formik } from "formik";
import axios from "axios";

const AddMatch = () => {
  const [coupon, setCoupon] = useState({
    matches: [],
    pay: "",
    comment: "",
    ratio: "",
    isFinished: "wait",
  });
  document.title = "Tahmin - Kupon | ER2 Studio";

  const addCoupon = (values) => {
    setCoupon({ ...coupon, matches: [...coupon.matches, values] });
  };

  const deleteMatchInCoupon = (i) => {
    const temp = coupon.matches.filter((item, index) => index !== i);
    setCoupon({ ...coupon, matches: [...temp] });
  };

  const confirmCoupon = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BOSS}/admin/bet/create`,
      coupon
    );

    if (result.data.res === 1) {
      window.location.reload();
    } else {
      alert("Bir hata oluştu");
    }
  };

  const confirmPredictions = async (values) => {
    const result = await axios.post(
      `${process.env.REACT_APP_BOSS}/admin/match/create`,
      values
    );

    if (result.data.res === 1) {
      alert("Maç başarıyla eklendi");
    } else {
      alert("Bir hata oluştu");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="ER2 Studio"
            breadcrumbItem="Tahmin - Kupon Ekle"
          />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{
                      teamHome: "",
                      teamAway: "",
                      day: "",
                      time: "",
                      forecast: "",
                      ratio: "",
                      isFinished: "wait",
                      score: {
                        home: "",
                        away: "",
                      },
                    }}
                    onSubmit={async (values) => {
                      await new Promise((r) => setTimeout(r, 500));
                      alert(JSON.stringify(values, null, 2));
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
                        <Row className="mb-4">
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tarih"
                              name="day"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.day}
                              id="example-date-input"
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="time"
                              name="time"
                              id="example-time-input"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.time}
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              name="teamHome"
                              placeholder="Ev Sahibi"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.teamHome}
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              name="teamAway"
                              placeholder="Deplasman"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.teamAway}
                            />
                          </div>
                        </Row>

                        <Row className="mb-4">
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Tahmin"
                              name="forecast"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.forecast}
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              name="ratio"
                              placeholder="Oran"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.ratio}
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              name="score.home"
                              placeholder="Ev Sahibi (Gol)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.score.home}
                            />
                          </div>

                          <div className="col-md-3">
                            <input
                              className="form-control"
                              type="text"
                              name="score.away"
                              placeholder="Deplasman (Gol)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.score.away}
                            />
                          </div>
                        </Row>

                        <Row className="mb-4">
                          <div className="col-md-4">
                            <select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.isFinished}
                              name="isFinished"
                              className="form-control"
                            >
                              <option value="wait">Beklemede</option>
                              <option value="true">Kazandı</option>
                              <option value="false">Kaybetti</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <Button
                              style={{ width: "100%" }}
                              color="primary"
                              onClick={() => confirmPredictions(values)}
                            >
                              Tahminlere Ekle
                            </Button>
                          </div>

                          <div className="col-md-4">
                            <Button
                              style={{ width: "100%" }}
                              color="primary"
                              onClick={() => addCoupon(values)}
                            >
                              Kupona Ekle
                            </Button>
                          </div>
                        </Row>
                      </form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Kupon" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Ev</th>
                          <th>Deplasman</th>
                          <th>Tahmin</th>
                          <th>Oran</th>
                          <th>Tarih</th>
                          <th>Saat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupon.matches.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">#{index + 1}</th>
                            <td>{item.teamHome}</td>
                            <td>{item.teamAway}</td>
                            <td>{item.forecast}</td>
                            <td>{item.ratio}</td>
                            <td>{item.day}</td>
                            <td>{item.time}</td>
                            <td>
                              <div className="remove">
                                <button
                                  className="btn btn-sm btn-danger remove-item-btn"
                                  onClick={() => deleteMatchInCoupon(index)}
                                >
                                  Kaldır
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Row style={{ marginTop: 30 }} className="mb-4">
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Toplam Oran"
                        name="total"
                        onChange={(e) =>
                          setCoupon({ ...coupon, ratio: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        name="pay"
                        placeholder="Ücret"
                        onChange={(e) =>
                          setCoupon({ ...coupon, pay: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="text"
                        name="comment"
                        placeholder="Yorum"
                        onChange={(e) =>
                          setCoupon({ ...coupon, comment: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-3">
                      <Button
                        style={{ width: "100%" }}
                        color="primary"
                        onClick={confirmCoupon}
                      >
                        Kuponu Onayla
                      </Button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddMatch;
