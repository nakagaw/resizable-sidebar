import { useState, useEffect, createRef } from "react";
import clsx from 'clsx';
import './App.scss'
import Header from './components/Header'
import Content from './components/Content'
import Sidebar from './components/Sidebar'

export default function App() {
  const [foldingState, setfoldingState] = useState(true);
  const foldingStateStyle = foldingState ? 'side-expanded' : 'side-collapse';
  const _SIDEBAR_WIDTH = localStorage.getItem('sidebarWidth')
  let SIDEBAR_WIDTH = 300
  if(_SIDEBAR_WIDTH) {
    SIDEBAR_WIDTH = parseInt(_SIDEBAR_WIDTH, 10)
  }
  const [sideBarWidth, setSideBarWidth] = useState<undefined | number>(SIDEBAR_WIDTH);
  const [wrapperWidth, setWrapperWidth] = useState<undefined | number>(undefined);
  const wrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (wrapperRef.current) {
      if (!wrapperWidth) {
        setWrapperWidth(wrapperRef.current?.clientWidth);
        return;
      }
    }
  }, [wrapperRef, wrapperWidth, setWrapperWidth]);

  return (
    <div className="App">
      <Header />
      <div 
        ref={wrapperRef}
        className={clsx("wrapper", foldingStateStyle)}
      >
        <Sidebar
          setfoldingState={setfoldingState}
          foldingState={foldingState}
          sideBarWidth={sideBarWidth}
          setSideBarWidth={setSideBarWidth}
          wrapperWidth={wrapperWidth}
        />
        <Content />
      </div>
    </div>
  )
}