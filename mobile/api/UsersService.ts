import ApiBase from "./ApiBase";

export const loginUser = (data:any) => {
  return ApiBase.post("/login", data);
};

export const signupUser = (data:any) => {
  return ApiBase.post("/signup", data);
};