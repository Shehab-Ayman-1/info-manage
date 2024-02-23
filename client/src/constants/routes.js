const options = {
   headers: { "Content-Type": "application/json" },
   withCredentials: true,
};

export const routes = {
   locale: {
      baseURL: "http://localhost:5000/api",
      ...options,
   },
   remote: {
      baseURL: "https://info-manage-server-b93a3r10k-shehab-ayman.vercel.app/api",
      ...options,
   },
};
