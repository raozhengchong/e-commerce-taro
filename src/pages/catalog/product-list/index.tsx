import React, { useMemo, useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import style from './index.module.scss';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined, FilterOutlined } from '@ant-design/icons';

// 格式化价格：千分位，固定两位小数，返回带 $ 前缀的字符串。使用纯 JS 实现以保证 SSR/客户端一致性。
function formatPrice(value?: string | number) {
  if (value === undefined || value === null) return '$0.00';
  const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
  if (!isFinite(num)) return '$0.00';
  const fixed = num.toFixed(2);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${parts.join('.')}`;
}

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
        <div
          className={style['cart-overlay']}
          onClick={addToCart}
          role="button"
          aria-label="add-to-cart"
        >
          <ShoppingCartOutlined />
        </div>
      </div>

      <div className={style['product-info']}>
        {/* 截图中卡片没有展示标题，保持简洁，隐藏标题区域以一致展示 */}
        {/* <div className={style['product-title']}>{product.title}</div> */}
        <div className={`${style['product-price']} ${priceHasOld ? style['has-old'] : ''}`}>
          <span className={style['price']}>{formatPrice(product?.price)}</span>
          {product?.oldPrice && <span className={style['old-price']}>{formatPrice(product?.oldPrice)}</span>}
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
    // 为避免 SSR 与客户端水合不一致，使用确定性（固定）的 demo 数据而非 Math.random()
    const fixed = [
      { price: '358.00', oldPrice: undefined },
      { price: '341.99', oldPrice: undefined },
      { price: '143.56', oldPrice: '233.00' },
      { price: '33.00', oldPrice: undefined },
      { price: '40.56', oldPrice: undefined },
      { price: '27.00', oldPrice: undefined },
      { price: '59.99', oldPrice: '99.99' },
      { price: '75.00', oldPrice: undefined },
      { price: '120.00', oldPrice: undefined },
      { price: '89.50', oldPrice: '129.50' },
      { price: '49.99', oldPrice: undefined },
      { price: '210.00', oldPrice: undefined }
    ];

    return fixed.map((f, i) => ({
      id: i + 1,
      title: i % 2 === 0 ? `Fashion Dress ${i + 1}` : `Casual Dress ${i + 1}`,
      // 使用占位图，但 src 在服务端和客户端相同，保持一致
      image: `https://placehold.co/360x480?text=Prod+${i + 1}`,
      price: f.price,
      oldPrice: f.oldPrice
    }));
  }, []);

  // If a category is provided, apply a simple deterministic filter so UX reflects the category selection.
  const productsToShow = useMemo(() => {
    if (!category) return demoProducts;
    const n = Number(category) || 0;
    // simple filter: pick items where id % 5 === n % 5
    return demoProducts.filter((p) => Number(p.id) % 5 === (n % 5));
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
