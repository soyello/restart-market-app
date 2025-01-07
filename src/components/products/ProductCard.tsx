import { Product } from '@/helper/type';
import { AdapterUser } from 'next-auth/adapters';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HeartButton from '../HeartButton';
import { fromNow } from '@/helper/dayjs';

interface ProductCardProps {
  data: Product;
  currentUser: AdapterUser | null;
  setCurrentUser: (user: AdapterUser | null) => void;
}

const ProductCard = ({ data, currentUser, setCurrentUser }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/products/${data.id}`)} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col w-full gap-2'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          <Image
            src={data.imageSrc}
            fill
            sizes='auto'
            className='object-cover w-full h-full transition goup-hover:scale-100'
            alt='product'
          />
          <div className='absolute top-3 right-4'>
            <HeartButton productId={data.id} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </div>
        <div className='text-lg font-semibold'>{data.title}</div>
        <div className='font-light text-neutral-500'>{data.category}</div>
        <div className='flex flex-row items-center justify-between gap-1'>
          <div>
            {data.price}
            <span className='font-light'>원</span>
          </div>
          <div>{fromNow(data.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
