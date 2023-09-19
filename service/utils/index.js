const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function deleteOldImage(name) {
  const names = fs.readdirSync("./static/");
  names.forEach((_name) => {
    if (_name === name) return;
    fs.unlinkSync(path.join(process.cwd(), `/static/${_name}`));
  });
}
/**
 * 截图
 * @returns {Promise<string>}
 */
function Screencap() {
  return new Promise((resolve, reject) => {
    const now = Date.now();
    exec(
      `adb exec-out screencap -p > ./static/${now}.png`,
      (err, stdout, stderr) => {
        if (err) {
          return reject(err || stderr);
        }
        const name = `${now}.png`;
        try {
          deleteOldImage(name);
          resolve(`/static/${name}`);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

/**
 * 操作手机
 * @param {string} adb
 * @returns {Promise<string>}
 */
function TotalControl(adb) {
  return new Promise((resolve, reject) => {
    exec(adb, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr);
      }
      Screencap()
        .then((url) => resolve(url))
        .catch((e) => reject(e));
    });
  });
}

module.exports = { Screencap, TotalControl };
