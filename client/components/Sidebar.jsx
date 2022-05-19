import { Button, Col, Row, Tooltip, message, Menu } from "antd";
import React from "react";
import Styles from "styles/components/Sidebar.module.scss";
import { AiOutlineHome, AiOutlineCar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import ActiveLink from "./ActiveLink";
import Link from "next/link";
// import { logout } from "services/auth.service";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  // const logoutMutation = useMutation(logout, {
  //   onSuccess: () => {
  //     // dispatch(logout());
  //     message.success("Logged out successfully");
  //   },
  //   onError: () => {
  //     message.error("Error logging out");
  //   },
  // });

  // const onLogout = async () => {
  //   await logoutMutation.mutateAsync();
  //   router.push("/");
  // };

  const sidebarData = [
    {
      name: "Dashboard",
      icon: <AiOutlineHome className={Styles.navIcon} />,
      path: "/",
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
      icon: <AiOutlineCar className={Styles.navIcon} />,
      path: "/develop",
    },
  ];

  return (
    <Col
      align="middle"
      justify="space-between"
      className={Styles.sidebarContainer}
    >
      <div className={Styles.sidebarHeading}>A.</div>
      <nav className={Styles.sidebarItems}>
        {sidebarData.map((item, index) => (
          <Link
            href={item.path}
            activeClassName={Styles.activeLink}
            key={index}
          >
            <Row className={Styles.navItem}>
              <Col>{item.icon}</Col>
              <Col className={Styles.navItemName}>{item.name}</Col>
            </Row>
          </Link>
        ))}
        {/* <ActiveLink href={"/"} activeClassName={Styles.activeLink}>
          <Tooltip title={"Logout"} placement="right">
            <div className={Styles.logoutItem}>
              {" "}
              <IoLogOutOutline className={Styles.navIcon} />
            </div>
          </Tooltip>
        </ActiveLink> */}
      </nav>
    </Col>
  );
};

export default Sidebar;
