import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm from '@ant-design/pro-form';
import type { FormInstance } from 'antd';
import { Button, Card, message } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';
import SalarySettingModal from '@/pages/Salary/SalarySetting/components/SalarySettingModal';
import type { SalarySettingForm, SalarySettingVO } from '@/services/salary-setting/typings';
import { addSalarySetting, getSalarySettingNew } from '@/services/salary-setting/salary-setting';
import { DescriptionsSkeleton } from '@ant-design/pro-skeleton';
import FormBody from '@/pages/Salary/SalarySetting/components/FormBody';

const SalarySetting: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [viewState, setViewState] = useState<boolean>(true);
  const [salarySettingListModalVisible, handleSalarySettingListModalVisible] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState<SalarySettingVO | SalarySettingForm>({});

  const formRef = useRef<FormInstance>();

  const updateFormValues = async () => {
    setLoading(true);
    const { data } = await getSalarySettingNew();
    setFormValues(data || {});
    formRef.current?.setFieldsValue({ ...formValues });
    setLoading(false);
  };

  useEffect(() => {
    updateFormValues().then();
  }, []);

  /**
   * 更新薪资配置
   * @param fields
   */
  const handleSubmit = async (fields: SalarySettingForm) => {
    const hide = message.loading('正在更新');
    try {
      await addSalarySetting(fields);
      await updateFormValues();
      hide();
      message.success('更新成功');
      setViewState(true);
    } catch (error) {
      hide();
      message.error('更新失败请重试！');
    }
  };

  return (
    <PageContainer>
      <Card
        title={
          <>
            <span style={{ marginRight: 15 }}>薪资配置</span>
            {viewState ? (
              <div style={{ float: 'right' }}>
                <Button
                  style={{ marginRight: 20 }}
                  type="primary"
                  icon={<HistoryOutlined />}
                  onClick={() => {
                    handleSalarySettingListModalVisible(true);
                  }}
                >
                  修改记录
                </Button>
                <Button
                  style={{ float: 'right' }}
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setViewState(false);
                  }}
                >
                  编辑
                </Button>
              </div>
            ) : (
              <div style={{ float: 'right' }}>
                <Button
                  style={{ marginRight: 20 }}
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    formRef.current?.submit();
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
            )}
          </>
        }
        bordered={false}
      >
        {loading ? (
          <div
            style={{
              background: '#fafafa',
              padding: 24,
            }}
          >
            <DescriptionsSkeleton active />
          </div>
        ) : (
          <ProForm
            formRef={formRef}
            initialValues={formValues}
            onFinish={handleSubmit}
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
            <FormBody viewState={viewState} />
          </ProForm>
        )}
      </Card>

      <SalarySettingModal
        salarySettingListModalVisible={salarySettingListModalVisible}
        handleSalarySettingListModalVisible={handleSalarySettingListModalVisible}
      />
    </PageContainer>
  );
};

export default SalarySetting;
