const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://3.37.214.160/"
    : "http://localhost:8070/";

export { backUrl };
