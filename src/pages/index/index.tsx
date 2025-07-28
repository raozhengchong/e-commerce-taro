import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import style from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { http } from '../../services/http.service';

interface ICommonOption {
  [key: string]: any;
}

interface CategoriesProps {
  categories: ICommonOption[];
}

const Categories: React.FC<CategoriesProps> = ({ categories = [] }) => {
  console.log('category:::', categories)

  return (
    <div className={style.categories}>
      <div className={style['category-grid']}>
        {categories.map((category, index) => (
          <div key={index} className={style['category-item']}>
            <img src={category?.image?.src} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const YouMayAlsoLike: React.FC = () => {
  const products = [
    {
      image: 'https://placehold.co/150x200?text=Tiger+T-Shirt',
      price: '$22.00',
    },
    {
      image: 'https://placehold.co/150x200?text=Butterfly+Dress',
      price: '$22.00',
    },
    {
      image: 'https://placehold.co/150x200?text=Floral+Dress',
      price: '$33.00',
    },
    {
      image: 'https://placehold.co/150x200?text=Polka+Dot+Dress',
      price: '$33.00',
    },
    {
      image: 'https://placehold.co/150x200?text=Zigzag+Dress',
      price: '$33.00',
    },
    {
      image: 'https://placehold.co/150x200?text=Striped+Dress',
      price: '$33.00',
    },
  ];

  return (
    <div className={style['you-may-also-like']}>
      <h2>You May Also Like</h2>
      <Row gutter={16}>
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>

            <div className={style['product-item']}>
              <img src={product.image} alt={`Product ${index + 1}`} />
              <div className={style['product-details']}>
                <p>{product.price}</p>
                <button className={style['add-to-cart-button']}>
                  <ShoppingCartOutlined /> Add to Cart
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const [err, data] = await http('GET', '/products/categories');
    console.log('data111',data)
    if (err) {
      return {
        props: {
          categories: [],
        },
      };
    }

    return {
      props: {
        categories: data.filter((item: any) => item.id !== 15),
      },
    };
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return {
      props: {
        categories: []
      },
    };
  }
};

// 修改 Categories 组件调用方式以适配 SSR
const IndexPage: React.FC<{ categories: ICommonOption[] }> = ({ categories }) => {
  return (
    <View className={style.container}>
      <Header />
      {/* Categories */}
      <Categories categories={categories} />
      {/* 中间内容 */}
      <div className={style['main-content']}>
        {/* Banner */}
        <div className={style.banner}>
          <img
            src="https://placehold.co/375x200?text=New+Fashion+in+Autumn"
            alt="Banner Image"
          />
          <div className={style.discount}>
            <h2>15% Discount</h2>
            <p>only for the New Autumn</p>
          </div>
        </div>
        {/* Coupons */}
        <div className={style.coupons}>
          <h3>Coupons Only For New Users</h3>
          <div className={style['coupon-offer']}>
            <span>GET 20% OFF</span>
            <button className={style['go-button']}>GO</button>
          </div>
        </div>
        {/* Vintage Shoes */}
        <div className={style['vintage-shoes']}>
          <div className={style['vintage-shoes-content']}>
            <div className={style['vintage-shoes-text']}>
              <h3>UP TO 60%OFF</h3>
              <h2>Vintage Shoes</h2>
              <button className={style['buy-now-button']}>buy now &gt;</button>
            </div>
            <img src="https://placehold.co/300x200?text=Vintage+Shoes" alt="Vintage Shoes" className={style['vintage-shoes-image']} />
          </div>
        </div>
        {/* You May Also Like */}
        <YouMayAlsoLike />
      </div>
      <Footer />
    </View>
  );
};

export default IndexPage;
