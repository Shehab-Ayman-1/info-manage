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
      baseURL: "http://cars-management-server.netlify.app",
      ...options,
   },
};
