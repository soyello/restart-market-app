import Image from 'next/image';

interface AvatarProps {
  src: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={src || 'https://via.placeholder.com/400x400?text=no+user+image'}
      priority={true}
    />
  );
};

export default Avatar;
