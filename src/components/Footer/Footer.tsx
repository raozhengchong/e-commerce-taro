import React, { useState } from 'react';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss';

const Footer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const handleItemClick = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <div
      className="footer"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#f8f8f8',
        padding: '10px 0',
        position: 'fixed', // 添加固定定位
        bottom: 0, // 固定在底部
        left: 0,
        right: 0,
        zIndex: 100, // 确保在其他内容之上
      }}
    >
      <div
        onClick={() => handleItemClick('1')}
        className={`footer-item ${selectedKey === '1' ? 'selected' : ''}`}
        style={{ textAlign: 'center' }} // 添加居中对齐
      >
        {/* 替换为与图片一致的图标 */}
        <HomeOutlined style={{ fontSize: 20, color: selectedKey === '1' ? 'red' : '#000' }} />
        <span style={{ color: selectedKey === '1' ? 'red' : '#000', display: 'block' }}>Home</span> {/* 调整为上下布局 */}
      </div>
      <div
        onClick={() => handleItemClick('2')}
        className={`footer-item ${selectedKey === '2' ? 'selected' : ''}`}
        style={{ textAlign: 'center' }} // 添加居中对齐
      >
        {/* 替换为与图片一致的图标 */}
        <AppstoreOutlined style={{ fontSize: 20, color: selectedKey === '2' ? 'red' : '#000' }} /> {/* 更新图标颜色 */}
        <span style={{ color: selectedKey === '2' ? 'red' : '#000', display: 'block' }}>Category</span> {/* 调整为上下布局 */}
      </div>
      <div
        onClick={() => handleItemClick('3')}
        className={`footer-item ${selectedKey === '3' ? 'selected' : ''}`}
        style={{ textAlign: 'center' }} // 添加居中对齐
      >
        {/* 替换为与图片一致的图标 */}
        <UserOutlined style={{ fontSize: 20, color: selectedKey === '3' ? 'red' : '#000' }} /> {/* 更新图标颜色 */}
        <span style={{ color: selectedKey === '3' ? 'red' : '#000', display: 'block' }}>Account</span> {/* 调整为上下布局 */}
      </div>
    </div>
  );
};

export default Footer;
