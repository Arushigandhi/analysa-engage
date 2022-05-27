import { Layout } from "antd";
import Link from "next/link";
import React from "react";
import { BsHeartFill } from "react-icons/bs";
import Styles from "styles/components/Navbar.module.scss";

export default function Footer() {
  return (
    <div>
      <Layout className={Styles.footerContainer}>
        <div className={Styles.wrapper}>
          Developed with <BsHeartFill color="rgba(57, 84, 255, 1)" /> by
          <Link href="https://arushigandhi.com/">
            <p>Arushi Gandhi</p>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
