import React, { useEffect, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useParams } from 'react-router-dom';
import FlipBinder from '../components/FlipBinder';
import { UserProductCategoryService } from '../services/UserProductCategoryService';
import { BinderWithCards, CardWithCondition } from '../types/UserProductCategory';

const Binder = () => {
    const [loading, setLoading] = useState(true);
    const { product_category_user_id } = useParams<{ product_category_user_id: string }>();
    const [binder, setBinder] = useState<BinderWithCards | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
      //if (!product_category_user_id) return;
  
      UserProductCategoryService.getBinderById('1')
        .then((data) => {
          setBinder(data);
          setLoading(false);
        })
        .catch(() => {
          //setLoading(false);
          setError('Failed to load binder');
        });
    }, [product_category_user_id]);

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      );
    };

    if (loading || !binder) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading your binder...</p>
        </div>
      );
    }
    
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          {binder?.name ?? 'My Binder'}
        </h1>
        <FlipBinder cards={binder.cards} binderName={binder.name} />
      </div>
    );
};

export default Binder;