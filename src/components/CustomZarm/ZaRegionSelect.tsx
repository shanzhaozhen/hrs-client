import type {ReactNode} from 'react';
import React, { useEffect, useState} from 'react';
import type { RegionType } from "@/services/region/typings";
import {useRegionOptions} from "@/utils/region";
import ZaSelect from "@/components/CustomZarm/ZaSelect";
import {Cell, Input} from 'zarm';
import type {DataSource} from "zarm/types/picker-view/PropsType";
import {requiredTitle} from "@/utils/zarm";


interface ZaRegionSelectProps {
  title?: ReactNode;
  required?: boolean;
  help?: ReactNode;
  level: number;
  haveDetail?: boolean;
  valueMember?: string;
  value?: RegionType,
  onChange?: (value: any) => void;
}

const ZaRegionSelect: React.FC<ZaRegionSelectProps> = (props) => {
  const { title, required, help, level, haveDetail, valueMember, value, onChange } = props;

  const regionOptions = useRegionOptions(level);

  const [ selectValue, setSelectValue ] = useState<(string | number)[]>();

  useEffect(() => {
    if (value) {
      if (value.province && value.city && value.area) {
        setSelectValue([value.province, value.city, value.area]);
      }
    }
  }, []);

  const onRegionChange = (changeValue: any) => {
    onChange?.({
      ...value,
      province: level > 0 ? changeValue[0] : undefined,
      city: level > 1 ? changeValue[1] : undefined,
      area: level > 2 ? changeValue[2] : undefined,
    });
  };

  const onDetailChange = (changeValue: any) => {
    onChange?.({
      ...value,
      detail: changeValue,
    });
  };

  return (
    <>
      <Cell title={required ? requiredTitle(title) : title} help={haveDetail ? null : help}>
        <ZaSelect
          defaultValue={selectValue}
          valueMember={valueMember}
          dataSource={regionOptions as DataSource}
          multi={level > 1}
          onChange={onRegionChange}
        />
      </Cell>
      {
        haveDetail ? (
          <Cell title=" " help={help}>
            <Input
              defaultValue={value?.detail}
              placeholder="请输入详细地址"
              onChange={onDetailChange}
            />
          </Cell>
        ) : null
      }
    </>
  );
};

export default ZaRegionSelect;
