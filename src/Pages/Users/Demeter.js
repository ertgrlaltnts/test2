import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  Row,
  ModalHeader,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const DemeterUsers = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [gold, setGold] = useState(0);
  const [vip, setVip] = useState(0);
  const [filteredList, setFilteredList] = useState();
  const [loading, setLoading] = useState(false);

  const changeSearch = (item) => {
    const query = item;
    var updatedList = [...filteredList];
    updatedList = updatedList.filter(
      ({ email }) => email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    setFilteredList(updatedList);
  };

  const closeModal = () => {
    setModalData({});
    setGold(0);
    setVip(0);
    setModal(false);
  };

  const openModal = (e) => {
    setModalData(filteredList[e]);
    setModal(true);
  };

  const deleteUser = async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_DEMETER}/admin/user/delete/${id}`
    );

    if (result.data.res === 1) {
      window.location.reload();
    } else {
      alert("Bir hata oluştu");
    }
  };

  const sendVip = async (id) => {
    const result = await axios.put(
      `${process.env.REACT_APP_DEMETER}/admin/user/vip`,
      { _id: id, vipTime: vip }
    );

    if (result.data.res === 1) {
      alert(vip + " günlük VIP gönderildi.");
    } else {
      alert("Bir hata oluştu");
    }
  };

  const sendGold = async (id) => {
    const result = await axios.put(
      `${process.env.REACT_APP_DEMETER}/admin/user/gold`,
      { _id: id, goldValue: gold }
    );

    if (result.data.res === 1) {
      alert(gold + " Gold gönderildi.");
    } else {
      alert("Bir hata oluştu");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_DEMETER}/admin/user`
      );
      setFilteredList(result.data.users);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="ER2 Studio"
            breadcrumbItem="Kullanıcılar (Demeter Fox)"
          />
          <Row>
            <Col lg={12}>
              <form className="app-search d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Kullanıcı Ara (E-mail Adresine Göre)"
                    onChange={(e) => changeSearch(e.target.value)}
                    style={{ background: "#fff" }}
                  />
                  <span className="ri-search-line"></span>
                </div>
              </form>

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
                              İsim
                            </th>
                            <th className="sort" data-sort="teamAway">
                              Mail
                            </th>
                            <th className="sort" data-sort="phone">
                              VIP
                            </th>
                            <th className="sort" data-sort="date">
                              Gold
                            </th>
                            <th className="sort" data-sort="date">
                              Eylem
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredList?.map((item, index) => (
                            <tr key={index}>
                              <td className="customer_name">{item.name}</td>
                              <td className="email">{item.email}</td>
                              <td className="vip">
                                {item.isVip === true ? (
                                  <span
                                    style={{ color: "#0ac074", fontSize: 24 }}
                                    className="mdi mdi-check-circle"
                                  ></span>
                                ) : (
                                  <span
                                    style={{ color: "red", fontSize: 24 }}
                                    className="mdi mdi-close-circle"
                                  ></span>
                                )}
                              </td>
                              <td className="coin">{item.coin}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      onClick={() => openModal(index)}
                                    >
                                      Düzenle
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
          {modalData.name}
        </ModalHeader>
        <Container>
          <Row className="mb-4 mt-4">
            <div style={{ textAlign: "center" }} className="col-md-6">
              <h4 className="card-title mb-0">E-mail : {modalData.email}</h4>
            </div>

            <div style={{ textAlign: "center" }} className="col-md-6">
              <h4 className="card-title mb-0">
                Üyelik T. : {modalData.joinDate ? modalData.joinDate : ""}
              </h4>
            </div>
          </Row>
          <Row className="mb-4 mt-4">
            <div style={{ textAlign: "center" }} className="col-md-6">
              <h4 className="card-title mb-0">VIP : {`${modalData.isVip}`}</h4>
            </div>

            <div style={{ textAlign: "center" }} className="col-md-6">
              <h4 className="card-title mb-0">Gold : {modalData.coin}</h4>
            </div>
          </Row>
          <Row style={{ marginTop: 40 }} className="mb-4">
            <div className="col-md-8">
              <select
                onChange={(e) => setGold(e.target.value)}
                value={gold}
                name="gold"
                className="form-control"
                style={{ marginLeft: 20 }}
              >
                <option value={0}>Coin Seçin...</option>
                <option value={500}>500 Coin</option>
                <option value={1000}>1000 Coin</option>
                <option value={5000}>5.000 Coin</option>
                <option value={10000}>10.000 Coin</option>
              </select>
            </div>
            <div style={{ textAlign: "center" }} className="col-md-4">
              <div className="edit">
                <button
                  className="btn btn-success edit-item-btn"
                  data-bs-toggle="modal"
                  onClick={() => sendGold(modalData._id)}
                >
                  Gönder
                </button>
              </div>
            </div>
          </Row>

          <Row style={{ marginTop: 20 }} className="mb-4">
            <div className="col-md-8">
              <select
                onChange={(e) => setVip(e.target.value)}
                value={vip}
                name="gold"
                className="form-control"
                style={{ marginLeft: 20 }}
              >
                <option value={0}>Vip Gün Seçin...</option>
                <option value={30}>1 Aylık</option>
                <option value={90}>3 Aylık</option>
                <option value={180}>6 Aylık</option>
                <option value={360}>Yıllık</option>
              </select>
            </div>
            <div style={{ textAlign: "center" }} className="col-md-4">
              <div className="edit">
                <button
                  className="btn btn-success edit-item-btn"
                  data-bs-toggle="modal"
                  onClick={() => sendVip(modalData._id)}
                >
                  Gönder
                </button>
              </div>
            </div>
          </Row>
          <Row className="mb-4">
            <div className="col-md-12">
              <div className="remove">
                <button
                  style={{ width: "100%" }}
                  className="btn btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  onClick={() => deleteUser(modalData._id)}
                >
                  Kullanıcıyı Sil
                </button>
              </div>
            </div>
          </Row>
        </Container>
      </Modal>
    </React.Fragment>
  );
};

export default DemeterUsers;

