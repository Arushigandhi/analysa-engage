import React, { useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import Styles from "styles/pages/Customer.module.scss";
import { Col, Row, Segmented, Select, Statistic, Steps, Tag } from "antd";
import { AiOutlineCar } from "react-icons/ai";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "react-query";
import { getBodyType, getCarsPrice } from "services/dashboard.service";

const { Step } = Steps;
const { Option } = Select;

export default function Customer() {
  const [percentage, setPercentage] = useState(-1);
  const [percentageCar, setPercentageCar] = useState(-1);
  const [percentageOpp, setPercentageOpp] = useState(-1);

  const { data: carTypes, isLoading } = useQuery("bodyTypeData", getBodyType);
  const carBody = carTypes?.carsBody;
  const totalCarBody = carTypes?.totalCarBody;

  const findPercentage = (total, value) => {
    var x = (value / total) * 100;
    setPercentageCar(x);
    x = Math.round(x / 10) * 10;
    x = x / 10;
    setPercentage(x);
    x = 10 - x;
    setPercentageOpp(x);
  };

  const { data: carPrice, isLoading: isLoadingPrice } = useQuery(
    "priceData",
    getCarsPrice
  );

  const data01 = [
    { x: 100, y: 200 },
    { x: 120, y: 100 },
    { x: 170, y: 300 },
    { x: 140, y: 250 },
    { x: 150, y: 400 },
    { x: 110, y: 280 },
  ];
  const data02 = [
    { x: 200, y: 260 },
    { x: 240, y: 290 },
    { x: 190, y: 290 },
    { x: 198, y: 250 },
    { x: 180, y: 280 },
    { x: 210, y: 220 },
  ];
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };

  return (
    <DashboardLayout title="Know your Customer">
      <div className={Styles.pointers}>
        <Steps current={5} progressDot direction="vertical">
          <Step
            title="What percentage of the cars are your selection?"
            description={
              <>
                <Select
                  defaultValue={"SUV"}
                  bordered={false}
                  className={Styles.dropdown}
                  onChange={(value) => {
                    findPercentage(totalCarBody, value);
                  }}
                >
                  {!isLoading &&
                    carBody.map((item, idx) => {
                      return (
                        <Option key={idx} value={item.count}>
                          {item._id}
                        </Option>
                      );
                    })}
                </Select>
                <Row className={Styles.percentage}>
                  {[...Array(percentage === -1 ? 4 : percentage)].map(
                    (e, i) => (
                      <Col key={i}>
                        <div className={Styles.pointer}>
                          <AiOutlineCar
                            style={{
                              marginRight: "1.4rem",
                              fontSize: "40px",
                              color: "#3954ff",
                              opacity: "0.7",
                            }}
                          />
                        </div>
                      </Col>
                    )
                  )}
                  {[...Array(percentageOpp === -1 ? 6 : percentageOpp)].map(
                    (e, i) => (
                      <Col key={i}>
                        <div className={Styles.pointer}>
                          <AiOutlineCar
                            style={{ marginRight: "1.4rem", fontSize: "40px" }}
                          />
                        </div>
                      </Col>
                    )
                  )}
                </Row>
                <div>
                  <b>
                    {percentageCar === -1 ? 38.01 : percentageCar.toFixed(2)}%
                  </b>{" "}
                  of the cars are the selected sort from the dataset.
                </div>
              </>
            }
          />
          <Step
            title="The different car segments we're looking at!"
            description={
              <>
                <div>Choose your desired segment and analyze on graph: </div>
                <Select
                  mode="multiple"
                  style={{ width: "25%", padding: "0.8rem 0" }}
                  placeholder="Choose a segment"
                  defaultValue={"SUV"}
                >
                  {!isLoading &&
                    carBody.map((item, idx) => {
                      return (
                        <Option key={idx} value={item.count}>
                          {item._id}
                        </Option>
                      );
                    })}
                </Select>
                <div className={Styles.scatterCard}>
                  <ResponsiveContainer width={650} height={500}>
                    <ScatterChart
                      width={650}
                      height={500}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 0,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="stature"
                        unit="cm"
                        axisLine={{ stroke: "#fff" }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="weight"
                        unit="kg"
                        axisLine={{ stroke: "#fff" }}
                      />

                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Legend />
                      <Scatter
                        name="A school"
                        data={data01}
                        fill="rgba(57, 84, 255, 0.5)"
                        shape="star"
                      />
                      <Scatter
                        name="B school"
                        data={data02}
                        fill="#FFD339"
                        shape="triangle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </>
            }
          />
          <Step
            title="What does this tell us about our customer?"
            description={
              <>
                <Segmented
                  options={["Sedan", "Hatchback", "SUV"]}
                  className={Styles.segments}
                />
                <Row>
                  <Statistic
                    title="Average Price"
                    value={112893}
                    className={Styles.statistic}
                  />
                  <Statistic
                    title="Average Price"
                    value={112893}
                    className={Styles.statistic}
                  />
                </Row>
              </>
            }
          />
        </Steps>
      </div>
    </DashboardLayout>
  );
}
