import React from 'react';
import { View } from '@tarojs/components';
import style from './index.module.scss';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import { Row, Col } from 'antd';
import { http } from '../../../../services/http.service';

export const getServerSideProps = async (context: any) => {
  const id = context?.params?.id || '';

  // demo fallback products
  const demoProducts = [
    { id: 1001, name: 'Demo Dress 1', price: '$22.00', image: 'https://placehold.co/150x200?text=PD1' },
    { id: 1002, name: 'Demo Dress 2', price: '$33.00', image: 'https://placehold.co/150x200?text=PD2' },
    { id: 1003, name: 'Demo Dress 3', price: '$44.00', image: 'https://placehold.co/150x200?text=PD3' },
    { id: 1004, name: 'Demo Dress 4', price: '$22.00', image: 'https://placehold.co/150x200?text=PD4' },
    { id: 1005, name: 'Demo Dress 5', price: '$55.00', image: 'https://placehold.co/150x200?text=PD5' }
  ];

  try {
    // try to fetch products by category via API
    const [err, data] = await http('GET', '/products', { category: id });
    if (err) {
      return { props: { products: demoProducts, categoryId: id } };
    }

    const products = Array.isArray(data) && data.length ? data : demoProducts;
    return { props: { products, categoryId: id } };
  } catch (e) {
    console.error('Fetch products error:', e);
    return { props: { products: demoProducts, categoryId: id } };
  }
};

const CategoryDetailPage: React.FC<{ products: any[], categoryId: string }> = ({ products = [], categoryId = '' }) => {
  return (
    <View className={style.container}>
      <Header />
      <div className={style['page-content']}>
        <h2 className={style.title}>Category {categoryId} Products</h2>
        <div className={style['products-grid']}>
          <Row gutter={16}>
            {products.map((p: any) => (
              <Col key={p.id} xs={12} sm={8} md={6} lg={4}>
                <div className={style['product-item']}>
                  <img src={p.image || (p.images && p.images[0] && p.images[0].src) || 'https://placehold.co/150x200?text=No'} alt={p.name} />
                  <div className={style['product-info']}>
                    <div className={style['product-name']}>{p.name}</div>
                    <div className={style['product-price']}>{p.price || `$${p.regular_price || ''}`}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </View>
  );
};

export default CategoryDetailPage;

