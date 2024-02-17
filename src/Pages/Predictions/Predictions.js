import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Formik } from "formik";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Predictions = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [matchesData, setMatchesData] = useState();
  const [loading, setLoading] = useState(false);

  const handleDelete = (item) => {
    confirmAlert({
      title: "Tahmini silmek üzeresin",
      message: "Tahmini silmek istediğinize emin misiniz ?",
      buttons: [
        {
          label: "Evet",
          onClick: () => deleteMatch(item),
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteMatch = async (item) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_BOSS}/admin/match/delete/${item._id}`
    );

    if (result.data.res === 1) {
      window.location.reload();
    } else {
      alert("Bir hata oluştu");
    }
  };

  const closeModal = () => {
    setModalData({});
    setModal(false);
  };

  const openModal = (item) => {
    setModalData(item);
    setModal(true);
  };

  const updateModal = async (item) => {
    const result = await axios.put(
      `${process.env.REACT_APP_BOSS}/admin/match/update`,
      item
    );

    if (result.data.res === 1) {
      window.location.reload();
    } else {
      alert("Bir hata oluştu");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_BOSS}/admin/match`
      );
      setMatchesData(result.data.matches);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Ücretsiz Tahminler" />
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "70vh",
              }}
            >
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
              <Col lg={12}>
                <Card>
                  <CardBody style={{ padding: 0, margin: 0 }}>
                    <div id="customerList">
                      <div className="table-responsive table-card">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead className="table-light">
                            <tr>
                              <th className="sort" data-sort="teamHome">
                                Ev
                              </th>
                              <th className="sort" data-sort="teamAway">
                                Deplasman
                              </th>
                              <th className="sort" data-sort="phone">
                                Tahmin
                              </th>
                              <th className="sort" data-sort="date">
                                Gün
                              </th>
                              <th className="sort" data-sort="status">
                                Durum
                              </th>
                              <th className="sort" data-sort="action">
                                Eylem
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {matchesData?.map((item, index) => (
                              <tr key={index}>
                                <td className="customer_name">
                                  {item.teamHome}
                                </td>
                                <td className="email">{item.teamAway}</td>
                                <td className="phone">{item.forecast}</td>
                                <td className="date">{item.day}</td>
                                <td className="status">
                                  <span
                                    style={{ padding: 5, borderRadius: 5 }}
                                    className={`"badge badge-soft-${
                                      item.isFinished === "wait"
                                        ? "warning"
                                        : item.isFinished === "true"
                                        ? "success"
                                        : "danger"
                                    } danger warning text-uppercase"`}
                                  >
                                    {item.isFinished === "wait"
                                      ? "Beklemede"
                                      : item.isFinished === "true"
                                      ? "Kazandı"
                                      : "Kaybetti"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button
                                        className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        onClick={() => openModal(item)}
                                      >
                                        Düzenle
                                      </button>
                                    </div>
                                    <div className="remove">
                                      <button
                                        className="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal"
                                        onClick={() => handleDelete(item)}
                                      >
                                        Kaldır
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>

      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        onClosed={closeModal}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          id="exampleModalLabel"
          toggle={closeModal}
        >
          Tahmini Düzenle
        </ModalHeader>

        <Formik
          initialValues={{
            _id: modalData._id,
            teamHome: modalData.teamHome,
            teamAway: modalData.teamAway,
            day: modalData.day,
            time: modalData.time,
            forecast: modalData.forecast,
            ratio: modalData.ratio,
            isFinished: modalData.isFinished,
            score: {
              home: modalData.score?.home,
              away: modalData.score?.away,
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
              <ModalBody>
                <input type="hidden" name="_id" value={values._id} />
                <Row className="mb-4">
                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="time"
                      id="example-time-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.time}
                    />
                  </div>
                </Row>
                <Row className="mb-4">
                  <div className="col-md-6">
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

                  <div className="col-md-6">
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
                  <div className="col-md-6">
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

                  <div className="col-md-6">
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
                </Row>
                <Row className="mb-4">
                  <div className="col-md-6">
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

                  <div className="col-md-6">
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
                  <div className="col-md-12">
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
                </Row>
              </ModalBody>
              <ModalFooter>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={closeModal}
                  >
                    Kapat
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    id="add-btn"
                    onClick={() => updateModal(values)}
                  >
                    Güncelle
                  </button>
                </div>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </Modal>
    </React.Fragment>
  );
};

export default Predictions;
