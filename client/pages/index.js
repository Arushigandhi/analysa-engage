import React, { useState } from "react";
import { Row, Col, Card, Select } from "antd";
import DashboardLayout from "components/DashboardLayout";
import ModalComponent from "components/ModalComponent";
import { AiOutlineCar } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiCheckboxBlankFill } from "react-icons/ri";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Styles from "styles/pages/Home.module.scss";

const { Option } = Select;

export default function Home() {
  const [show, setShow] = useState(false);
  const showModal = (d) => {
    setShow(true);
  };

  const dataGraph = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const chartData = [
    {
      name: "Week 1",
      value: 10,
    },
    {
      name: "Week 2",
      value: 30,
    },
    {
      name: "Week 3",
      value: 50,
    },
    {
      name: "Week 4",
      value: 20,
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <Row>
        <Col>
          <Row>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <h1>Heading</h1>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={data02}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#FFD339"
                      paddingAngle={5}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>75</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <h1>Heading</h1>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={data02}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#FF6D39"
                      paddingAngle={5}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>75</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
          </Row>
          <Row>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <h1>Heading</h1>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data02}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#9539FF"
                      paddingAngle={5}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>75</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <h1>Heading</h1>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={data02}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#3954FF"
                      paddingAngle={5}
                      dataKey="value"
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>75</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
          </Row>
        </Col>
        <Col>
          <Card className={Styles.barCard}>
            <div className={Styles.barCardDiv}>
              <h1>Heading</h1>
              <Row>
                <div className={Styles.category}>
                  <RiCheckboxBlankFill
                    color="rgba(255, 211, 57, 1)"
                    style={{
                      margin: "0 5px",
                    }}
                  />
                  Received
                </div>
                <div className={Styles.category}>
                  <RiCheckboxBlankFill
                    color="rgba(57, 84, 255, 1)"
                    style={{
                      margin: "0 5px",
                    }}
                  />
                  Completed
                </div>
              </Row>
              <Select
                defaultValue={"m6"}
                style={{ width: "fit-content" }}
                bordered={false}
                className={Styles.dropdown}
              >
                <Option value="m1">1 month</Option>
                <Option value="m6">6 months</Option>
                <Option value="m12">1 year</Option>
              </Select>
              <div className={Styles.icon}>
                <BsThreeDotsVertical />
              </div>
            </div>
            <ResponsiveContainer width={650} height={410}>
              <BarChart width={650} height={410} data={data}>
                <CartesianGrid horizontal vertical={false} nrd />
                <XAxis
                  dataKey="name"
                  stroke="rgba(31, 33, 39, 0.5)"
                  axisLine={{ stroke: "#fff" }}
                />
                <YAxis
                  stroke="rgba(31, 33, 39, 0.5)"
                  axisLine={{ stroke: "#fff" }}
                />
                <Bar dataKey="pv" fill="#3954FF" barSize={10} />
                <Bar dataKey="uv" fill="#FFD339" barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className={Styles.graphCard}>
            <Row className={Styles.graphCardDiv}>
              <h1>Heading</h1>
              <Row>
                <Select
                  defaultValue={"m6"}
                  style={{ width: "fit-content" }}
                  bordered={false}
                  className={Styles.dropdown}
                  // onChange={(value) => {
                  //   makeChartRequest(value);
                  // }}
                >
                  <Option value="m1">1 month</Option>
                  <Option value="m6">6 months</Option>
                  <Option value="m12">1 year</Option>
                </Select>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical />
                </div>
              </Row>
            </Row>
            <ResponsiveContainer width={900} height={420}>
              <AreaChart width={900} height={420} data={chartData}>
                <defs>
                  <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="rgba(57, 84, 255, 0.18)"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="100%"
                      stopColor="rgba(255, 255, 255, 0)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis hide={true} />
                <CartesianGrid horizontal={true} vertical={false} />
                <Area
                  type="monotone"
                  dataKey={"value"}
                  stroke="#3954FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col>
          <Card className={Styles.tableCard}>
            <h1>Heading</h1>
            <Row className={Styles.tableRow} onClick={() => setShow(true)}>
              <Row align="middle">
                <div className={Styles.iconWrapper}>
                  <AiOutlineCar
                    style={{ marginRight: "1.8rem", fontSize: "30px" }}
                  />
                </div>
                <Col>
                  <h2>Maruti Suzuki</h2>
                  <h3>M1 Model</h3>
                </Col>
              </Row>

              <Col className={Styles.price}>$54,000</Col>
            </Row>
            <Row className={Styles.tableRow}>
              <Row align="middle">
                <div className={Styles.iconWrapper}>
                  <AiOutlineCar
                    style={{ marginRight: "1.8rem", fontSize: "30px" }}
                  />
                </div>
                <Col>
                  <h2>Maruti Suzuki</h2>
                  <h3>M1 Model</h3>
                </Col>
              </Row>

              <Col className={Styles.price}>$54,000</Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <ModalComponent
        heading={"About"}
        show={show}
        setShow={setShow}
        width={"40%"}
        maxWidth={1200}
      >
        hi
      </ModalComponent>
    </DashboardLayout>
  );
}
