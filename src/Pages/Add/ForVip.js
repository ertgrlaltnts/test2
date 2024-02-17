import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Formik } from "formik";
import axios from "axios";

const AddVip = () => {
  document.title = "Vip Tahmin | ER2 Studio";

  const confirmPredictions = async (values) => {
    const result = await axios.post(
      `${process.env.REACT_APP_BOSS}/admin/vip/create`,
      values
    );

    if (result.data.res === 1) {
      window.location.reload();
    } else {
      alert("Bir hata oluştu");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Vip İçin Ekle" />
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
                    onSubmit={() => {}}
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
                          <div className="col-md-6">
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

                          <div className="col-md-6">
                            <Button
                              style={{ width: "100%" }}
                              color="primary"
                              onClick={() => confirmPredictions(values)}
                            >
                              Vip İçin Ekle
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddVip;
