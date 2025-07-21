// src/entry-server.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app'; // 引入你的主组件

export default function render() {
  return renderToString(<App />);
}