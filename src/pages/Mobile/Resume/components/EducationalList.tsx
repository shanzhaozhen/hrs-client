import React from 'react';
import type {Dispatch, SetStateAction} from 'react';
import { Button, Collapse } from "zarm";
import { Form } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import { customFormListHelp } from "@/utils/zarm";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import {customListValidator} from "@/utils/validate";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";
import ZaCellSwitch from "@/components/CustomZarm/ZaCellSwitch";

interface EducationalListProps {
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
}

const EducationalList: React.FC<EducationalListProps> = (props) => {
  const { errors, setErrors } = props;

  const educationOptions = useOptions('Education');

  const simpleHelp = (index: number, currentField: string) => (customFormListHelp(errors, 'educationalExperienceList', index, currentField));

  const simpleRules = (index: number, currentField: string) => ([{
    validator: async (_: any, value: any) => customListValidator(setErrors, 'educationalExperienceList', index, currentField, value, true),
  }]);


  return (
    <>
      <Form.List name="educationalExperienceList">
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
                        name={[field.name, 'schoolName']}
                        title="学校名称"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入学校名称',
                        }}
                        required={true}
                        help={simpleHelp(index, 'schoolName')}
                        rules={simpleRules(index, 'schoolName')}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'startDate']}
                        title='开始时间'
                        zaDateSelectProps={{
                          placeholder: '请选择开始时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp(index, 'startDate')}
                        rules={simpleRules(index, 'startDate')}
                      />
                      <ZaCellDataSelect
                        name={[field.name, 'endDate']}
                        title="结束时间"
                        zaDateSelectProps={{
                          placeholder: '请选择结束时间',
                          format: 'yyyy年MM月dd日',
                          mode: 'date',
                          min: '1900-01-01',
                          max: '2027-05-15',
                          hasArrow: false
                        }}
                        required={true}
                        trigger="onOk"
                        help={simpleHelp(index, 'endDate')}
                        rules={simpleRules(index, 'endDate')}
                      />
                      <ZaCellSelect
                        name={[field.name, 'education']}
                        title="学历"
                        required={true}
                        help={simpleHelp(index, 'education')}
                        rules={simpleRules(index, 'education')}
                        zaSelectProps={{
                          dataSource: educationOptions,
                          placeholder: '请选择学历'
                        }}
                      />
                      <ZaCellInput
                        name={[field.name, 'major']}
                        title="专业"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入专业'
                        }}
                        required={true}
                        help={simpleHelp(index, 'major')}
                        rules={simpleRules(index, 'major')}
                      />
                      <ZaCellInput
                        name={[field.name, 'studyYears']}
                        title="学制"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入学制'
                        }}
                        required={true}
                        help={simpleHelp(index, 'studyYears')}
                        rules={simpleRules(index, 'studyYears')}
                      />
                      <ZaCellSwitch
                        name={[field.name, 'fullTime']}
                        title="是否全日制"
                        required={true}
                        help={simpleHelp(index, 'fullTime')}
                        rules={simpleRules(index, 'fullTime')}
                      />
                      <ZaCellInput
                        name={[field.name, 'witnessName']}
                        title="证明人姓名"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入证明人姓名',
                        }}
                        required={true}
                        help={simpleHelp(index, 'witnessName')}
                        rules={simpleRules(index, 'witnessName')}
                      />
                      <ZaCellInput
                        name={[field.name, 'witnessPhone']}
                        title="证明人电话"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入证明人电话',
                        }}
                        required={true}
                        help={simpleHelp(index, 'witnessPhone')}
                        rules={simpleRules(index, 'witnessPhone')}
                      />
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

export default EducationalList;
