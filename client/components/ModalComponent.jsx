import { Modal } from "antd";
import Styles from "styles/components/ModalComponent.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalComponent = ({
  heading,
  children,
  show,
  setShow,
  width,
  maxWidth,
  minWidth,
  destroyOnClose,
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
          <h1 className={Styles.headingtextController}>{heading}</h1>
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
        <div className={Styles.children}>{children}</div>
      </Modal>
    </>
  );
};

export default ModalComponent;
