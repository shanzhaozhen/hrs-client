import {useEffect, useState} from "react";
import {getDictionaryChildrenByCode} from "@/services/dictionary/dictionary";

export const useOptions = (type: string) => {
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    getDictionaryChildrenByCode(type).then(({data}) => {
      setOptions(data ? data.map(item => ({
        value: item.name,
        label: item.name
      })) : [])
    });
  }, []);
  return options;
}
