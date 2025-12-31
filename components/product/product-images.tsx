'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';


const ProductImages = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);



    return (
        <div className='space-y-4'>
            <Image src={images[current]} alt={`Product image ${current + 1}`}
                width={1000}
                height={1000}
                className='min-h-[300px] object-cover object-center' />
            <div className="flex">
                {images.map((img, index) => (
                    <div key={index} onClick={() => setCurrent(index)}
                        className={cn(
                            'mr-2 cursor-pointer border border-transparent hover:border-orange-600',
                            current === index && 'border-2 border-orange-500'
                        )}
                    >
                        <Image src={img} alt={`Thumbnail image ${index + 1}`}
                            width={100}
                            height={100} />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductImages;