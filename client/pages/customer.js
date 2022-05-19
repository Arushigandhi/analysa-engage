import React, { useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import Styles from "styles/pages/Customer.module.scss";
import { Col, Input, Row, Select, Steps, Tag } from "antd";
import { AiOutlineCar, AiOutlinePlusCircle } from "react-icons/ai";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Step } = Steps;
const { Option } = Select;

export default function Customer() {
  const data01 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  const data02 = [
    { x: 200, y: 260, z: 240 },
    { x: 240, y: 290, z: 220 },
    { x: 190, y: 290, z: 250 },
    { x: 198, y: 250, z: 210 },
    { x: 180, y: 280, z: 260 },
    { x: 210, y: 220, z: 230 },
  ];
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };

  const [state, setState] = useState({
    tags: ["Sedan", "Hatchback", "SUV"],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  });

  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setState({ tags });
  };

  const showInput = () => {
    setState({ inputVisible: true }, () => input.focus());
  };

  const handleInputChange = (e) => {
    setState({ inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  const handleEditInputChange = (e) => {
    setState({ editInputValue: e.target.value });
  };

  const handleEditInputConfirm = () => {
    setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const saveEditInputRef = (input) => {
    editInput = input;
  };
  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } =
    state;

  return (
    <DashboardLayout title="Know your Customer">
      <div className={Styles.pointers}>
        <Steps current={5} progressDot direction="vertical">
          <Step
            title="What percentage of the cars are your selection?"
            description={
              <>
                <Select
                  defaultValue={"m6"}
                  style={{ width: "fit-content" }}
                  bordered={false}
                  className={Styles.dropdown}
                >
                  <Option value="m1">SUV</Option>
                  <Option value="m6">Sedan</Option>
                  <Option value="m12">Hatchbank</Option>
                </Select>
                <Row className={Styles.percentage}>
                  {[...Array(7)].map((e, i) => (
                    <Col key={i}>
                      <div className={Styles.pointer}>
                        <AiOutlineCar
                          style={{
                            marginRight: "1.7rem",
                            fontSize: "60px",
                            color: "#3954ff",
                            opacity: "0.7",
                          }}
                        />
                      </div>
                    </Col>
                  ))}
                  {[...Array(3)].map((e, i) => (
                    <Col key={i}>
                      <div className={Styles.pointer}>
                        <AiOutlineCar
                          style={{ marginRight: "1.7rem", fontSize: "60px" }}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
                <div>
                  <b>49%</b> of the cars are the selected sort from the dataset.
                </div>

                <div
                  className={Styles.timelineButton}
                  onClick={() => setModal(true)}
                >
                  Click to know more
                </div>
              </>
            }
          />
          <Step
            title="The different customer segments we're looking at!"
            description={
              <>
                <div>Choose your desired segment and analyze on graph: </div>
                <>
                  <div className={Styles.tagDiv}>
                    {tags?.map((tag, index) => {
                      if (editInputIndex === index) {
                        return (
                          <Input
                            ref={saveEditInputRef}
                            key={tag}
                            size="small"
                            className="tag-input"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                          />
                        );
                      }

                      const isLongTag = tag.length > 20;

                      const tagElem = (
                        <Tag
                          className="edit-tag"
                          key={tag}
                          closable={index !== 0}
                          onClose={() => handleClose(tag)}
                        >
                          <span
                            onDoubleClick={(e) => {
                              if (index !== 0) {
                                setState(
                                  {
                                    editInputIndex: index,
                                    editInputValue: tag,
                                  },
                                  () => {
                                    editInput.focus();
                                  }
                                );
                                e.preventDefault();
                              }
                            }}
                          >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </span>
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                        tagElem
                      );
                    })}
                    {inputVisible && (
                      <Input
                        ref={saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag className="site-tag-plus" onClick={showInput}>
                        <AiOutlinePlusCircle /> New Tag
                      </Tag>
                    )}
                  </div>
                </>
                <div className={Styles.scatterCard}>
                  <ResponsiveContainer width={800} height={600}>
                    <ScatterChart
                      width={800}
                      height={400}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="stature"
                        unit="cm"
                        axisLine={{ stroke: "#fff" }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="weight"
                        unit="kg"
                        axisLine={{ stroke: "#fff" }}
                      />
                      <ZAxis
                        type="number"
                        dataKey="z"
                        range={[60, 400]}
                        name="score"
                        unit="km"
                        axisLine={{ stroke: "#fff" }}
                      />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Legend />
                      <Scatter
                        name="A school"
                        data={data01}
                        fill="rgba(57, 84, 255, 0.7)"
                        shape="star"
                      />
                      <Scatter
                        name="B school"
                        data={data02}
                        fill="#FFD339"
                        shape="triangle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className={Styles.timelineButton}>View Details</div>
              </>
            }
          />
          <Step
            title="Lorem Ipsum"
            description={
              <>
                <div>Lorem Ipsum</div>
                <>
                  <div
                    className={Styles.timelineButton}
                    onClick={() => setModal(true)}
                  >
                    Lorem Ipsum
                  </div>
                  <div className={Styles.timelineButton}>View Details</div>
                </>
              </>
            }
          />
        </Steps>
      </div>
    </DashboardLayout>
  );
}
