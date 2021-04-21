import React, {useEffect, useState} from 'react';
import { Col, Row } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger
} from '@ant-design/pro-form';
import type { StaffVO } from "@/services/staff/typings";
import { getDictionaryChildrenByCode } from "@/services/dictionary/dictionary";
import RegionSelect from "@/components/RegionSelect";
import DepartmentHistory from "@/pages/HR/StaffList/components/DepartmentHistory";
import type { RegionType } from "@/services/region/typings";
import { FileVO } from '@/services/file/typings';
import {getFileById, upload} from '@/services/file/file';
import {UploadFile} from "antd/lib/upload/interface";

interface FormProps {
  isView?: boolean;
  values?: StaffVO;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { isView, values } = props;

  // const [birthAddress, setBirthAddress] = useState<string[]>([])
  const [birthAddress, setBirthAddress] = useState<RegionType>({})
  const [nativeAddress, setNativeAddress] = useState<RegionType>({})
  const [registeredAddress, setRegisteredAddress] = useState<RegionType>({})
  const [homeAddress, setHomeAddress] = useState<RegionType>({})
  const [currentAddress, setCurrentAddress] = useState<RegionType>({})
  const [postalAddress, setPostalAddress] = useState<RegionType>({})
  const [marriageFile, setMarriageFile] = useState<UploadFile[]>([{
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  }])

  useEffect(() => {
    if (values) {
      setBirthAddress({
        province: values.birthAddressProvince,
        city: values.birthAddressCity
      });
      setNativeAddress({
        province: values.nativeAddressProvince,
        city: values.nativeAddressCity
      })
      setRegisteredAddress({
        province: values.registeredAddressProvince,
        city: values.registeredAddressCity,
        area: values.registeredAddressArea,
        detail: values.registeredAddressDetail
      })
      setHomeAddress({
        province: values.homeAddressProvince,
        city: values.homeAddressCity,
        area: values.homeAddressArea,
        detail: values.homeAddressDetail
      })
      setCurrentAddress({
        province: values.currentAddressProvince,
        city: values.currentAddressCity,
        area: values.currentAddressArea,
        detail: values.currentAddressDetail
      })
      setPostalAddress({
        province: values.postalAddressProvince,
        city: values.postalAddressCity,
        area: values.postalAddressArea,
        detail: values.postalAddressDetail
      })
    }
  }, []);

  useEffect(() => {
    if (values && values.marriageCertificate) {
      getFileById(values.marriageCertificate).then(res => {
        console.log(res)
      });
    }
  }, [])



  return (
    <>
      <Row gutter={24}>
        <ProFormText name="id" label="员工id" hidden={true} />
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="staffCode"
            label="员工编号"
            rules={[{ required: true, message: '请输入员工编号' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="staffName"
            label="员工姓名"
            rules={[{ required: true, message: '请输入员工名称' }]}
            readonly={isView}
          />
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="depId"
            label="部门ID"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={7} lg={12} md={24}>
          <ProForm.Item label="所属部门" name="depId">
            <DepartmentHistory />
          </ProForm.Item>
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="companyState"
            label="在司状态"
            rules={[{ required: false, message: '请输入在司状态' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('CompanyState', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="duty"
            label="职务"
            rules={[{ required: false, message: '请输入职务' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="post"
            label="岗位"
            rules={[{ required: false, message: '请输入岗位' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="postType"
            label="岗位类型"
            rules={[{ required: false, message: '请选择岗位类型' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('PostType', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="sex"
            label="性别"
            options={[
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ]}
            rules={[{ required: false, message: '请选择性别' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="nation"
            label="民族"
            rules={[{ required: false, message: '请选择民族' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Nation', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="birthday"
            label="出生日期"
            rules={[{ required: false, message: '请选择出生日期' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="workDate"
            label="开始工作时间"
            rules={[{ required: false, message: '请选择开始工作时间' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="entryDate"
            label="入职日期"
            rules={[{ required: false, message: '请选择入职日期' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="politics"
            label="政治面貌"
            rules={[{ required: false, message: '请选择政治面貌' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Politics', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="education"
            label="最高学历"
            rules={[{ required: false, message: '请选择最高学历' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Education', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="degree"
            label="学位"
            rules={[{ required: false, message: '请选择学位' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('Degree', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="idNumber"
            label="身份证号码"
            rules={[{ required: false, message: '请输入身份证号码' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="phone"
            label="联系电话"
            placeholder="请输入联系电话"
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="socialSecurityNumber"
            label="社保号"
            placeholder="请输入社保号"
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProForm.Item name="birthAddress" label="出生地">
            <RegionSelect level={2} customValue={birthAddress} disabled={isView} />
          </ProForm.Item>
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="birthAddressProvince"
            label="出生地(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="birthAddressCity"
            label="出生地(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={7} lg={12} md={24}>
          <ProForm.Item name="nativeAddress" label="籍贯">
            <RegionSelect level={2} customValue={nativeAddress} disabled={isView} />
          </ProForm.Item>
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="nativeAddressProvince"
            label="籍贯(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="nativeAddressCity"
            label="籍贯(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="householdType"
            label="户口类型"
            rules={[{ required: false, message: '请选择户口类型' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('HouseholdType', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item name="registeredAddress" label="户口地址">
            <RegionSelect level={3} customValue={registeredAddress} hasDetail disabled={isView} />
          </ProForm.Item>
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressProvince"
            label="户口地址(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressCity"
            label="户口地址(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressArea"
            label="户口地址(区)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="registeredAddressDetail"
            label="户口地址(详细)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item name="homeAddress" label="家庭住址">
            <RegionSelect level={3} customValue={homeAddress} hasDetail disabled={isView} />
          </ProForm.Item>
        </Col>
        {/*
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressProvince"
            label="家庭住址(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressCity"
            label="家庭住址(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressArea"
            label="家庭住址(区)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="homeAddressDetail"
            label="家庭住址(详细)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item name="currentAddress" label="现住地址">
            <RegionSelect level={3} customValue={currentAddress} hasDetail disabled={isView} />
          </ProForm.Item>
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressProvince"
            label="现住地址(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressCity"
            label="现住地址(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressArea"
            label="现住地址(区)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="currentAddressDetail"
            label="现住地址(详细)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={12} lg={12} md={24}>
          <ProForm.Item name="postalAddress" label="邮递地址">
            <RegionSelect level={3} customValue={postalAddress} hasDetail disabled={isView} />
          </ProForm.Item>
        </Col>
        {/* <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressProvince"
            label="邮递地址(省)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressCity"
            label="邮递地址(市)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressArea"
            label="邮递地址(区)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="postalAddressDetail"
            label="邮递地址(详细)"
            rules={[{ required: false, message: '请输入部门ID' }]}
          />
        </Col> */}
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactName"
            label="紧急联系人姓名"
            rules={[{ required: false, message: '请输入部门ID' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactRelation"
            label="紧急联系人关系"
            rules={[{ required: false, message: '请输入部门ID' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="contactPhone"
            label="紧急联系人电话"
            rules={[{ required: false, message: '请输入部门ID' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="maritalStatus"
            label="婚姻状况"
            rules={[{ required: false, message: '请选择婚姻状况' }]}
            request={async ({ keyWords }) => {
              const data = await getDictionaryChildrenByCode('MaritalStatus', keyWords);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }))
            }}
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="spouseName"
            label="配偶名字"
            placeholder="请输入配偶名字"
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="marriageDate"
            label="结婚日期"
            placeholder="请选择结婚日期"
            readonly={isView}
          />
        </Col>
        <Col xl={7} lg={12} md={24}>
          <ProFormDigit
            width="sm"
            name="childrenNumber"
            label="子女人数"
            placeholder="请输入子女人数"
            readonly={isView}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          {/* <ProFormText
            width="sm"
            name="marriageCertificate"
            label="结婚证件"
            placeholder="请上传结婚证件"
          /> */}
          <ProFormUploadDragger
            label="结婚证件"
            name="marriageCertificateFile"
            max={1}
            fieldProps={{
              listType: "picture",
              fileList: marriageFile,
              customRequest: async (data) => {
                console.log(data)
                const fileData = new FormData();
                fileData.append('files', data.file)
                // delete options.headers['Content-Type'];
                const res = await upload(fileData);
                console.log(res)
              }
            }}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default FormBody;
