/**
 * 第一题
 */
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './style.less';

/**
 * 渲染测试数据
 */
export const cardDataList: IDirectVoucher[] = [
  {
    title: '杭州市通用5元券',
    subTitle:
      '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
  },
  {
    title: '杭州市10元券',
    subTitle: '兰州拉面非常好吃',
  },
];

/**
 * 券卡片渲染数据类型
 */
export interface IDirectVoucher {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
}

export interface ICardProps {
  data: IDirectVoucher;
}

/**
 * 卡片组件
 */
const Card: FC<ICardProps> = props => {
const {data} = props
const [count, setCount] = useState<number>(10)
const latestCount = useRef(count)

useEffect(() => {
  latestCount.current = count
}, [count])
useEffect(() => {
  const timer = setInterval(() => {
    if (latestCount.current === 0) {
      clearInterval(timer)
      return
    }
    setCount(c => c - 1)
  }, 1e3)
}, [])

const mockRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve('成功')
    }, 1e3);
  })
}

const [purchase, setPurchase] = useState(false)
const handleClick = async() => {
  if (count || purchase) return
  setPurchase(true)
  const res = await mockRequest()
  console.log('res', res)
}

const btnTitle = useMemo(() => {
  if (count) return count
  return purchase ? '已抢购' : '抢购'
}, [count, purchase])

  return (
    <div className="card">
      <div>
        <div className='title'>{data.title}</div>
        <div className='sub-title'>{data.subTitle}</div>
      </div>
      <div className='button' onClick={handleClick}>{btnTitle}</div>
    </div>
  );
};

/**
 * 以下为测试用例，无需修改
 */
export default () =>
  cardDataList.map(data => <Card key={data.title} data={data} />);
