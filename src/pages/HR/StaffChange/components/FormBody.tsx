import React, { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Input, Row } from 'antd';
import {
  ProFormDatePicker,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import FormTreeSelect from '@/components/FormTreeSelect';
import { useDepartmentList, useDepartmentTree } from '@/utils/department';
import { ContactsOutlined } from '@ant-design/icons';
import ProFormItem from '@ant-design/pro-form/lib/components/FormItem';
import { useOptions } from '@/utils/options';
import StaffSelect from '@/components/StaffSelect';

interface FormProps {
  isView?: boolean;
  isEdit?: boolean;
  staffId?: number;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, isEdit, staffId, formRef } = props;

  const [staffSelectVisible, handleStaffSelectVisible] = useState<boolean>(false);

  const departmentList = useDepartmentList();
  const departmentTree = useDepartmentTree();
  const dutyOptions = useOptions('Duty');
  const postOptions = useOptions('Post');
  const postTypeOptions = useOptions('PostType');
  const postLevelOptions = useOptions(
    'PostLevel',
    'name',
    'code',
    (item) => `${item.name}(${item.code})`,
  );

  return (
    <>
      <ProFormText name="id" label="调动记录id" hidden={true} />
      <ProFormText name="staffId" label="员工id" hidden={true} />
      <ProFormSwitch name="executed" label="是否已执行" hidden={true} />
      <Row gutter={24}>
        <Col xl={12} lg={12} md={24}>
          {staffId || isView ? (
            <ProFormText
              width="md"
              name="staffCode"
              label="员工编号"
              placeholder="员工编号"
              rules={[{ required: true, message: '不是有效的员工' }]}
              readonly={isView}
              disabled
            />
          ) : (
            <ProFormItem label="员工编号">
              <Input.Group compact>
                <ProFormItem
                  name="staffCode"
                  rules={[{ required: true, message: '请选择员工' }]}
                  style={{ width: '218px' }}
                >
                  <Input placeholder="请选择员工" name="staffCode" disabled />
                </ProFormItem>
                <Button
                  type="primary"
                  icon={<ContactsOutlined />}
                  onClick={() => handleStaffSelectVisible(true)}
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
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="preDepId"
            label="变更前部门"
            options={departmentList.map((item) => ({ value: item.id || '', label: item.name }))}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormItem
            name="postDepId"
            label="变更后部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <FormTreeSelect
              treeData={departmentTree}
              style={{ width: 328 }}
              placeholder="请选择部门"
              readonly={isView}
            />
          </ProFormItem>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText width="md" name="preDuty" label="变更前职务" readonly={isView} disabled />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postDuty"
            label="变更后职务"
            rules={[{ required: false, message: '请选择职务' }]}
            options={dutyOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText width="md" name="prePost" label="变更前岗位" readonly={isView} disabled />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPost"
            label="变更后岗位"
            rules={[{ required: true, message: '请选择岗位' }]}
            options={postOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="prePostType"
            label="变更前岗位类型"
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPostType"
            label="变更后岗位类型"
            rules={[{ required: true, message: '请选择岗位类型' }]}
            options={postTypeOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="prePostLevel"
            label="变更前岗位等级"
            options={postLevelOptions}
            readonly={isView}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPostLevel"
            label="变更后岗位等级"
            rules={[{ required: true, message: '请选择岗位等级' }]}
            options={postLevelOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="effectiveDate"
            label="生效日期"
            tooltip="生效日期为该员工公布组织架构变化（或资格等级）的日期"
            rules={[{ required: true, message: '请选择生效日期' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="changeDate"
            label="变更日期"
            tooltip="变更日期为到达这个时间后，将会变更为本次的修改值"
            rules={[{ required: true, message: '请选择变更日期' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea name="remarks" label="备注" readonly={isView} />
        </Col>
      </Row>

      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={handleStaffSelectVisible}
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
            };
          }
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            preDepId: selectValue.depId,
            preDuty: selectValue.duty,
            prePost: selectValue.post,
            prePostType: selectValue.postType,
            prePostLevel: selectValue.postLevel,
            ...addFields,
          });
          handleStaffSelectVisible(false);
        }}
      />
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
