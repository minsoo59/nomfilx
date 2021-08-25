import { tvApi } from "api";
import React, { useEffect, useState } from "react";
import TVPresenter from "./TVPresenter";

function useFetch() {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const callUrl = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callUrl();
  }, [loading]);
  return { topRated, popular, airingToday, error, loading };
}
export default function TV() {
  const { topRated, popular, airingToday, error, loading } = useFetch(tvApi);
  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      error={error}
      loading={loading}
    />
  );
}
