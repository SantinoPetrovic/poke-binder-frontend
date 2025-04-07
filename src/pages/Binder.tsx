import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-700 dark:text-gray-300 text-lg">Loading your binder...</p>
        </div>
      );
    }
    
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{binder?.name ?? ''}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {binder && binder.cards.map((card: CardWithCondition) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden p-4 text-center"
            >
              <img src={card.imagesSmallUrl} alt={card.name} className="w-full h-40 object-contain mb-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{card.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Condition: {card.conditionData.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Binder;