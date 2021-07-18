import React, {useEffect, useRef, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
import type { FormInstance} from "antd";
import {Button, Card, Col, message, Row} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, HistoryOutlined} from "@ant-design/icons";
import SalarySettingModal from "@/pages/Salary/SalarySetting/components/SalarySettingModal";
import type { SalarySettingForm, SalarySettingVO } from "@/services/salary-setting/typings";
import {addSalarySetting, getSalarySettingNew} from "@/services/salary-setting/salary-setting";

const SalarySetting: React.FC = () => {

  const [ viewState, setViewState ] = useState<boolean>(true);
  const [ salarySettingListModalVisible, handleSalarySettingListModalVisible ] = useState<boolean>(false);
  const [ formValues, setFormValues ] = useState<SalarySettingVO | SalarySettingForm>({});

  const updateFormValues = async () => {
    let { data } = await getSalarySettingNew();
    if (data) {
      data = {
        ...data,
        // @ts-ignore
        highTemperatureMonth: [data.highTemperatureStartDate, data.highTemperatureEndDate]
      }
    }
    setFormValues(data || {})
  }

  useEffect(() => {
    updateFormValues().then();
  }, [])

  const formRef = useRef<FormInstance>();

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
            { viewState ? (
                <div style={{ float: "right" }}>
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
                    style={{ float: "right" }}
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
              <div style={{ float: "right" }}>
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
            ) }
          </>
        }
        bordered={false}
      >
        {formValues && Object.keys(formValues).length ? (
          <ProForm
            formRef={formRef}
            initialValues={formValues}
            onValuesChange={(changedValues: any, allValues: any) => {
              if (changedValues.hasOwnProperty('highTemperatureMonth')) {
                const { highTemperatureMonth } = changedValues;
                formRef.current?.setFieldsValue({
                  ...allValues,
                  highTemperatureStartDate: highTemperatureMonth[0],
                  highTemperatureEndDate: highTemperatureMonth[1],
                });
              }
            }}
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
            <Row gutter={24}>
              <ProFormText name="id" label="调动记录id" hidden={true} />
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="overTimeBase"
                  label="加班费基数"
                  rules={[{ required: true, message: '请输入加班费基数' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="fullAttendanceAllowance"
                  label="全勤津贴标准（元/月）"
                  rules={[{ required: true, message: '请输入全勤津贴标准（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="mealAllowance"
                  label="就餐补贴（元/月）"
                  rules={[{ required: true, message: '请输入就餐补贴（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceOwnA"
                  label="交通补贴（自行到达）A（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（自行到达）A（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceOwnB"
                  label="交通补贴（自行到达）B（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（自行到达）B（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceOwnC"
                  label="交通补贴（自行到达）C（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（自行到达）C（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceBusA"
                  label="交通补贴（乘坐接驳车）A（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）A（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceBusB"
                  label="交通补贴（乘坐接驳车）B（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）B（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="trafficAllowanceBusC"
                  label="交通补贴（乘坐接驳车）C（元/月）"
                  rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）C（元/月）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="safetyAllowanceA"
                  label="安全岗岗位津贴A"
                  rules={[{ required: true, message: '请输入安全岗岗位津贴A' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="safetyAllowanceB"
                  label="安全岗岗位津贴B"
                  rules={[{ required: true, message: '请输入安全岗岗位津贴B' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="safetyAllowanceC"
                  label="安全岗岗位津贴C"
                  rules={[{ required: true, message: '请输入安全岗岗位津贴C' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="oneChildAllowance"
                  label="独生子女津贴标准（元/天）"
                  rules={[{ required: true, message: '请输入独生子女津贴标准（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              { !viewState && (
                <Col xl={8} lg={12} md={24}>
                  <ProFormDateRangePicker
                    width="md"
                    name="highTemperatureMonth"
                    label="高温津贴开始生效起止月份"
                    fieldProps={{
                      picker: 'month',
                      format: 'YYYY-MM',
                    }}
                    rules={[{ required: true, message: '请选择高温津贴开始生效起止月份' }]}
                    readonly={viewState}
                  />
                </Col>
              ) }
              <Col xl={8} lg={12} md={24}>
                <ProFormDatePicker.Month
                  width="md"
                  name="highTemperatureStartDate"
                  label="高温津贴开始生效月份"
                  rules={[{ required: true, message: '请选择高温津贴开始生效月份' }]}
                  readonly={viewState}
                  hidden={!viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDatePicker.Month
                  width="md"
                  name="highTemperatureEndDate"
                  label="高温津贴结束生效月份"
                  rules={[{ required: true, message: '请选择高温津贴结束生效月份' }]}
                  readonly={viewState}
                  hidden={!viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="highTemperatureAllowanceA"
                  label="高温津贴A标准"
                  rules={[{ required: true, message: '请输入高温津贴A标准' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="highTemperatureAllowanceB"
                  label="高温津贴B标准"
                  rules={[{ required: true, message: '请输入高温津贴B标准' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="highTemperatureAllowanceC"
                  label="高温津贴C标准"
                  rules={[{ required: true, message: '请输入高温津贴C标准' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyWeekFee"
                  label="值班费（工作日）（元/天）"
                  rules={[{ required: true, message: '请输入值班费（工作日）（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyBeforeWeekFee"
                  label="值班费（休息日前一天）（元/天）"
                  rules={[{ required: true, message: '请输入值班费（休息日前一天）（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyBeforeFestivalFee"
                  label="值班费（法定节假日前一天）（元/天）"
                  rules={[{ required: true, message: '请输入值班费（法定节假日前一天）（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyWeekendFee"
                  label="值班费（休息日）（元/天）"
                  rules={[{ required: true, message: '请输入值班费（休息日）（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyFestivalFee"
                  label="值班费（法定节假日（春节假期除外））（元/天）"
                  rules={[{ required: true, message: '请输入值班费（法定节假日（春节假期除外））（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyOutSpringFee"
                  label="值班费（春节假期（不含除夕、初一、初二））（元/天）"
                  rules={[{ required: true, message: '请输入值班费（春节假期（不含除夕、初一、初二））（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="dutyInSpringFee"
                  label="值班费（春节假期（除夕、初一、初二））（元/天）"
                  rules={[{ required: true, message: '请输入值班费（春节假期（除夕、初一、初二））（元/天）' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={8} lg={12} md={24}>
                <ProFormDigit
                  width="md"
                  name="unionFees"
                  label="工会费"
                  rules={[{ required: true, message: '请输入工会费' }]}
                  readonly={viewState}
                />
              </Col>
              <Col xl={24} lg={24} md={24}>
                <ProFormTextArea
                  name="remarks"
                  label="备注"
                  readonly={viewState}
                />
              </Col>
            </Row>
          </ProForm>
        ) : null}
      </Card>

      <SalarySettingModal
        salarySettingListModalVisible={salarySettingListModalVisible}
        handleSalarySettingListModalVisible={handleSalarySettingListModalVisible}
      />
    </PageContainer>
  );
};

export default SalarySetting;
