import { Button } from "antd";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Styles from "styles/pages/404.module.scss";

export default function Custom404() {
  return (
    <div>
      <Navbar />
      <div className={Styles.container}>
        <Image
          src="/vectors/404.svg"
          width={400}
          height={400}
          objectFit="contain"
        />
        <h1>The page you're looking for does not exist :(</h1>
        <h2>Error Code: 404</h2>
        <Link href="/">
          <Button className={Styles.button}>Go Home</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
