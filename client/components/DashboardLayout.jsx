import { Layout } from "antd";
import { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const { Sider, Content } = Layout;

const DashboardLayout = ({ children, ...rest }) => {
  const { title } = rest;

  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <Sider width={240} style={{ position: "static" }}>
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
        <DashboardHeader title={title} />
        <Content style={{ padding: "0rem 2rem", paddingBottom: "3rem" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
