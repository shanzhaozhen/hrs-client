import React, {Dispatch, SetStateAction} from 'react';
import {Button, Cell, Collapse, Input} from "zarm";
import { Form } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import {customFormListHelp} from "@/utils/zarm";
import {customListValidator} from "@/utils/validate";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";

interface CertificateListProps {
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
}

const CertificateList: React.FC<CertificateListProps> = (props) => {
  const { errors, setErrors } = props;

  const certificateTypeOptions = useOptions('CertificateType')

  return (
    <>
      <Form.List name="certificateList">
        {
          (fields, { add, remove }) => (
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
                      <ZaCellInput
                        name={[field.name, 'name']}
                        title="证件名称"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入证件名称',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'certificateList', index, 'name')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'certificateList', index, 'name', value, true),
                        }]}
                      />
                      <ZaCellSelect
                        name={[field.name, 'type']}
                        title="证件类型"
                        required={true}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'certificateList', index, 'type', value, true),
                        }]}
                        zaSelectProps={{
                          dataSource: certificateTypeOptions,
                          placeholder: '请选择证件类型'
                        }}
                      />
                      <ZaCellInput
                        name={[field.name, 'number']}
                        title="证件号"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入证件号',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'certificateList', index, 'number')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'certificateList', index, 'number', value, true),
                        }]}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'obtainDate']}
                        title="取证日期"
                        zaDateSelectProps={{
                          placeholder: '请选择取证日期',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'educationalExperienceList', index, 'endDate', value, true),
                        }]}
                      />
                      <ZaCellInput
                        name={[field.name, 'issueUnit']}
                        title="发证单位"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入发证单位',
                        }}
                        required={true}
                        help={customFormListHelp(errors, 'certificateList', index, 'issueUnit')}
                        rules={[{
                          validator: async (_, value) => customListValidator(setErrors, 'certificateList', index, 'number', value, true),
                        }]}
                      />
                      {/* todo: 附件 */}
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
