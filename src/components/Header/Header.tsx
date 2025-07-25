import React from 'react';
import { Menu, Avatar, Input } from 'antd';
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Navigator } from '@tarojs/components';
import style from './index.module.scss';

const Header: React.FC = () => {
  return (
    <div className={style["header"]}>
      {/* 新增汉堡菜单图标 */}
      <MenuUnfoldOutlined style={{ fontSize: 24, cursor: 'pointer' }} />

      {/* Logo 居中显示 */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <Navigator url="/">
          <img src="https://placehold.co/64x20?text=FECMALL" alt="FECMALL Logo" />
        </Navigator>
      </div>

      {/* 用户头像、搜索框和购物车图标 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserOutlined size={32} style={{ marginRight: 16 }} />
        <SearchOutlined style={{ fontSize: 24, marginRight: 16, cursor: 'pointer' }} />
        <ShoppingCartOutlined style={{ fontSize: 24, position: 'relative' }}>
          <span style={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '0 4px', fontSize: '12px' }}>0</span>
        </ShoppingCartOutlined>
      </div>
    </div>
  );
};

export default Header;
