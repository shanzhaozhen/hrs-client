import React, { useState } from 'react';
import type {MutableRefObject} from 'react';
import type { FormInstance } from 'antd';
import {Button, Col, Input, Row} from 'antd';
import {ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import ProFormItem from "@ant-design/pro-form/lib/components/FormItem";
import {ContactsOutlined} from "@ant-design/icons";
import {useDepartmentList} from "@/utils/department";
import StaffSelect from "@/pages/HR/StaffList/components/StaffSelect";

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  staffId?: number;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { staffId, isView, isEdit, values } = props;

  const [staffSelectVisible, setStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="调动记录id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          {staffId ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              disabled
            />
          ) : (
            <ProFormItem label="员工编号">
              <Input.Group compact>
                <ProFormItem name="staffCode">
                  <Input
                    placeholder="请选择员工"
                    name="staffCode"
                    disabled
                  />
                </ProFormItem>
                <Button
                  type="primary"
                  icon={<ContactsOutlined />}
                  onClick={() => setStaffSelectVisible(true)}
                >
                  选择员工
                </Button>
              </Input.Group>
            </ProFormItem>
          )}
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
            placeholder="员工姓名"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="depId"
            label="部门"
            options={departmentList.map(item => ({value: item.id || '', label: item.name}))}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="preDuty"
            label="变更前职务"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="effectiveDate"
            label="生效日期"
            rules={[{ required: true, message: '请选择生效日期' }]}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea
            name="remarks"
            label="备注"
          />
        </Col>
      </Row>

      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={setStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          let addFields = {};
          if (!isEdit) {
            addFields = {
              postDepId: selectValue.depId,
              postDuty: selectValue.duty,
              postPost: selectValue.post,
              postPostType: selectValue.postType,
              postPostLevel: selectValue.postLevel,
            }
          }
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            depId: selectValue.depId,
            ...addFields
          })
          setStaffSelectVisible(false);
        }}
      />

    </>
  );
};

export default FormBody;
