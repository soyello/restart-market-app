import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import { categories } from '@/components/categories/Categories';
import CategoryInput from '@/components/categories/CategoryInput';
import React, { useContext, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { KakaoContext } from '../_app';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductUploadPage = () => {
  const router = useRouter();
  const { isKakaoLoaded } = useContext(KakaoContext);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isKakaoLoaded) {
      setShouldRenderMap(true);
    }
  }, [isKakaoLoaded]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 10000,
    },
  });
  const imageSrc = watch('imageSrc');
  const category = watch('category');

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const KakaoMap = dynamic(() => import('../../components/KakaoMap'), {
    ssr: false,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/products', data)
      .then((response) => {
        router.push(`/products/${response.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <Heading title='Product Upload' subtitle='upload your product' />
          <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
          <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required />
          <hr />
          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='price'
            label='Price'
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={() => setCustomValue('category', item.path)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />
          {shouldRenderMap ? (
            <KakaoMap setCustomValue={setCustomValue} latitude={latitude} longitude={longitude} />
          ) : (
            <p>Loading kakao Maps</p>
          )}
          <Button label='상품 생성하기' />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
