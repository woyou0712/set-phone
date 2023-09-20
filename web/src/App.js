import React, { useEffect, useMemo, useState } from "react";
import {
  clickPhone,
  getPath,
  getSize,
  setKeyword,
  setSwipe,
  setUnlock,
} from "./api";
import "./App.css";
import getBaseUrl from "./getBaseUrl";
import Loading from "./Loading";

const viewSize = { x: 390, y: 800 };

function App() {
  const [loading, setLoading] = useState(false);
  const [path, _setPath] = useState("");
  const [size, setSize] = useState([]);
  const ratio = useMemo(() => {
    if (!size?.length) return { x: 1, y: 1 };
    return { x: size[0] / viewSize.x, y: size[1] / viewSize.y };
  }, [size]);

  const setPath = (url) => {
    _setPath(getBaseUrl() + url);
  };

  useEffect(() => {
    onPath();
    getSize().then(({ data }) => {
      setSize(data);
    });
  }, []);

  const onPath = () => {
    setLoading(true);
    getPath()
      .then(({ data }) => {
        setPath(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const onKeyword = (key) => {
    setLoading(true);
    setKeyword({ key })
      .then(({ data }) => {
        setPath(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const onSwipe = ({ startX, startY, endX, endY }) => {
    setSwipe({ startX, startY, endX, endY }).then(({ data }) => setPath(data));
  };

  const onUnlock = () => {
    setLoading(true);
    setUnlock()
      .then(({ data }) => {
        setPath(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <section className="app">
      {loading ? <Loading /> : null}
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
            setLoading(true);
            clickPhone({ x, y })
              .then(({ data }) => {
                setPath(data);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }}
        />
      </div>
      <div className="button-list">
        <div className="btn-text" onClick={() => onKeyword(3)}>
          Home键
        </div>
        <div className="btn-text" onClick={onUnlock}>
          电源解锁
        </div>
        <div className="btn-text" onClick={onPath}>
          刷新页面
        </div>
      </div>
    </section>
  );
}

export default App;
