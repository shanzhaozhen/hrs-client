import React, { useEffect, useState } from 'react';
import type { MutableRefObject } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Input, Row } from 'antd';
import ProForm, {ProFormDatePicker, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {getAllDepartments, getDepartmentTree} from "@/services/department/department";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import FormTreeSelect from "@/components/FormTreeSelect";
import {loopDepartmentData} from "@/utils/department";
import { ContactsOutlined } from "@ant-design/icons";
import StaffSelect from "@/pages/HR/StaffList/components/StaffSelect";
import {tableFilter} from "@/utils/common";
import type {DepartmentVO} from "@/services/department/typings";
import type {DataNode} from "rc-tree/lib/interface";

interface FormProps {
  isEdit?: boolean;
  formRef?: MutableRefObject<FormInstance | any>;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isEdit, formRef } = props;

  const [staffSelectVisible, setStaffSelectVisible] = useState<boolean>(false);

  const [departmentList, setDepartmentList] = useState<DepartmentVO[]>([]);
  const [departmentTree, setDepartmentTree] = useState<DataNode[]>([]);

  useEffect(() => {
    getAllDepartments()
      .then(({ data }) => {
        setDepartmentList(data || []);
      })
      .catch(() => {
        setDepartmentList([]);
      });
  }, []);

  useEffect(() => {
    getDepartmentTree()
      .then(({ data }) => {
        setDepartmentTree(loopDepartmentData(data || []));
      })
      .catch(() => {
        setDepartmentTree([]);
      });
  }, []);

  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="调动记录id" hidden={true} />
        <ProFormText name="staffId" label="员工id" hidden={true} />
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item label="员工编号" name="staffCode">
            <Input.Group compact>
              <Input
                style={{ width: '60%' }}
                placeholder="请选择员工"
                disabled
              />
              <Button
                type="primary"
                icon={<ContactsOutlined />}
                style={{ width: '40%' }}
                onClick={() => setStaffSelectVisible(true)}
              >
                选择员工
              </Button>
            </Input.Group>
          </ProForm.Item>
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="staffName"
            label="员工姓名"
            placeholder="请选择员工"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="preDepId"
            label="变更前部门"
            options={departmentList.map(item => ({value: item.id || '', label: item.name}))}
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item
            name="postDepId"
            label="变更后部门"
            rules={[{ required: false, message: '请选择部门' }]}
          >
            <FormTreeSelect treeData={departmentTree} placeholder="请选择部门" />
          </ProForm.Item>
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
          <ProFormSelect
            width="md"
            name="postDuty"
            label="变更后职务"
            rules={[{ required: false, message: '请选择职务' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('Duty', keyWords);
              return data ? data.map(item => ({
                value: item.name,
                label: item.name
              })) : []
            }}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="prePost"
            label="变更前岗位"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPost"
            label="变更后岗位"
            rules={[{ required: false, message: '请选择岗位' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('Post', keyWords);
              return data ? data.map(item => ({
                value: item.name,
                label: item.name
              })) : []
            }}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="prePostType"
            label="变更前岗位类型"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPostType"
            label="变更后岗位类型"
            rules={[{ required: false, message: '请选择岗位类型' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('PostType', keyWords);
              return data ? data.map(item => ({
                value: item.name,
                label: item.name
              })) : []
            }}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormText
            width="md"
            name="prePostLevel"
            label="变更前岗位等级"
            disabled
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="postPostLevel"
            label="变更后岗位等级"
            rules={[{ required: false, message: '请选择岗位等级' }]}
            request={async ({ keyWords }) => {
              const { data } = await getDictionaryChildrenByCode('PostLevel', keyWords);
              return data ? data.map(item => ({
                value: item.name,
                label: item.name
              })) : []
            }}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProFormDatePicker
            width="md"
            name="effectiveDate"
            label="生效日期"
          />
        </Col>
      </Row>

      <StaffSelect
        staffSelectVisible={staffSelectVisible}
        handleStaffSelectVisible={setStaffSelectVisible}
        onSelectAction={(selectValue) => {
          const currentFormValue = formRef?.current.getFieldsValue();
          formRef?.current.setFieldsValue({
            ...currentFormValue,
            staffId: selectValue.id,
            staffCode: selectValue.staffCode,
            staffName: selectValue.staffName,
            preDepId: selectValue.depId,
            preDuty: selectValue.duty,
            prePost: selectValue.post,
            prePostType: selectValue.postType,
            prePostLevel: selectValue.postLevel
          })
          setStaffSelectVisible(false);
        }}
      />
    </>
  );
};

FormBody.defaultProps = {
  isEdit: false,
};

export default FormBody;
