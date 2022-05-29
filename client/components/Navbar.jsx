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
          <div className={Styles.logo}>
            <Link href="/">
              <Image
                src={"/assets/ANALYSAlong.png"}
                width={160}
                height={200}
                objectFit="contain"
                alt="analysa-logo"
                preview="false"
              />
            </Link>
          </div>
          <nav className={Styles.mainNav}>
            <a href="/#video" className={Styles.navLink}>
              About Analysa
            </a>

            <Link href="/dashboard">
              <Button className={Styles.button}>Go to Dashboard</Button>
            </Link>
          </nav>
        </div>
      </Layout>
    </div>
  );
}
