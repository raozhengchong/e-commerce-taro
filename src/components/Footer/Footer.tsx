import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import style from './footer.module.scss';

const mergeJson = {
  '/': '1',
  '/catalog/categorylist': '2'
}

const routeMap: Record<string, string> = {
  '1': '/pages/index/index',
  '2': '/pages/catalog/categorylist/index',
  '3': '/pages/RegisterPage/index'
}

const Footer: React.FC = () => {
  // console.log('window.location.pathname:::', window.location.pathname)
  // console.log('mergeJson[location.pathname]:::', mergeJson[window.location.pathname])
  const [selectedKey, setSelectedKey] = useState('1');

  useEffect(() => {
    // set initial selected key based on current pathname (guard for SSR)
    if (typeof window !== 'undefined') {
      const key = mergeJson[window.location.pathname];
      if (key) setSelectedKey(key);
    }
  }, []);


  const handleItemClick = async (key: string) => {
    setSelectedKey(key);
    const url = routeMap[key];
    if (!url) return;

    try {
      if (key === '1') {
        console.log(1)
        // go to home as a full re-launch (replace stack)
        await Taro.reLaunch({ url });
        return;
      }

      console.log(2)
      // normal navigation for other pages
      await Taro.navigateTo({ url });
      return;
    } catch (err) {
      // fallback for environments where Taro navigation isn't available
      if (typeof window !== 'undefined') {
        // convert Taro page path to a web path if possible
        const webPath = url.replace(/^\/pages/, '');
        window.location.href = webPath || '/';
      }
    }
  };

  return (
    <div
      className={style["footer"]}
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
        className={`${style['footer-item']} ${selectedKey === '1' ? style.selected : ''}`}
        style={{ textAlign: 'center' }} // 添加居中对齐
      >
        {/* 替换为与图片一致的图标 */}
        <HomeOutlined style={{ fontSize: 20, color: selectedKey === '1' ? 'red' : '#000' }} />
        <span style={{ color: selectedKey === '1' ? 'red' : '#000', display: 'block' }}>Home</span> {/* 调整为上下布局 */}
      </div>
      <div
        onClick={() => handleItemClick('2')}
        className={`${style['footer-item']} ${selectedKey === '2' ? style.selected : ''}`}
        style={{ textAlign: 'center' }} // 添加居中对齐
      >
        {/* 替换为与图片一致的图标 */}
        <AppstoreOutlined style={{ fontSize: 20, color: selectedKey === '2' ? 'red' : '#000' }} /> {/* 更新图标颜色 */}
        <span style={{ color: selectedKey === '2' ? 'red' : '#000', display: 'block' }}>Category</span> {/* 调整为上下布局 */}
      </div>
      <div
        onClick={() => handleItemClick('3')}
        className={`${style['footer-item']} ${selectedKey === '3' ? style.selected : ''}`}
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
