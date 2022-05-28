import React, { useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import Styles from "styles/pages/Customer.module.scss";
import {
  Col,
  Row,
  Segmented,
  Select,
  Spin,
  Statistic,
  Steps,
  Tooltip,
} from "antd";
import { AiOutlineCar } from "react-icons/ai";
import { useQuery } from "react-query";
import { getBodyType, getCarsPrice } from "services/dashboard.service";
import { BsInfoCircle } from "react-icons/bs";

const { Step } = Steps;
const { Option } = Select;

export default function Customer() {
  const [value, setValue] = useState("SUV");
  const [avg, setAvg] = useState(-1);
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

  var processed = carBody?.map(({ _id }) => _id);

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
            title="What does this tell us about our customer?"
            description={
              <>
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <Segmented
                    options={processed?.slice(0, 6)}
                    className={Styles.segments}
                    defaultValue={"SUV"}
                    onChange={(e) => {
                      setValue(e);
                      setAvg(
                        carPrice.bodyType[e]?.price /
                          carPrice.bodyType[e]?.count
                      );
                    }}
                  />
                )}
                <Col>
                  <Row className={Styles.description}>
                    <p style={{ display: value === "SUV" ? "block" : "none" }}>
                      Quite popular in the Indian market, SUV is a car body-type
                      that comprises vehicles that are both passenger vehicles
                      as well as off-roaders. SUVs are generally large and
                      measure well over the 4 meter mark, with compact SUVs
                      being the exception, coming under 4 meters. Built with a
                      tall bodyline, SUVs provide the driver with a commanding
                      view of the road ahead. As a rugged vehicle, SUVs are
                      capable enough to drive on harsh roads quite easily. An
                      SUV is generally built with mechanical parts that are
                      specifically designed for tough usage, all-terrain
                      conditions and heavy loads.
                      <br />
                      <br />
                      The SUV is a vehicle for people who are well-off and fond
                      of comfort. SUV drivers are sometimes called “suburban
                      farmers”. They are wealthy family-oriented drivers with
                      houses in both the city and country.
                    </p>
                    <p
                      style={{ display: value === "Sedan" ? "block" : "none" }}
                    >
                      Sedans are designed to provide utmost comfort and
                      convenience for passengers both at the front as well as
                      the rear. The major component of a sedan is its longer
                      body that`s built with a three-box configuration
                      consisting of pillars identified as A, B, and C pillars.
                      Compared to hatchbacks, sedans have a separate boot
                      compartment, which exists as an addition to the vehicle`s
                      bodyline. Thus, when you open up a sedan`s boot, you`re
                      opening just the boot and not the car itself. With the
                      boot being a separate compartment, a sedan can comfortably
                      seat 5 passengers. As compared to other body types, sedans
                      are considered to be one the most feature loaded, and are
                      thus priced higher than hatchbacks, and sometimes even
                      SUVs. In terms of design, sedans come with an average
                      dimension of 4 meters and above, and with engine capacity
                      of 1.5 to 1.8 liters.
                      <br />
                      <br />
                      This car is a dream come true for the type of people who
                      would like to experience a combination of both comfort and
                      luxury to a certain point at a reasonable price.
                    </p>
                    <p
                      style={{
                        display: value === "Hatchback" ? "block" : "none",
                      }}
                    >
                      A traditional hatchback features a two-box configuration
                      with either two or four doors. The engine bay is separate
                      and distinct from the passenger compartment and cargo
                      area, which is a combined and shared space. Due to its
                      size, the hatchback is often counted as a door, leading to
                      body style descriptors such as three-door or five-door.
                      <br />
                      <br />
                      No matter what you call it, a hatchback is exceptionally
                      practical, especially when you fold down the back seats.
                    </p>
                    <p
                      style={{ display: value === "Coupe" ? "block" : "none" }}
                    >
                      A body type that isn`t conventional like other bodylines,
                      Coupes are known for their sporty avatar and aerodynamic
                      stance. Unlike Sedans, SUVs, Hatchbacks and even MUVs, the
                      most striking features of a Coupe, is the fact that it has
                      two doors only. Coupes are characterized by their
                      two-doors, three-box design, fixed roof, and sleeker
                      roofline. And even though Coupes are generally two-door,
                      modern day OEMs are also manufacturing four door Coupes,
                      which are generally given characteristics like a sloping
                      roofline, and a sportier stance.
                      <br />
                      <br />
                      Coupe cars are generally performance oriented vehicles,
                      and are thus capable of going to triple digit speed in a
                      matter of seconds. They pack in large engines, and are all
                      about sheer performance.
                    </p>
                    <p style={{ display: value === "MUV" ? "block" : "none" }}>
                      Although the SUVs and MUVs are similarly designed, the two
                      are inherently different. MUVs are built for maximum
                      practicality and utility. An MUV vehicle is thus a
                      multipurpose vehicle that is often dubbed as a people`s
                      carrier. Capable of seating as many as 10 people
                      sometimes, MUVs are a bigger version of passenger cars
                      that are mainly designed to transport passengers
                      comfortably in cities and highways.
                      <br />
                      <br />
                      MUVs are generally built with a high strength chassis
                      frame, capable of carrying extra passengers as well as
                      luggage. In terms of day-to-day utility, MUVs generally
                      offers better fuel efficiency when compared to SUVs that
                      are similarly sized. Typical powertrains of an MUV include
                      an engine capacity of somewhere between 2.0 to 2.5 liters.
                      Thus, for those who want practicality and efficiency over
                      rugged looks and off-road capabilities, an MUV could be
                      the perfect fit.
                    </p>
                    <p style={{ display: value === "MPV" ? "block" : "none" }}>
                      MPV is a new term in the last few years, referring to a
                      "multi-purpose vehicle" or "multi-person vehicle." MPVs
                      are designed to carry passengers on regular trips. What
                      these vehicles do particularly well is provide ease of
                      access, with modern boxy designs that also provide ample
                      storage capacity and overall passenger comfort.
                      <br />
                      <br />
                    </p>
                    <Tooltip
                      title="Data sourced from: https://peacockplume.fr/, https://www.spinny.com/blog/index.php/types-of-cars-in-india/, https://www.cazoo.co.uk/the-view/buying/what-is-an-mpv/"
                      placement="top"
                    >
                      <BsInfoCircle
                        style={{
                          margin: "0 5px",
                          marginTop: "5px",
                        }}
                      />
                    </Tooltip>
                  </Row>
                  <Row>
                    <Statistic
                      title="Average Price"
                      value={
                        avg === -1 ? "₹4,255,617.22" : "₹" + avg.toFixed(2)
                      }
                      className={Styles.statistic}
                    />
                    <Statistic
                      title="Number of Cars in Consideration"
                      value={carPrice?.bodyType[value]?.count}
                      className={Styles.statistic}
                    />
                  </Row>
                </Col>
              </>
            }
          />
        </Steps>
      </div>
    </DashboardLayout>
  );
}
