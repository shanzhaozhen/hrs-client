import type { SortOrder } from "antd/lib/table/interface";
import type { Orders } from "@/services/common/typings";

export const copyObject = (A: any, B: any) => {
  const res = {};

  Object.keys(A).forEach((key) => {
    res[key] = B[key];
  });

  return res;
};

export const getSortOrder = (sorter: Record<string, SortOrder>): Orders | undefined | null => {
  if (sorter) {
    const orders: Orders = {
      asc: [],
      desc: []
    };
    Object.keys(sorter).forEach(item => {
      if (sorter[item] === 'ascend') {
        orders.asc.push(item);
      } else {
        orders.desc.push(item);
      }
    })

    return orders;
  }

  return null;
}
