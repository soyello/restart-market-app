import { useSearchParams } from 'next/navigation';
import { GiBoatFishing, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import CategoryBox from './CategoryBox';

export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: TbBeach,
    description: '디지털기기 카테고리입니다.',
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: GiWindmill,
    description: '생활가전 카테고리입니다.',
  },
  {
    label: '가구/인테리어',
    path: 'interial',
    icon: MdOutlineVilla,
    description: '가구/인테리어 카테고리입니다.',
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: TbMountain,
    description: '여성의류 카테고리입니다.',
  },
  {
    label: '남성패션/잡화',
    path: 'men-fashion',
    icon: TbPool,
    description: '남성패션/잡화 카테고리입니다.',
  },
  {
    label: '뷰티/미용',
    path: 'beuty',
    icon: GiIsland,
    description: '뷰티/미용 카테고리입니다.',
  },
  {
    label: '스포츠/레저',
    path: 'sports',
    icon: GiBoatFishing,
    description: '스포츠/레저 카테고리입니다.',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');

  console.log(params?.get('category'));
  return (
    <div className='flex flex-row items-center justify-center pt-4 overflow-x-auto'>
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          path={item.path}
          icon={item.icon}
          selected={category === item.path}
        />
      ))}
    </div>
  );
};

export default Categories;
