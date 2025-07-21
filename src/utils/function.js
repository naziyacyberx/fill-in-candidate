// Convert File object to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Convert image URL to base64
export const convertFileUrlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return await fileToBase64(blob);
};
