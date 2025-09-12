import { memo } from 'react';
import dynamic from 'next/dynamic';
import { capitalizeFirstLetter } from "@/services/format";
import { IMAGE_TYPES } from '@/util/tmdbImageConstants';

const FlipCard = dynamic(() => import('./FlipCard'), { ssr: false });

const CategoryPage = memo(({ pageTitle, shows, categoryId }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-[#032541] dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {pageTitle === "tv" ? "TV Shows" : "Movies"} in{" "}
        {capitalizeFirstLetter(categoryId.replace(/-/g, " "))} Category
      </h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <div className="filter-options">
            <p className="text-center">Filter Options (Coming Soon)</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-4 justify-center">
            {shows?.length > 0 ? (
              shows.map((show) => (
                <div className="flex justify-center" key={show.id}>
                  <FlipCard
                    item={show}
                    mediaType={pageTitle}
                    size={IMAGE_TYPES.POSTER.XLARGE}
                    backStyle="alternate"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No shows found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage;