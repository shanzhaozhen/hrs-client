import type React from "react";
import type {DataNode} from "rc-tree/lib/interface";

export const getTreeValue = (value: any, treeData?: DataNode[]): React.ReactNode => {
  let result = value;
  if (treeData && treeData.length) {
    for (let i = 0; i < treeData.length; i+=1) {
      // @ts-ignore
      if (treeData[i].value === value) return treeData[i].title;
      if (treeData[i].children) {
        result = getTreeValue(value, treeData[i].children)
        if (result !== value) return result;
      }
    }
  }
  return result
}

