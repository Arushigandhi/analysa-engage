import { Col, Row } from "antd";
import React from "react";
import Styles from "styles/components/Sidebar.module.scss";
import { AiOutlineHome, AiOutlineCar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FiTool } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const sidebarData = [
    {
      name: "Dashboard",
      icon: <AiOutlineHome className={Styles.navIcon} />,
      path: "/dashboard",
    },
    {
      name: "Customer",
      icon: <BsPeople className={Styles.navIcon} />,
      path: "/customer",
    },
    {
      name: "Specifics",
      icon: <AiOutlineCar className={Styles.navIcon} />,
      path: "/specifics",
    },
    {
      name: "Develop",
      icon: <FiTool className={Styles.navIcon} />,
      path: "/develop",
    },
  ];

  return (
    <Col
      align="middle"
      justify="space-between"
      className={Styles.sidebarContainer}
    >
      <Link href="/">
        <div className={Styles.sidebarHeading}>A.</div>
      </Link>
      <nav className={Styles.sidebarItems}>
        {sidebarData.map((item, index) => (
          <Link href={item.path} key={index}>
            <Row
              className={
                router.pathname === item.path
                  ? Styles.activenavItem
                  : Styles.navItem
              }
            >
              <Col>{item.icon}</Col>
              <Col className={Styles.navItemName}>{item.name}</Col>
            </Row>
          </Link>
        ))}
      </nav>
    </Col>
  );
};

export default Sidebar;
