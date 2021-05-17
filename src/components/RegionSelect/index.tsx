import React, {useEffect, useState} from 'react';
import {Cascader, Input} from 'antd';
import type { CascaderValueType } from "antd/es/cascader";
import type { RegionType } from "@/services/region/typings";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import {useRegionOptions} from "@/utils/region";


interface RegionSelectProps {
  size?: SizeType,
  level: number,
  haveDetail?: boolean,
  customValue?: RegionType,
  readonly?: boolean,
  onChange?: (value: any) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = (props) => {
  const { size, level, haveDetail, customValue, readonly, onChange } = props;

  const [currentValue, setCurrentValue] = useState<RegionType>({});
  const [selectValue, setSelectValue] = useState<CascaderValueType>([]);
  const [inputValue] = useState<string | number | undefined>(customValue?.detail);

  const regionOptions = useRegionOptions(level);

  useEffect(() => {
    if (customValue) {
      if (customValue.province && customValue.city && customValue.area) {
        setSelectValue([customValue.province, customValue.city, customValue.area]);
      }
    }
  }, []);

  const onRegionChange = (changeValue: CascaderValueType) => {
    setCurrentValue(data => ({
      ...data,
      province: level > 0 ? changeValue[0] : undefined,
      city: level > 1 ? changeValue[1] : undefined,
      area: level > 2 ? changeValue[2] : undefined,
    }));
    onChange?.(currentValue);
  };

  const onDetailChange = (e: any) => {
    setCurrentValue(data => ({
      ...data,
      detail: e.target.value,
    }));
    onChange?.(currentValue);
  };

  const renderBody = () => {
    if (readonly) {
      let readValue: any = selectValue.join('');
      if (haveDetail) {
        readValue = inputValue
      }
      return (
        <div>{readValue}</div>
      )
    }
    if (haveDetail) {
      return (
        <Input.Group compact>
          <Cascader style={{ width: '45%' }} size={size} options={regionOptions} defaultValue={selectValue} onChange={onRegionChange} />
          <Input style={{ width: '55%' }} placeholder="请输入详细地址" onChange={onDetailChange} defaultValue={inputValue} />
        </Input.Group>
      )
    }
    return (
      <Cascader size={size} options={regionOptions} defaultValue={selectValue} onChange={onRegionChange} />
    )
  }

  return (
    <>
      {renderBody()}
    </>
  );
};

export default RegionSelect;
