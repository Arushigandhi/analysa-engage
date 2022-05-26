import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Tooltip as AntdTooltip,
  message,
  Skeleton,
} from "antd";
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
import { useMutation, useQuery } from "react-query";
import {
  getAllCars,
  getBodyType,
  GetCarDetails,
  getPopularCars,
} from "services/dashboard.service";
import { BsInfoCircle } from "react-icons/bs";
import useMediaQuery from "components/hooks/useMediaQuery";

const { Option } = Select;

export default function Home() {
  // const isDesktop = useMediaQuery("(min-width: 1400px)");
  const [show, setShow] = useState(false);
  const [showPie, setPieShow] = useState(false);
  const [pie, setPie] = useState();
  const [make, setMake] = useState("Tata");
  const [modalData, setModalData] = useState({});

  const { data: cars, isLoading } = useQuery("carsData", getAllCars);
  const newData = cars?.cars.map(({ Make, Model, Ex_Showroom_Price }) => ({
    Make,
    Model,
    Price: Number(Ex_Showroom_Price.replace(/\D/g, "")),
  }));

  const carDetails = useMutation(GetCarDetails, {
    onSuccess: async (data) => {
      setModalData(data);
    },
    onError: (err) => {
      message.error("Error loading this car's data");
    },
  });

  const getSpecificCar = async (_id) => {
    await carDetails.mutateAsync(_id);
  };

  const showModal = (_id) => {
    getSpecificCar(_id);
    setShow(true);
  };

  const showPieModal = (d) => {
    setPie(d);
    setPieShow(true);
  };

  const { data: carTypes, isLoading: isLoadingType } = useQuery(
    "bodyTypePieData",
    getBodyType
  );
  const carBody = carTypes?.carsBody?.slice(0, 5);
  const carFuel = carTypes?.carsFuel?.slice(0, 5);
  const carGears = carTypes?.carsGears?.slice(0, 4);
  const carEngLocation = carTypes?.carsEngLocation?.slice(0, 4);

  const { data: popCars, isLoading: isLoadingPop } = useQuery(
    "popCarsData",
    getPopularCars
  );
  // chartData = [
  //   {
  //     name: "Week 1",
  //     value: 10,
  //   },
  //   {
  //     name: "Week 2",
  //     value: 30,
  //   },
  //   {
  //     name: "Week 3",
  //     value: 50,
  //   },
  //   {
  //     name: "Week 4",
  //     value: 20,
  //   },
  // ];

  return (
    <DashboardLayout title="Dashboard">
      <Row>
        <Col className={Styles.pieCardController}>
          <Row>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <Row>
                  <h1>Fuel Type</h1>
                  <AntdTooltip
                    title="The Pie Chart displays the popular fuel types of the cars in our dataset. Hover on each sector to know more!"
                    placement="top"
                  >
                    <BsInfoCircle
                      style={{
                        margin: "0 5px",
                        marginTop: "5px",
                      }}
                    />
                  </AntdTooltip>
                </Row>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical onClick={() => showPieModal(1)} />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={200} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={carFuel}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#FFD339"
                      paddingAngle={5}
                      dataKey={"count"}
                      nameKey={"_id"}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>{carTypes?.totalCarFuel}</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <Row>
                  <h1>Body Styles</h1>
                  <AntdTooltip
                    title="The Pie Chart displays the popular body styles of the cars in our dataset. Hover on each sector to know more!"
                    placement="top"
                  >
                    <BsInfoCircle
                      style={{
                        margin: "0 5px",
                        marginTop: "5px",
                      }}
                    />
                  </AntdTooltip>
                </Row>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical onClick={() => showPieModal(2)} />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={200} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={carBody}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#FF6D39"
                      paddingAngle={5}
                      dataKey={"count"}
                      nameKey={"_id"}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>{carTypes?.totalCarBody}</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
          </Row>
          <Row>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <Row>
                  <h1>Number of Gears</h1>
                  <AntdTooltip
                    title="The Pie Chart displays the number of gears of cars prevalent in our dataset. Hover on each sector to know more!"
                    placement="top"
                  >
                    <BsInfoCircle
                      style={{
                        margin: "0 5px",
                        marginTop: "5px",
                      }}
                    />
                  </AntdTooltip>
                </Row>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical onClick={() => showPieModal(3)} />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={200} height={180}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={carGears}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#9539FF"
                      paddingAngle={5}
                      dataKey={"count"}
                      nameKey={"_id"}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>{carTypes?.totalCarGears}</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
            <Card className={Styles.pieCard}>
              <div className={Styles.pieCardDiv}>
                <Row>
                  <h1>Engine's Location</h1>
                  <AntdTooltip
                    title="The Pie Chart displays the common engine placement of the cars in our dataset. Hover on each sector to know more!"
                    placement="top"
                  >
                    <BsInfoCircle
                      style={{
                        margin: "0 5px",
                        marginTop: "5px",
                      }}
                    />
                  </AntdTooltip>
                </Row>
                <div className={Styles.icon}>
                  <BsThreeDotsVertical onClick={() => showPieModal(4)} />
                </div>
              </div>
              <div className={Styles.pieCardDiv}>
                <ResponsiveContainer width={200} height={180}>
                  <PieChart width={200} height={180}>
                    <Pie
                      data={carEngLocation}
                      cx={80}
                      cy={100}
                      innerRadius={60}
                      outerRadius={70}
                      fill="#3954FF"
                      paddingAngle={5}
                      dataKey={"count"}
                      nameKey={"_id"}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Col className={Styles.pieDesc}>
                  <h2>{carTypes?.totalCarEngLocation}</h2>
                  <p>Cars in Set</p>
                </Col>
              </div>
            </Card>
          </Row>
        </Col>
        <Col>
          <Card className={Styles.barCard}>
            <div className={Styles.barCardDiv}>
              <Row>
                <h1>Popular Cars</h1>
                <AntdTooltip
                  title="Select a company from the dropdown to know about the popular cars of selected option."
                  placement="top"
                >
                  <BsInfoCircle
                    style={{
                      margin: "0 5px",
                      marginTop: "5px",
                    }}
                  />
                </AntdTooltip>
              </Row>
              <Row>
                {/* <div className={Styles.category}>
                  <RiCheckboxBlankFill
                    color="rgba(57, 84, 255, 1)"
                    style={{
                      margin: "0 5px",
                    }}
                  />
                  Make
                </div>
                <div className={Styles.category}>
                  <RiCheckboxBlankFill
                    color="rgba(255, 211, 57, 1)"
                    style={{
                      margin: "0 5px",
                    }}
                  />
                  Model
                </div> */}
              </Row>
              <Select
                defaultValue={"Tata"}
                // style={{ width: "fit-content" }}
                bordered={false}
                className={Styles.dropdown}
                onChange={(value) => {
                  setMake(value);
                }}
              >
                {!isLoadingPop &&
                  Object.keys(popCars).map((item, idx) => {
                    return (
                      <Option key={idx} value={item}>
                        {item}
                      </Option>
                    );
                  })}
              </Select>
            </div>
            {!isLoadingPop ? (
              <ResponsiveContainer width={650} height={410}>
                <BarChart
                  width={650}
                  height={410}
                  data={popCars[make] ? popCars[make] : popCars["Tata"]}
                >
                  <CartesianGrid horizontal vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(31, 33, 39, 0.5)"
                    axisLine={{ stroke: "#fff" }}
                  />
                  <YAxis
                    stroke="rgba(31, 33, 39, 0.5)"
                    axisLine={{ stroke: "#fff" }}
                  />
                  <Bar
                    dataKey="name"
                    // nameKey={"_id"}
                    fill="#3954FF"
                    barSize={10}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="rgba(57, 84, 255, 1)"
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton />
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className={Styles.graphCard}>
            <Row className={Styles.graphCardDiv}>
              <h1>Price of Cars</h1>
              <AntdTooltip
                title="The graph below shows the price of 10 randomly selected cars in our dataset. Reload the page to fetch 10 different cars!"
                placement="top"
              >
                <BsInfoCircle
                  style={{
                    margin: "0 5px",
                    marginTop: "5px",
                  }}
                />
              </AntdTooltip>
            </Row>

            <ResponsiveContainer
              width={800}
              height={420}
              className={Styles.areaChartWrapper}
            >
              <AreaChart
                width={800}
                height={420}
                data={newData?.slice(0, 9)}
                className={Styles.areaChart}
              >
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
                <XAxis dataKey="Model" tickLine={false} axisLine={false} />
                <YAxis dataKey="Price" axisLine={{ stroke: "#fff" }} />
                <CartesianGrid horizontal={true} vertical={false} />
                <Area
                  type="monotone"
                  dataKey="Price"
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
            <Row>
              <h1>List of Cars</h1>
              <AntdTooltip
                title="This is an overview of the cars in our dataset. Click on each row to know more about each car!"
                placement="top"
              >
                <BsInfoCircle
                  style={{
                    margin: "0 5px",
                    marginTop: "5px",
                  }}
                />
              </AntdTooltip>
            </Row>
            {!isLoading &&
              cars.cars.slice(0, 20).map((item, idx) => {
                return (
                  <Row
                    key={idx}
                    className={Styles.tableRow}
                    onClick={() => showModal(item._id)}
                  >
                    <Row align="middle" key={idx}>
                      <div className={Styles.iconWrapper}>
                        <AiOutlineCar
                          style={{ marginRight: "1.8rem", fontSize: "30px" }}
                        />
                      </div>
                      <Col className={Styles.col}>
                        <h2>
                          {item.Make
                            ? item.Make
                            : item.Model.substring(0, 20) + ".."}{" "}
                        </h2>
                        <h3>{item.Make ? item.Model : ""} </h3>
                      </Col>
                    </Row>
                    <Col className={Styles.price}>{item.Ex_Showroom_Price}</Col>
                  </Row>
                );
              })}
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
        <div className={Styles.modal}>
          <h1>Model Variant</h1>
          <h2>{modalData.Variant ? modalData.Variant : "-"}</h2>
          <h1>Airbags</h1>
          <h2>{modalData.Airbags ? modalData.Airbags : "-"}</h2>
          <h1>Displacement</h1>
          <h2>{modalData.Displacement ? modalData.Displacement : "-"}</h2>
          <h1>Mileage</h1>
          <h2>
            {modalData.ARAI_Certified_Mileage
              ? modalData.ARAI_Certified_Mileage
              : "-"}
          </h2>
          <h1>Fuel Tank Capacity</h1>
          <h2>
            {modalData.Fuel_Tank_Capacity ? modalData.Fuel_Tank_Capacity : "-"}
          </h2>
          <h1>Fuel Type</h1>
          <h2>{modalData.Fuel_Type ? modalData.Fuel_Type : "-"}</h2>
          <h1>Body Type</h1>
          <h2>{modalData.Body_Type ? modalData.Body_Type : "-"}</h2>
        </div>
      </ModalComponent>
      <ModalComponent
        heading={
          pie === 1
            ? "About Fuel Type"
            : pie === 2
            ? "About Body Styles"
            : pie === 3
            ? "About Number of Gears"
            : pie === 4
            ? "About Engine's Location"
            : "About"
        }
        show={showPie}
        setShow={setPieShow}
        width={"40%"}
        maxWidth={1200}
      >
        <div className={Styles.modal}>
          {pie === 1 &&
            carTypes?.carsFuel.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{item._id}</h1>
                  <h2>{item.count}</h2>
                </div>
              );
            })}
          {pie === 2 &&
            carTypes?.carsBody?.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{item._id}</h1>
                  <h2>{item.count}</h2>
                </div>
              );
            })}
          {pie === 3 &&
            carTypes?.carsGears.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{item._id}</h1>
                  <h2>{item.count}</h2>
                </div>
              );
            })}
          {pie === 4 &&
            carTypes?.carsEngLocation.map((item, idx) => {
              return (
                <div key={idx}>
                  <h1>{item._id}</h1>
                  <h2>{item.count}</h2>
                </div>
              );
            })}
        </div>
      </ModalComponent>
    </DashboardLayout>
  );
}
