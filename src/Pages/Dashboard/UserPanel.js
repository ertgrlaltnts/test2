import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import axios from "axios";
import moment from "moment";

const UserPanel = () => {
  const [newUser, setNewUser] = useState();
  const [vipUsers, setVipUsers] = useState();
  const [total, setTotal] = useState();

  const [newUserDemeter, setNewUserDemeter] = useState();
  const [vipUsersDemeter, setVipUsersDemeter] = useState();
  const [totalDemeter, setTotalDemeter] = useState();

  const [newUserVet, setNewUserVet] = useState();
  const [vipUsersVet, setVipUsersVet] = useState();
  const [totalVet, setTotalVet] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BOSS}/admin/user`
      );

      const result2 = await axios.get(
        `${process.env.REACT_APP_DEMETER}/admin/user`
      );

      const result3 = await axios.get(
        `${process.env.REACT_APP_VET}/admin/user`
      );

      const temp = result.data.users.filter(
        (item) => item.joinDate === moment().format("DD/MM/YYYY")
      );

      const temp10 = result2.data.users.filter(
        (item) => item.joinDate === moment().format("DD/MM/YYYY")
      );

      const temp20 = result3.data.users.filter(
        (item) => item.joinDate === moment().format("DD/MM/YYYY")
      );

      const temp11 = temp10.length;
      const temp12 = result2.data.users.filter((item) => item.isVip === true);
      const temp13 = temp12.length;
      const temp14 = result2.data.users.length;

      const temp2 = temp.length;
      const temp3 = result.data.users.filter((item) => item.isVip === true);
      const temp4 = temp3.length;
      const temp5 = result.data.users.length;

      const temp21 = temp20.length;
      const temp22 = result3.data.users.filter((item) => item.isVip === true);
      const temp23 = temp22.length;
      const temp24 = result3.data.users.length;

      setNewUser(temp2);
      setVipUsers(temp4);
      setTotal(temp5);

      setNewUserDemeter(temp11);
      setVipUsersDemeter(temp13);
      setTotalDemeter(temp14);

      setNewUserVet(temp21);
      setVipUsersVet(temp23);
      setTotalVet(temp24);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Victorilla</h3>
                  <p className="mb-1">Yeni Kullanıcı</p>
                  <h3 className="mb-3">{newUser}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Victorilla</h3>
                  <p className="mb-1">VIP Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{vipUsers}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Victorilla</h3>
                  <p className="mb-1">Toplam Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{total}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Demeter Fox</h3>
                  <p className="mb-1">Yeni Kullanıcı</p>
                  <h3 className="mb-3">{newUserDemeter}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Demeter Fox</h3>
                  <p className="mb-1">VIP Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{vipUsersDemeter}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Demeter Fox</h3>
                  <p className="mb-1">Toplam Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{totalDemeter}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Vetdaddy</h3>
                  <p className="mb-1">Yeni Kullanıcı</p>
                  <h3 className="mb-3">{newUserVet}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Vetdaddy</h3>
                  <p className="mb-1">PREMIUM Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{vipUsersVet}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div id="radialchart-1" className="apex-charts" dir="ltr">
                    <RadialChart1 />
                  </div>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h3 className="mb-1">Vetdaddy</h3>
                  <p className="mb-1">Toplam Kullanıcı Sayısı</p>
                  <h3 className="mb-3">{totalVet}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;

