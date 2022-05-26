import { Button, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Styles from "styles/components/Navbar.module.scss";

export default function Navbar() {
  return (
    <div>
      <Layout className={Styles.navbarContainer}>
        <div className={Styles.wrapper}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/landing">
              <Image
                src={"/ANALYSAlong.png"}
                width={160}
                height={200}
                objectFit="contain"
                alt="bugbase-logo"
                preview="false"
              />
            </Link>
          </div>
          <nav className={Styles.mainNav}>
            <a href="/#aboutSection" className={Styles.navLink}>
              About Analysa
            </a>

            <Link href="/">
              <Button className={Styles.loginButton}>Go to Dashboard</Button>
            </Link>
            {/* )} */}
          </nav>
        </div>
      </Layout>
    </div>
  );
}
