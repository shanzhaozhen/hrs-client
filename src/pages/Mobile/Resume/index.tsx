import React from 'react';
import {Accordion, DatePicker, List} from "antd-mobile";

const ResumeFill: React.FC = () => {

  const onAccordionChange = (key: any) => {
    console.log(key);
  }

  return (
    <>
      <form>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Accordion accordion openAnimation={{}} className="my-accordion" onChange={onAccordionChange}>
            <Accordion.Panel header="Title 1">
              <List className="date-picker-list">
                <DatePicker>
                  <List.Item arrow="horizontal">Date</List.Item>
                </DatePicker>
              </List>
            </Accordion.Panel>
            <Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
            <Accordion.Panel header="Title 3" className="pad">
              text text text text text text text text text text text text text text text
            </Accordion.Panel>
          </Accordion>
        </div>
      </form>
    </>
  );
};


export default ResumeFill;
