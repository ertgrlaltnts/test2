import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Coupons = () => {
  const [bets, setBets] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/edit-coupon/${item._id}`, { state: bets[0] });
  };

  const handleDelete = (item) => {
    confirmAlert({
      title: "Kuponu silmek üzeresin",
      message: "Kuponu silmek istediğinize emin misiniz ?",
      buttons: [
        {
          label: "Evet",
          onClick: () => deleteBet(item._id),
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteBet = async (item) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_BOSS}/admin/bet/delete/${item}`
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
      const result = await axios.get(`${process.env.REACT_APP_BOSS}/admin/bet`);
      setBets(result.data.bets);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Kuponlar" />
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
                    <div  id="customerList">
                      <div className="table-responsive table-card">
                        <table
                          className="table align-middle table-nowrap"
                          id="customerTable"
                         
                        >
                          <thead className="table-light">
                            <tr>
                              <th className="sort" data-sort="comment">
                                Yorum
                              </th>
                              <th className="sort" data-sort="teamAway">
                                Ücret
                              </th>
                              <th className="sort" data-sort="phone">
                                Oran
                              </th>
                              <th className="sort" data-sort="status">
                                Durum
                              </th>
                              <th className="sort" data-sort="action">
                                Eylem
                              </th>
                            </tr>
                          </thead>
                          <tbody style={{backgroundColor:"#fff"}}className="list form-check-all">
                            {bets?.map((item, index) => (
                              <tr key={index}>
                                <td className="customer_name">
                                  {item.comment}
                                </td>
                                <td className="email">{item.pay}</td>
                                <td className="phone">{item.ratio}</td>
                                <td className="status">
                                  <span
                                    className={`badge badge-soft-${
                                      item.isFinished === "wait"
                                        ? "warning"
                                        : item.isFinished === "true"
                                        ? "success"
                                        : "danger"
                                    } danger warning text-uppercase`}
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
                                        onClick={() => handleEdit(item)}
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
    </React.Fragment>
  );
};

export default Coupons;
