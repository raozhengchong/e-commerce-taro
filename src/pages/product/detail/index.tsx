import React from 'react';
import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import style from './index.module.scss';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const ProductDetailPage: React.FC = () => {
  // try to read id from Taro router params or fallback to window query
  let id: string | undefined;
  try {
    // Taro runtime
    const inst = Taro.getCurrentInstance && (Taro.getCurrentInstance() as any);
    id = inst?.router?.params?.id;
  } catch (err) {
    // ignore
  }

  if (!id && typeof window !== 'undefined') {
    const qs = new URLSearchParams(window.location.search);
    id = qs.get('id') || undefined;
  }

  const idNum = Number(id) || 1;
  const product = {
    id: idNum,
    title: `Product ${idNum}`,
    image: `https://placehold.co/720x960?text=Product+${idNum}`,
    price: (Math.random() * 200 + 20).toFixed(2),
    oldPrice: idNum % 3 === 0 ? (Math.random() * 300 + 80).toFixed(2) : undefined,
  };

  const addToCart = () => {
    Taro.showToast({ title: 'Added to cart', icon: 'success' } as any);
  };

  return (
    <View className={style.container}>
      <Header />

      <main className={style.content}>
        <div className={style['image-wrap']}>
          <img src={product.image} alt={product.title} />
        </div>

        <div className={style['detail-card']}>
          <h2 className={style['title']}>{product.title}</h2>

          <div className={style['price-row']}>
            <span className={style['price']}>${product.price}</span>
            {product.oldPrice && <span className={style['old-price']}>${product.oldPrice}</span>}
          </div>

          <div className={style['actions']}>
            <Button className={style['buy-btn']} onClick={addToCart}>Add to Cart</Button>
          </div>

          <div className={style['desc']}>
            <p>Demo product description for product {product.id}. This page is a placeholder detail page created for navigation/testing purposes.</p>
          </div>
        </div>
      </main>

      <Footer />
    </View>
  );
};

export default ProductDetailPage;

