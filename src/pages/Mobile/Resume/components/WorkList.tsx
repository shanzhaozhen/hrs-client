import React from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {Button, Collapse} from "zarm";
import { Form } from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {useOptions} from "@/utils/options";
import { customFormListHelp } from "@/utils/zarm";
import {customListValidator} from "@/utils/validate";
import ZaCellInput from "@/components/CustomZarm/ZaCellInput";
import ZaCellDataSelect from "@/components/CustomZarm/ZaCellDataSelect";
import ZaCellSelect from "@/components/CustomZarm/ZaCellSelect";

interface WorkExperienceListProps {
  errors: any;
  setErrors: Dispatch<SetStateAction<any>>;
}

const WorkExperienceList: React.FC<WorkExperienceListProps> = (props) => {
  const { errors, setErrors } = props;

  const unitTypeOptions = useOptions('UnitType');

  const simpleHelp = (index: number, currentField: string) => (customFormListHelp(errors, 'workExperienceList', index, currentField));

  const simpleRules = (index: number, currentField: string) => ([{
    validator: async (_: any, value: any) => customListValidator(setErrors, 'workExperienceList', index, currentField, value, true),
  }]);

  return (
    <>
      <Form.List name="workExperienceList">
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
                        name={[field.name, 'workUnit']}
                        title="工作单位"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入工作单位',
                        }}
                        required={true}
                        help={simpleHelp(index, 'workUnit')}
                        rules={simpleRules(index, 'workUnit')}
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
                      <ZaCellInput
                        name={[field.name, 'duty']}
                        title="职务/岗位"
                        zaInputProps={{
                          type: 'text',
                          clearable: true,
                          placeholder: '请输入职务/岗位',
                        }}
                        required={true}
                        help={simpleHelp(index, 'duty')}
                        rules={simpleRules(index, 'duty')}
                      />
                      <ZaCellSelect
                        name={[field.name, 'unitType']}
                        title="单位性质"
                        required={true}
                        help={simpleHelp(index, 'unitType')}
                        rules={simpleRules(index, 'unitType')}
                        zaSelectProps={{
                          dataSource: unitTypeOptions,
                          placeholder: '请选择单位性质'
                        }}
                      />
                      <ZaCellInput
                        name={[field.name, 'salary']}
                        title="月薪"
                        zaInputProps={{
                          type: 'number',
                          clearable: true,
                          placeholder: '请输入月薪',
                        }}
                        required={true}
                        help={simpleHelp(index, 'salary')}
                        rules={simpleRules(index, 'salary')}
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
                <button type="button" className="ant-btn ant-btn-dashed ant-btn-block" onClick={() => add({})}>
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

export default WorkExperienceList;
