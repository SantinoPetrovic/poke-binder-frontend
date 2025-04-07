import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useParams } from 'react-router-dom';
import { UserProductCategoryService } from '../services/UserProductCategoryService';
import { BinderWithCards, CardWithCondition } from '../types/UserProductCategory';

interface FlipBinderProps {
  cards: CardWithCondition[];
  binderName: string;
}

const FlipBinder: React.FC<FlipBinderProps> = ({ cards, binderName }) => {
    const binderRef = useRef<{ pageFlip: () => any } | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const flipNext = () => binderRef.current?.pageFlip().flipNext();
    const flipPrev = () => binderRef.current?.pageFlip().flipPrev();

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          {binderName}
        </h1>
        <HTMLFlipBook
          ref={binderRef}
          width={400}
          height={600}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          showCover={true}
          className="mx-auto"
          style={{}}
          startPage={0}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          onFlip={(e: { data: number }) => setCurrentPage(e.data)}
          showPageCorners={true}
          disableFlipByClick={false}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
        >
          {cards.map((card: CardWithCondition) => (
            <div key={card.id} className="bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col items-center justify-center">
              <img src={card.imagesSmallUrl} alt={card.name} className="h-60 object-contain mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{card.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.conditionData.name}
              </p>
            </div>
          ))}
        </HTMLFlipBook>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => flipPrev()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Flip back
          </button>
          <div className="text-sm mt-2 text-gray-500">
            Page {currentPage + 1} of {binderRef.current?.pageFlip().getPageCount()}
          </div>
          <button
            onClick={() => flipNext()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Flip next
          </button>
        </div>
      </div>
    );
};

export default FlipBinder;