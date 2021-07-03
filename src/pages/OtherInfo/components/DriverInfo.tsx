import React from 'react';
import {Col, Row} from "antd";
import {ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {useOptions} from "@/utils/options";

interface DriverInfoProps {
  isView?: boolean;
}

const DriverInfo: React.FC<DriverInfoProps> = (props) => {
  const { isView } = props;

  const driverLicenseTypeOptions = useOptions('DriverLicenseType');

  return (
    <>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="sm"
            name="driverLicenseType"
            label="驾驶证类型"
            rules={[{ required: false, message: '请选择驾驶证类型' }]}
            options={driverLicenseTypeOptions}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDatePicker
            width="sm"
            name="driverLicenseDate"
            label="驾驶证领证时间"
            rules={[{ required: false, message: '请输入驾驶证领证时间' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="sm"
            name="driveYear"
            label="驾龄"
            rules={[{ required: false, message: '请输入驾龄' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="driveLines"
            label="熟悉的驾驶路线"
            rules={[{ required: false, message: '请输入熟悉的驾驶路线' }]}
            readonly={isView}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormText
            width="sm"
            name="vehicleType"
            label="驾驶车种"
            rules={[{ required: false, message: '请输入驾驶车种' }]}
            readonly={isView}
          />
        </Col>
      </Row>
    </>
  );
};

export default DriverInfo;
