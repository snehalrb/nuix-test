import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ReactDOM from "react-dom";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabContent = styled.div`
  color: black;
  font-weight: bold;
  padding: 10px;
`;

const OverLay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.9;
  z-index: 4;
`;
const Wrapper = styled.div`
  max-width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 200px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

type props = {
  data: [
    [
      {
        city: string;
        street: string;
      },
      {
        name: string;
        bs: string;
      }
    ]
  ];
  showModal: boolean;
};

const SimpleModal: React.FC<props> = ({ data, showModal }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const ref = useRef<HTMLElement | null>();

  useEffect(() => {
    ref.current = document.getElementById("modal-root");
  }, []);
  const handleTabChange = (event: React.ChangeEvent<{}>, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  return ref.current && showModal
    ? ReactDOM.createPortal(
        <OverLay>
          <Wrapper>
            <TabsContainer>
              <Tabs
                value={currentTabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="Address" />
                <Tab label="Company" />
              </Tabs>
            </TabsContainer>
            {data && currentTabIndex === 0 && (
              <TabContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<p>City :" +
                      data[0][0].city +
                      "</p><p>Street :" +
                      data[0][0].street +
                      "</p>",
                  }}
                ></div>
              </TabContent>
            )}
            {data && currentTabIndex === 1 && (
              <TabContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<p>Name :" +
                      data[0][1].name +
                      "</p><p>BS :" +
                      data[0][1].bs +
                      "</p>",
                  }}
                ></div>
              </TabContent>
            )}
          </Wrapper>
        </OverLay>,
        ref.current
      )
    : null;
};

export default SimpleModal;
