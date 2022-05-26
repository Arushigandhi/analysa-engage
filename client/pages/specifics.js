import React, { useState } from "react";
import Styles from "styles/pages/Specifics.module.scss";
import DashboardLayout from "components/DashboardLayout";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Spin,
} from "antd";
import {
  findSimilarity,
  getSimilarCars,
  getSpecifics,
} from "services/dashboard.service";
import { useMutation, useQuery } from "react-query";
import one from "./assets/three.jpg";
import { BsArrowRight } from "react-icons/bs";
const { Option } = Select;
import { stringSimilarity } from "string-similarity-js";

export default function Specifics() {
  const [carOne, setCarOne] = useState({
    displacement: "1047 cc",
    drivetrain: "4WD",
    capacity: "100 litres",
    power: "100PS@3600rpm",
    torque: "10.1kgm@4500RPM",
    type: "AMT",
  });
  const [carTwo, setCarTwo] = useState({
    displacement: "1047 cc",
    drivetrain: "4WD",
    capacity: "100 litres",
    power: "100PS@3600rpm",
    torque: "10.1kgm@4500RPM",
    type: "AMT",
  });
  const [avg, setAvg] = useState(-1);

  const { data, isLoading } = useQuery("similarCars", getSimilarCars);
  const newData = [];
  data?.popularCarCount.forEach((car) => {
    newData.push([car[0].split(","), car[1]]);
  });

  const { data: specifics, isLoading: isLoadingSpec } = useQuery(
    "specifics",
    getSpecifics
  );

  var Displacement = {};
  var Drivetrain = {};
  var Fuel_Tank_Capacity = {};
  var Power = {};
  var Torque = {};
  var Type = {};

  specifics?.cars.forEach(function (obj, index) {
    Displacement[obj.Displacement] = index;
    Drivetrain[obj.Drivetrain] = index;
    Fuel_Tank_Capacity[obj.Fuel_Tank_Capacity] = index;
    Power[obj.Power] = index;
    Torque[obj.Torque] = index;
    Type[obj.Type] = index;
  });

  var filterObj = {};
  filterObj["Displacement"] = Object.keys(Displacement).sort();
  filterObj["Drivetrain"] = Object.keys(Drivetrain).sort();
  filterObj["Fuel_Tank_Capacity"] = Object.keys(Fuel_Tank_Capacity).sort();
  filterObj["Power"] = Object.keys(Power).sort();
  filterObj["Torque"] = Object.keys(Torque).sort();
  filterObj["Type"] = Object.keys(Type).sort();

  const onOneSubmit = async (values) => {
    setCarOne(values);
    console.log(carOne);
  };

  const onTwoSubmit = async (e) => {
    setCarTwo(e);
    console.log(carTwo);
  };

  const generate = () => {
    let simArray = [];
    simArray.push(stringSimilarity(carOne.displacement, carTwo.displacement));
    simArray.push(stringSimilarity(carOne.drivetrain, carTwo.drivetrain));
    simArray.push(stringSimilarity(carOne.capacity, carTwo.capacity));
    simArray.push(stringSimilarity(carOne.power, carTwo.power));
    simArray.push(stringSimilarity(carOne.torque, carTwo.torque));
    simArray.push(stringSimilarity(carOne.type, carTwo.type, 1));
    let sum = 0;
    simArray.forEach((item) => {
      sum += item;
    });
    setAvg(sum / simArray.length);
    console.log(avg);
  };

  return (
    <DashboardLayout title="Popular Car Specifications">
      <div className={Styles.specContainer}>
        <h2>
          The Carousel showcases some of the popular car specifications that we
          have in our dataset:
        </h2>
        <Carousel
          className={Styles.carousel}
          autoplay
          style={{
            backgroundImage: `url(${one.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.8,
          }}
        >
          {!isLoading ? (
            newData.map((item, idx) => {
              return (
                <div className={Styles.contentStyle}>
                  <h3>
                    <span>
                      {item[1]} {item[0][0]}
                    </span>{" "}
                    cars giving mileage of <span>{item[0][1]}</span> with{" "}
                    <span>{item[0][2]} </span>
                    engine.
                  </h3>
                </div>
              );
            })
          ) : (
            <Spin size="large" />
          )}
        </Carousel>
        <Row className={Styles.cosineSim}>
          <Row>
            <h1>
              Select two cars and find out how similar they are to each other.
            </h1>
            <h2>
              Analysa uses similarity finding algorithms to find out the
              similarity between the the different data points of the two
              selected cars.
            </h2>
          </Row>
          <Row className={Styles.selectCardController}>
            <Col>
              <Card className={Styles.selectCard} hoverable>
                <h1>Choose Attributes for Car #1</h1>
                <Divider className={Styles.divider} />
                <Form
                  layout="vertical"
                  onFinish={onOneSubmit}
                  initialValues={{
                    displacement: "1047 cc",
                    drivetrain: "4WD",
                    capacity: "100 litres",
                    power: "100PS@3600rpm",
                    torque: "10.1kgm@4500RPM",
                    type: "AMT",
                  }}
                >
                  <Form.Item label="Car Type" name="type">
                    <Select
                      defaultValue={"AMT"}
                      onChange={(value) => {
                        console.log(value);
                      }}
                    >
                      {!isLoadingSpec &&
                        filterObj.Type.slice(3, 10).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                      <Option value="demo">Demo</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Power" name="power">
                    <Select defaultValue={"100PS@3600rpm"}>
                      {!isLoadingSpec &&
                        filterObj.Power.slice(1, 371).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Torque" name="torque">
                    <Select defaultValue={"10.1kgm@4500RPM"}>
                      {!isLoadingSpec &&
                        filterObj.Torque.slice(1, 347).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Displacement" name="displacement">
                    <Select defaultValue={"1047 cc"}>
                      {!isLoadingSpec &&
                        filterObj.Displacement.slice(1, 130).map(
                          (item, idx) => {
                            return (
                              <Option key={idx} value={item}>
                                {item}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Drivetrain" name="drivetrain">
                    <Select defaultValue={"4WD"}>
                      {!isLoadingSpec &&
                        filterObj.Drivetrain.slice(1, 5).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Fuel Tank Capacity" name="capacity">
                    <Select defaultValue={"100 litres"}>
                      {!isLoadingSpec &&
                        filterObj.Fuel_Tank_Capacity.slice(1, 64).map(
                          (item, idx) => {
                            return (
                              <Option key={idx} value={item}>
                                {item}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  </Form.Item>
                  <Button htmlType="submit">Submit</Button>
                </Form>
              </Card>
            </Col>
            <Col>
              <Card className={Styles.selectCard} hoverable>
                <h1>Choose Attributes for Car #2</h1>
                <Divider className={Styles.divider} />
                <Form
                  layout="vertical"
                  onFinish={onTwoSubmit}
                  initialValues={{
                    displacement: "1047 cc",
                    drivetrain: "4WD",
                    capacity: "100 litres",
                    power: "100PS@3600rpm",
                    torque: "10.1kgm@4500RPM",
                    type: "AMT",
                  }}
                >
                  <Form.Item label="Car Type" name="type">
                    <Select defaultValue={"AMT"}>
                      {!isLoadingSpec &&
                        filterObj.Type.slice(3, 10).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                      <Option value="demo">Demo</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Power" name="power">
                    <Select defaultValue={"100PS@3600rpm"}>
                      {!isLoadingSpec &&
                        filterObj.Power.slice(1, 371).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Torque" name="torque">
                    <Select defaultValue={"10.1kgm@4500RPM"}>
                      {!isLoadingSpec &&
                        filterObj.Torque.slice(1, 347).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Displacement" name="displacement">
                    <Select defaultValue={"1047 cc"}>
                      {!isLoadingSpec &&
                        filterObj.Displacement.slice(1, 130).map(
                          (item, idx) => {
                            return (
                              <Option key={idx} value={item}>
                                {item}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Drivetrain" name="drivetrain">
                    <Select defaultValue={"4WD"}>
                      {!isLoadingSpec &&
                        filterObj.Drivetrain.slice(1, 5).map((item, idx) => {
                          return (
                            <Option key={idx} value={item}>
                              {item}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Fuel Tank Capacity" name="capacity">
                    <Select defaultValue={"100 litres"}>
                      {!isLoadingSpec &&
                        filterObj.Fuel_Tank_Capacity.slice(1, 64).map(
                          (item, idx) => {
                            return (
                              <Option key={idx} value={item}>
                                {item}
                              </Option>
                            );
                          }
                        )}
                    </Select>
                  </Form.Item>
                  <Button htmlType="submit">Submit</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Row>
        <Row className={Styles.generate}>
          <Button
            icon={<BsArrowRight />}
            // disabled={carOne != null && carTwo != null ? false : true}
            onClick={generate}
          >
            {avg === -1
              ? "Generate Similarity"
              : "Similarity Score is: " + avg.toFixed(5) * 100 + "%"}
          </Button>
        </Row>
      </div>
    </DashboardLayout>
  );
}
