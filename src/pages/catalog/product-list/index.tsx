import React, { useMemo, useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import style from './index.module.scss';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined, FilterOutlined } from '@ant-design/icons';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const openDetail = async () => {
    const url = `/pages/product/detail/index?id=${product.id}`;
    try {
      await Taro.navigateTo({ url });
    } catch (err) {
      if (typeof window !== 'undefined') {
        const qs = `?id=${product.id}`;
        window.location.href = `/product/detail${qs}`;
      }
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: call cart service
    Taro.showToast({ title: 'Added', icon: 'success' } as any);
  };

  const priceHasOld = !!product.oldPrice;

  console.log('product:::', product)

  return (
    <div className={style['product-card']} onClick={openDetail}>
      <div className={style['product-image-wrapper']}>
        <img src={product.image} alt={product.title} />
        <div className={style['cart-overlay']} onClick={addToCart}>
          <ShoppingCartOutlined />
        </div>
      </div>

      <div className={style['product-info']}>
        <div className={style['product-title']}>{product.title}</div>
        <div className={`${style['product-price']} ${priceHasOld ? style['has-old'] : ''}`}>
          <span className={style['price']}>${product?.price}</span>
          {/*{product?.oldPrice && <span className={style['old-price']}>${product?.oldPrice}</span>}*/}
        </div>
      </div>
    </div>
  );
};

const ProductListPage: React.FC = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Try Taro router params first
    try {
      const inst = (Taro.getCurrentInstance && (Taro.getCurrentInstance() as any)) || null;
      const params = inst?.router?.params || {};
      if (params && params.category) {
        setCategory(String(params.category));
        return;
      }
    } catch (err) {
      // ignore
    }

    // Fallback to window query (H5)
    if (typeof window !== 'undefined') {
      const qs = new URLSearchParams(window.location.search);
      const c = qs.get('category');
      if (c) setCategory(c);
    }
  }, []);

  const demoProducts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      title: i % 2 === 0 ? `Fashion Dress ${i + 1}` : `Casual Dress ${i + 1}`,
      image: `https://placehold.co/360x480?text=Prod+${i + 1}`,
      price: 111,
      oldPrice: i % 3 === 0 ? (Math.random() * 300 + 80).toFixed(2) : undefined
    }));
  }, []);

  // If a category is provided, apply a simple deterministic filter so UX reflects the category selection.
  const productsToShow = useMemo(() => {
    if (!category) return demoProducts;
    const n = Number(category) || 0;
    // simple filter: pick items where id % 5 === n % 5
    return demoProducts.filter((p) => p.id % 5 === (n % 5));
  }, [category, demoProducts]);

  return (
    <View className={style.container}>
      <Header />

      <div className={style['top-bar']}>
        <div className={style['sort-left']}>{category ? `Category ${category}` : 'Hot ▾'}</div>
        <div className={style['sort-right']}>
          <FilterOutlined />
        </div>
      </div>

      <main className={style.content}>
        <Row gutter={[12, 14]}>
          {productsToShow.map((p) => (
            <Col key={p.id} xs={12} sm={12} md={12} lg={12}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      </main>

      <Footer />
    </View>
  );
};

export default ProductListPage;
