import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { getApi } from './api/api';
import { ConfigProvider, Menu, MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

type ItemType = {
  bgColor : string,
  id : string,
  image : string,
  name : string,
  tags : string[]
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function App() {
  const [items, setItems] = useState<ItemType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState(['Все']);

  const handleSelect = ({ selectedKeys }:any) => {
    setSelectedKeys(selectedKeys);
  };

  useEffect(() => {
    getApi.getItems()
    .then((el) => {
      setItems(el.data)
      const tags = new Set();
      tags.add('Все')
      el.data.forEach((item: ItemType) => {
        item.tags.forEach((tag) => {
          tags.add(tag);
        })
      })
      setCategories(Array.from(tags) as string[]);
    })
  }, [])
   
  const categoriesItems: MenuItem[] = categories.map((category, index) => 
  getItem(category, category.toString())
);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedBg: '#5FBF77',
                itemSelectedColor: '#FFFFFF',
                itemBg: 'transparent',
                itemColor: '#39414B',
                fontFamily: '"Nunito Sans", sans-serif'
              },
            },
          }}
        >
          <Menu
            items={categoriesItems}
            defaultSelectedKeys={['Все']}
            onSelect={handleSelect}
          />
        </ConfigProvider>
      </div>
      <div className={styles.content}>
          {
            selectedKeys[0] !== 'Все'? items.filter(item => item.tags.some(tag => selectedKeys.includes(tag))).map((item, index) => 
            <div className={styles.item} key={index}>
              <div className={styles.imageContainer} style={{background: item.bgColor}}>
                <img src={item.image} className={styles.image} />
              </div>
              <h3 className={styles.name}>
                {item.name}
              </h3>
            </div>
            )
            : 
            items.map((item, index) => 
            <div className={styles.item} key={index}>
              <div className={styles.imageContainer} style={{background: item.bgColor}}>
                <img src={item.image} className={styles.image} />
              </div>
              <h3 className={styles.name}>
                {item.name}
              </h3>
            </div>
            )
          }
      </div>
    </div>
  );
}

export default App;
