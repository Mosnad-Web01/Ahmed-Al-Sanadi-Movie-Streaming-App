// HomeSection.jsx
"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import MediaSection from './MediaSection';
import { getTrendingEndpoint, getPopularEndpoint, getFreeToWatchEndpoint } from '../services/mediaServices';

const HomeSection = () => {
  const { t } = useTranslation( 'common' );

  return (
    <div className="flex flex-col gap-12 min-h-screen pb-16">
      <MediaSection
        title={t('homeSection.trending')}
        toggleOptions={[
          { value: "day", label: t('homeSection.today') },
          { value: "week", label: t('homeSection.thisWeek') },
        ]}
        endpoint={getTrendingEndpoint}
        initialCategory="day"
      />
      <MediaSection
        title={t('homeSection.whatsPopular')}
        toggleOptions={[
          { label: t('homeSection.streaming'), value: "streaming" },
          { label: t('homeSection.onTV'), value: "on_tv" },
          { label: t('homeSection.forRent'), value: "for_rent" },
          { label: t('homeSection.inTheaters'), value: "in_theaters" },
        ]}
        endpoint={getPopularEndpoint}
        initialCategory="streaming"
      />
      <MediaSection
        title={t('homeSection.freeToWatch')}
        toggleOptions={[
          { label: t('homeSection.movies'), value: "movie" },
          { label: t('homeSection.tv'), value: "tv" },
        ]}
        endpoint={getFreeToWatchEndpoint}
        initialCategory="movie"
      />
    </div>
  );
};

export default HomeSection;