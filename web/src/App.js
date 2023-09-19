import React, { useEffect, useMemo, useState } from "react";
import { clickPhone, getPath, getSize } from "./api";
import "./App.css";

const viewSize = { x: 390, y: 844 };

function App() {
  const [path, _setPath] = useState("");
  const [size, setSize] = useState([]);
  const ratio = useMemo(() => {
    if (!size?.length) return { x: 1, y: 1 };
    return { x: size[0] / viewSize.x, y: size[1] / viewSize.y };
  }, [size]);

  const setPath = (url) => {
    _setPath("http://127.0.0.1:16888" + url);
  };

  useEffect(() => {
    getSize().then(({ data }) => {
      setSize(data);
    });
    getPath().then(({ data }) => setPath(data));
  }, []);

  return (
    <section className="app">
      <div
        className="phone-view"
        style={{ width: `${viewSize.x}px`, height: `${viewSize.y}px` }}
      >
        <img
          src={path}
          alt=""
          onClick={(e) => {
            const { offsetX, offsetY } = e.nativeEvent;
            const x = parseInt(offsetX * ratio.x);
            const y = parseInt(offsetY * ratio.y);
            clickPhone({ x, y }).then(({ data }) => setPath(data));
          }}
          onMouseDown={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div className="button-list">
        <div className="btn-text">电源键</div>
        <div className="btn-text">刷新页面</div>
        <div className="btn-text">Home键</div>
      </div>
    </section>
  );
}

export default App;
