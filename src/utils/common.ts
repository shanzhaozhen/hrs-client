export const copyObject = (A: any, B: any) => {
  const res = {};

  Object.keys(A).forEach((key) => {
    res[key] = B[key];
  });

  return res;
};
