import React, {useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {ProFormDatePicker, ProFormDigit, ProFormText} from '@ant-design/pro-form';
import {Button, Card, Col, Row} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";

const SalaryStaffList: React.FC = () => {

  const [ viewState, setViewState ] = useState<boolean>(true);

  return (
    <PageContainer>
      <Card
        title={
          <>
            <span style={{ marginRight: 15 }}>薪资配置</span>
            { viewState ? (
              <Button
                style={{ float: "right" }}
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setViewState(false);
                }}
              >
                编辑
              </Button>
            ) : (
              <div style={{ float: "right" }}>
                <Button
                  style={{ marginRight: 20 }}
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    setViewState(false);
                  }}
                >
                  保存
                </Button>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setViewState(true);
                  }}
                >
                  取消
                </Button>
              </div>
            ) }
          </>
        }
        bordered={false}
      >
        <ProForm
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <Row gutter={24}>
            <ProFormText name="id" label="调动记录id" hidden={true} />
            <Col xl={8} lg={12} md={24}>
              <ProFormDatePicker
                width="md"
                name="effectiveDate"
                label="生效日期"
                rules={[{ required: true, message: '请选择生效日期' }]}
                readonly={viewState}
              />
            </Col>
            <Col xl={8} lg={12} md={24}>
              <ProFormDigit
                width="md"
                name="preBasicSalary"
                label="变更前基础工资"
                readonly={viewState}
              />
            </Col>
          </Row>
        </ProForm>
      </Card>


    </PageContainer>
  );
};

export default SalaryStaffList;
