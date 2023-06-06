import http from "../http";

export const apiUser = {
  getUser() {
    return http.get("").then((res) => res.data);
  },
};
