import request from "./request";

export function getSize() {
  return request.get("/size");
}

export function getPath() {
  return request.get("/screencap");
}

export function clickPhone(params) {
  return request.post("/clicl", params);
}
