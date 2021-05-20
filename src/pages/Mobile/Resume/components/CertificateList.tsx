import React from 'react';
import {Button, Cell, Collapse, DateSelect, Input} from "zarm";
import { Form } from 'antd';
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";

// interface CertificateListProps {
//   value?: RegionType;
//   onChange?: (value: any) => void;
// }

const CertificateList: React.FC = () => {

  const CertificateTypeOptions = useOptions('CertificateType')

  return (
    <>
      <Form.List name="certificateList">
        {
          (fields, { add, remove }, { errors }) => (
            <>
              {
                fields.map((field, index) => (
                  <Collapse defaultActiveKey={field.name} key={field.name}>
                    <Collapse.Item
                      title={
                        <>
                          <span>第{index + 1}项</span>
                          <Button
                            style={{ float: "right", marginRight: 15 }}
                            size="xs"
                            theme="danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(field.name)
                            }}
                          >
                            删除
                          </Button>
                        </>
                      }
                      key={field.name}
                      animated
                    >
                      <Cell title="证件名称">
                        <Form.Item name={[field.name, 'name']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入证件名称" />
                        </Form.Item>
                      </Cell>
                      <Cell title="证件类型">
                        <Form.Item name={[field.name, 'type']} isListField={true} noStyle>
                          <ZaSelect dataSource={CertificateTypeOptions} placeholder="请选择证件类型"/>
                        </Form.Item>
                      </Cell>
                      <Cell title="证件号">
                        <Form.Item name={[field.name, 'name']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入证件号" />
                        </Form.Item>
                      </Cell>
                      <Cell title="取证日期">
                        <Form.Item name={[field.name, 'obtainDate']} isListField={true} trigger="onOk" noStyle>
                          <DateSelect
                            title="请选择取证日期"
                            placeholder="请选择取证日期"
                            format="yyyy年MM月dd日"
                            mode="date"
                            min="1900-01-01"
                            max="2027-05-15"
                            hasArrow={false}
                          />
                        </Form.Item>
                      </Cell>
                      <Cell title="发证单位">
                        <Form.Item name={[field.name, 'issueUnit']}  isListField={true} noStyle>
                          <Input clearable type="number" placeholder="请输入发证单位" />
                        </Form.Item>
                      </Cell>
                      <Cell title="附件">
                        <Form.Item name={[field.name, 'fileId']}  isListField={true} noStyle>
                          <Input clearable type="text" placeholder="请输入附件" />
                        </Form.Item>
                      </Cell>
                    </Collapse.Item>
                  </Collapse>
                ))
              }
              <div style={{ textAlign: "center", padding: "15px 10px" }}>
                <button type="button" className="ant-btn ant-btn-dashed ant-btn-block" onClick={() => add()}>
                  <PlusOutlined />
                  <span>添加一项数据</span>
                </button>
              </div>
            </>
          )
        }
      </Form.List>
    </>
  );
};

export default CertificateList;
