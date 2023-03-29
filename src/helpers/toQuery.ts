import toFormData from "./toFormData";

const toQuery = (element: Record<string, any>) => {
  const formData = toFormData(element);
  const queryParams: Record<string, string> = {};
  formData.forEach((value, key) => {
    const isFile = value instanceof File;
    if (isFile) return;
    queryParams[key] = value;
  });

  return queryParams;
};

export default toQuery;
