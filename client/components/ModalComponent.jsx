import { Modal } from "antd";
import Styles from "styles/components/ModalComponent.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalComponent = ({
  heading,
  subheading,
  description,
  children,
  show,
  setShow,
  width,
  maxWidth,
  minWidth,
  destroyOnClose,
  keyboard,
}) => {
  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        className={Styles.modalContainer}
        visible={show}
        centered={true}
        width={width ? width : 900}
        style={{
          maxWidth: maxWidth ? maxWidth : "900px",
        }}
        destroyOnClose={destroyOnClose}
      >
        <div className={Styles.headingController}>
          <div className={Styles.headingtextController}>
            <h1>{heading}</h1>
            <h2>{subheading}</h2>
          </div>
          <div>
            <AiFillCloseCircle
              style={{
                color: "3954ff",
                fontSize: "2rem",
                cursor: "pointer",
                opacity: "0.5",
              }}
              onClick={closeModal}
            />
          </div>
        </div>
        <p className={Styles.headingController}>{description}</p>
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
