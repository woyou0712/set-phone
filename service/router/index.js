const express = require("express");
const { error, success } = require("../utils/send");
const { TotalControl, Screencap, unlock } = require("../utils");
const { exec } = require("child_process");

const router = express.Router();

// 电源解锁
router.post("/unlock", (req, res, next) => {
  unlock()
    .then((url) => {
      res.send(success(url));
    })
    .catch((e) => next(error(e)));
});

// 按键
router.post("/keyword", (req, res, next) => {
  const { key } = req.body;

  if (!key) {
    return next(error("缺少Key"));
  }
  TotalControl(`adb shell input keyevent ${key}`)
    .then((url) => {
      res.send(success(url));
    })
    .catch((e) => next(error(e)));
});

// 输入
router.post("/settext", (req, res, next) => {
  const { text } = req.body;
  TotalControl(`adb shell input text '${text}'`)
    .then((url) => {
      res.send(success(url));
    })
    .catch((e) => next(error(e)));
});

// 滑动
router.post("/swipe", (req, res, next) => {
  const { startX, startY, endX, endY } = req.body;
  if (
    (!startX && startX !== 0) ||
    (!startY && startY !== 0) ||
    (!endX && endX !== 0) ||
    (!endY && endY !== 0)
  ) {
    return next(error("缺少参数"));
  }
  TotalControl(`adb input swipe ${startX} ${startY} ${endX} ${endY}`)
    .then((url) => {
      res.send(success(url));
    })
    .catch((e) => next(error(e)));
});

// 点击
router.post("/click", (req, res, next) => {
  const { x, y } = req.body;
  if ((!x && x !== 0) || (!y && y !== 0)) {
    return next(error("缺少参数"));
  }
  TotalControl(`adb shell input tap ${x} ${y}`)
    .then((url) => {
      res.send(success(url));
    })
    .catch((e) => next(error(e)));
});

// 截图
router.get("/screencap", (req, res, next) => {
  Screencap()
    .then((url) => res.send(success(url)))
    .catch((e) => next(error(e)));
});

// 获取屏幕分辨率
router.get("/size", (req, res, next) => {
  exec("adb shell wm size", (err, str, stderr) => {
    if (err || stderr) {
      return next(error(err || stderr));
    }
    const data = str.match(/\d{3,4}x\d{3,4}/)[0];
    res.send(success(data?.split("x")));
  });
});

module.exports = router;
