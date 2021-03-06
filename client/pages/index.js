import { Row, Col, Card, Divider, Button, Timeline } from "antd";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Image from "next/image";
import React from "react";
import Styles from "styles/pages/Landing.module.scss";
import { BsArrowRight } from "react-icons/bs";
import {
  HeartTwoTone,
  CheckCircleTwoTone,
  ClockCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import useMediaQuery from "components/hooks/useMediaQuery";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <div className={Styles.homePage}>
      <Navbar />
      <Row className={Styles.hero}>
        <Col className={Styles.heroCol}>
          <p>Where you go for Data Analysis.</p>
          <h1>
            Analysa is your one stop platform to analyse all things car
            industry. Analysa harnesses the power of a dataset of 1200 cars with
            more than 150 attributes, serving you with the knowledge of the
            automotive industry!
          </h1>
          <a
            href="/cars_engage_2022.csv"
            download
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(57, 84, 255, 1)",
            }}
          >
            Click here to download dataset <BsArrowRight />
          </a>
        </Col>
        <Col className={Styles.heroCol} style={{ textAlign: "center" }}>
          <Image
            src={"/vectors/car.svg"}
            width={450}
            height={450}
            objectFit="contain"
            alt="analysa-hero"
          />
        </Col>
      </Row>
      <Col className={Styles.heading}>
        <h2>Analysa's Highlighted Features</h2>
        <Divider className={Styles.divider} />
      </Col>
      <Row className={Styles.cardController}>
        <Card className={Styles.card} bordered={false} hoverable>
          <h3>Interactive Dashboard</h3>
          <p>
            The Dashboard showcases the highlights of our dataset using pie
            charts, graphs and bar charts. All this in a customisable format, so
            you can get the most out of your data, the way you want!
          </p>
          <div style={{ textAlign: "right", marginRight: "2rem" }}>
            <Image
              src={"/vectors/three.svg"}
              width={100}
              height={100}
              objectFit="contain"
              alt="feature-img"
            />
          </div>
        </Card>
        <Card className={Styles.card} bordered={false} hoverable>
          <h3>Know your Customer</h3>
          <p>
            Being a part of any industry requires a thorough knowledge of the
            industry's audience. Use Analysa to get an accurate understanding of
            your customers, their price and car preferences.
          </p>
          <div style={{ textAlign: "right", marginRight: "2rem" }}>
            <Image
              src={"/vectors/one.svg"}
              width={100}
              height={100}
              objectFit="contain"
              alt="feature-img"
            />
          </div>
        </Card>
        <Card className={Styles.card} bordered={false} hoverable>
          <h3>Similarity Search</h3>
          <p>
            Have two similar cars in your inventory? Use Analysa to find out how
            similar they are. Just map out your car's major specifications
            relating to engine and performance and we shall generate a score for
            you!
          </p>
          <div style={{ textAlign: "right", marginRight: "2rem" }}>
            <Image
              src={"/vectors/two.svg"}
              width={100}
              height={100}
              objectFit="contain"
              alt="feature-img"
            />
          </div>
        </Card>
      </Row>
      <Col className={Styles.heading}>
        <h2>Development Journey</h2>
        <Divider className={Styles.divider} />
      </Col>
      <Row className={Styles.timeline}>
        <Timeline mode={isDesktop ? "alternate" : "left"}>
          <Timeline.Item
            color="rgba(57, 84, 255, 1)"
            dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
          >
            <div>
              <span>Week 1:</span>
              <h1>Brainstorm Brainstorm Brainstorm</h1>
              <h2>
                Explored all possibilities of the different problem statements
                and my own interest in it.
              </h2>
            </div>
          </Timeline.Item>
          <Timeline.Item
            color="rgba(57, 84, 255, 1)"
            dot={
              <RocketOutlined
                style={{ fontSize: "16px" }}
                twoToneColor="rgba(57, 84, 255, 1)"
              />
            }
          >
            <div>
              <span>Week 2:</span>
              <h1>Plan Prototype Plan</h1>
              <h2>
                Having decided on my problem statement, ventured further into
                the details and requirements of this project
              </h2>
            </div>
          </Timeline.Item>
          <Timeline.Item
            color="rgba(57, 84, 255, 1)"
            dot={
              <HeartTwoTone
                style={{ fontSize: "16px" }}
                twoToneColor="rgba(57, 84, 255, 1)"
              />
            }
          >
            <div>
              <span>Week 3:</span>
              <h1>Get Coding</h1>
              <h2>
                From hashing out the boiler plate, designing the frontend to
                curating backend logic, figma and VSCode worked overtime.
              </h2>
            </div>
          </Timeline.Item>
          <Timeline.Item
            color="rgba(57, 84, 255, 1)"
            dot={
              <CheckCircleTwoTone
                style={{ fontSize: "16px" }}
                twoToneColor="rgba(57, 84, 255, 1)"
              />
            }
          >
            <div>
              <span>Week 4:</span>
              <h1>Wrapping up</h1>
              <h2>
                Errors and bugs were found and fixed in abundance, implemented
                further features and improved the user experience.
              </h2>
            </div>
          </Timeline.Item>
        </Timeline>
      </Row>
      <Col className={Styles.heading} id="video">
        <h2>Product Demo</h2>
        <Divider className={Styles.divider} />
      </Col>
      <Row justify="center" style={{ padding: "5rem" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ylj3dweu6GI"
          title="YouTube video player"
          frameborder="2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Row>
      <Footer />
    </div>
  );
}
