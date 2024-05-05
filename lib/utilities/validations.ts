export const isValidURL = (string?: string) => {
  if (!string) return false;
  const res = string.match(
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i
  );
  return res !== null;
};

export const isValidURI = (string: string) => {
  const res = string.match(/^\/[a-zA-Z0-9-]+$/);
  return res !== null;
};

export const isValidImageDomain = (string: string) => {
  const domains = [
    "firebasestorage.googleapis.com",
    "freepik.com",
    "flaticon",
    "flaticon.com",
    "unsplash.com",
  ];
  const res = domains.find((domain) => string.includes(domain));
  return res !== null;
};
