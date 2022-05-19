import { Avatar, Button, Col, Dropdown, Menu, message, Row } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { LeftOutlined } from "@ant-design/icons";
import Styles from "styles/components/DashboardHeader.module.scss";

const DashboardHeader = ({ title }) => {
  const router = useRouter();

  const profileMenu = (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item>Logout</Menu.Item>
    </Menu>
  );
  return (
    <Row
      justify="space-between"
      align="middle"
      className={Styles.DashboardHeaderContainer}
    >
      <Col className={Styles.DashboardHeaderLeft}>
        <Row align="middle">
          <Col>
            <div className={Styles.DashboardHeaderTitle}>{title}</div>
          </Col>
        </Row>
      </Col>
      <Col className={Styles.DashboardHeaderRight}></Col>
    </Row>
  );
};

export default DashboardHeader;
