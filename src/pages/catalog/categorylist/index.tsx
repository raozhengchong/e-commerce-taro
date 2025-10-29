import React, { useMemo, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import style from './index.module.scss';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { http } from '../../../services/http.service';

interface ICommonOption {
  [key: string]: any;
}

interface CategoryListProps {
  categories: ICommonOption[];
}

// 小缩略卡片，用于区块中展示
const ThumbCard: React.FC<{ img: string; title?: string }> = ({ img, title }) => (
  <div className={style['thumb-card']}>
    <img src={img} alt={title || 'thumb'} />
    {title && <div className={style['thumb-title']}>{title}</div>}
  </div>
);

export const getServerSideProps = async () => {
  const demoCategories = [
    { id: 1, parent: 0, name: 'Wedding', menu_order: 1 },
    { id: 2, parent: 0, name: 'Special Occasion', menu_order: 2 },
    { id: 3, parent: 0, name: 'Men', menu_order: 3 },
    { id: 4, parent: 0, name: 'Bags & Accessories', menu_order: 4 },
    { id: 5, parent: 0, name: 'Computer', menu_order: 5 },
    // children of Wedding
    { id: 11, parent: 1, name: 'Wedding Dresses', image: { src: 'https://placehold.co/120x160?text=WD1' } },
    { id: 12, parent: 1, name: 'Bridesmaid Dresses', image: { src: 'https://placehold.co/120x160?text=BD1' } },
    { id: 13, parent: 1, name: 'Maternity Wedding', image: { src: 'https://placehold.co/120x160?text=MW' } },
    // grandchildren for Wedding Dresses
    { id: 111, parent: 11, name: 'A-Line Wedding', image: { src: 'https://placehold.co/100x140?text=A-Line' } },
    { id: 112, parent: 11, name: 'Ball Gown Wedding', image: { src: 'https://placehold.co/100x140?text=Ball' } },
    { id: 113, parent: 11, name: 'Junior Bridesmaid', image: { src: 'https://placehold.co/100x140?text=Junior' } },
    { id: 114, parent: 11, name: 'Muslim Wedding', image: { src: 'https://placehold.co/100x140?text=Muslim' } },
    // grandchildren for Bridesmaid
    { id: 121, parent: 12, name: 'Bridesmaid 1', image: { src: 'https://placehold.co/100x140?text=B1' } },
    { id: 122, parent: 12, name: 'Bridesmaid 2', image: { src: 'https://placehold.co/100x140?text=B2' } }
  ];

  try {
    const [err, data] = await http('GET', '/products/categories');
    if (err) {
      return { props: { categories: demoCategories } };
    }

    const categories = Array.isArray(data) ? data : [];
    categories.sort((a: any, b: any) => (a.menu_order || 0) - (b.menu_order || 0) || (a.id || 0) - (b.id || 0));

    if (!categories.length) {
      return { props: { categories: demoCategories } };
    }

    return { props: { categories } };
  } catch (error) {
    console.error('Fetch categories error:', error);
    return { props: { categories: demoCategories } };
  }
};

const CategoryListPage: React.FC<CategoryListProps> = ({ categories }) => {
  // 以 parent === 0 视为顶级分类
  const topCategories = useMemo(() => categories.filter((c) => Number(c.parent) === 0), [categories]);

  // ensure selected is set when topCategories are available
  const defaultSelected = topCategories.length ? String(topCategories[0].id) : '';
  const [selected, setSelected] = useState<string>(defaultSelected);

  React.useEffect(() => {
    if (!selected && topCategories.length) {
      setSelected(String(topCategories[0].id));
    }
  }, [topCategories, selected]);

  const childrenMap = useMemo(() => {
    const map: Record<string, ICommonOption[]> = {};
    categories.forEach((c) => {
      const p = String(c.parent || 0);
      if (!map[p]) map[p] = [];
      map[p].push(c);
    });
    return map;
  }, [categories]);

  // 左侧点击切换
  const onSelectLeft = (catId: string) => {
    setSelected(catId);
  };

  // 打开 product-list，传 category id（使用 Taro.navigateTo，H5 回退）
  const openProductList = async (catId: number | string) => {
    const url = `/pages/catalog/product-list/index?category=${catId}`;
    try {
      await Taro.navigateTo({ url });
    } catch (err) {
      if (typeof window !== 'undefined') {
        // 回退到 H5 路径（简洁映射）
        window.location.href = `/catalog/product-list?category=${catId}`;
      }
    }
  };

  // 右侧当前父分类下的子分类分组
  const currentChildren = useMemo(() => childrenMap[selected] || [], [childrenMap, selected]);

  return (
    <View className={style.container}>
      <Header />

      <div className={style['catalog-wrap']}>
        {/* 左侧纵向菜单 */}
        <aside className={style.sidebar}>
          {topCategories.map((tc) => (
            <div
              key={tc.id}
              className={`${style['sidebar-item']} ${String(tc.id) === selected ? style.active : ''}`}
              onClick={() => onSelectLeft(String(tc.id))}
            >
              <span className={style['sidebar-item-text']}>{tc.name}</span>
            </div>
          ))}
        </aside>

        {/* 右侧内容区 */}
        <main className={style.content}>
          {/* banner */}
          <div className={style.banner}>
            <img src="https://placehold.co/375x120?text=Promo+Banner" alt="banner" />
          </div>

          {/* 如果有子分类，按子分类渲染区块；否则显示当前分类列表 */}
          {currentChildren.length ? (
            currentChildren.map((child: any) => {
              // 子分类下的孙级作为区块内的缩略（若无则用同级图片占位）
              const grandChildren = childrenMap[String(child.id)] || [];
              const items = grandChildren.length ? grandChildren : [child];

              return (
                <section className={style['cat-section']} key={child.id}>
                  <div className={style['section-header']}>
                    <div className={style['section-title']}>{child.name}</div>
                    <div
                      role="button"
                      tabIndex={0}
                      className={style['section-all']}
                      onClick={() => openProductList(child.id)}
                      onKeyPress={(e) => { if ((e as any).key === 'Enter') openProductList(child.id); }}
                    >
                      <span>ALL</span>
                      <RightOutlined />
                    </div>
                  </div>

                  <div className={style['section-body']}>
                    <Row gutter={12}>
                      {items.slice(0, 8).map((it: any, idx: number) => (
                        // 使用 24 栅格中的 8 -> 保持 3 列布局在各档位一致
                        <Col key={idx} xs={8} sm={8} md={8} lg={8}>
                          <div
                            role="button"
                            tabIndex={0}
                            className={style['thumb-link']}
                            onClick={() => openProductList(it.id)}
                            onKeyPress={(e) => { if ((e as any).key === 'Enter') openProductList(it.id); }}
                          >
                            <ThumbCard img={it?.image?.src || `https://placehold.co/100x140?text=${encodeURIComponent(it.name || 'Item')}`} title={it.name} />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </section>
              );
            })
          ) : (
            <div className={style['no-children']}>No categories found.</div>
          )}
        </main>
      </div>

      <Footer />
    </View>
  );
};

export default CategoryListPage;
