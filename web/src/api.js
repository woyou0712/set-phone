import request from "./request";

export function getSize() {
  return request.get("/size");
}

export function getPath() {
  return request.get("/screencap");
}

export function clickPhone(params) {
  return request.post("/click", params);
}

export function setKeyword(params) {
  return request.post("/keyword", params);
}

export function setSwipe(params) {
  return request.post("/swipe", params);
}

export function setUnlock() {
  return request.post("/unlock");
}

export function setText() {
  return request.post("/settext");
}
