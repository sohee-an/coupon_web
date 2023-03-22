const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://54.180.2.132/"
    : "http://localhost:8070/";

export { backUrl };
