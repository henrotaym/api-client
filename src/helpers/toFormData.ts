const toFormData = (
  element: Record<string, any>,
  namespace = "",
  data = new FormData()
) => {
  Object.keys(element).forEach((key) => {
    const value = element[key];
    const isObjectOrArray = typeof value === "object" && value !== null;
    const isFile = value instanceof File;
    const currentNamespace = namespace ? `${namespace}[${key}]` : key;
    if (isObjectOrArray && !isFile) toFormData(value, currentNamespace, data);
    else data.append(currentNamespace, value);
  });
  return data;
};

export default toFormData;
