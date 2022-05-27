import { Drawer, Layout, Row } from "antd";
import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { MenuOutlined } from "@ant-design/icons";
import Styles from "styles/components/Sidebar.module.scss";
import useMediaQuery from "components/hooks/useMediaQuery";

const { Sider, Content } = Layout;

const DashboardLayout = ({ children, ...rest }) => {
  const { title } = rest;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <Sider width={isDesktop ? "240" : "0"} style={{ position: "static" }}>
        <Sidebar
          style={{
            position: "static",
          }}
        />
      </Sider>
      <Layout
        style={{
          backgroundColor: "#fafbfd",
          minHeight: "100vh",
        }}
      >
        <>
          <Drawer
            closable={false}
            placement="left"
            onClose={() => setSidebarVisible(false)}
            visible={sidebarVisible}
            className={Styles.drawer}
          >
            <Sidebar />
          </Drawer>
          <Row
            className={Styles.mobileMenuContainer}
            style={{ display: isDesktop ? "none" : "block" }}
          >
            <MenuOutlined
              className={Styles.menuIcon}
              onClick={() => setSidebarVisible(true)}
            />
          </Row>
        </>
        <DashboardHeader title={title} />
        <Content style={{ padding: "0rem 2rem", paddingBottom: "3rem" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
