import { moviesApi } from "api";
import React, { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";

function useFetch() {
  const [nowPlaying, setNowplaying] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [popular, setPopular] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // throw Error();
      setNowplaying(nowPlaying);
      setUpcoming(upcoming);
      setPopular(popular);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callUrl();
  });
  return { nowPlaying, upcoming, popular, error, loading };
}
export default function Home() {
  const { nowPlaying, upcoming, popular, error, loading } = useFetch(moviesApi);
  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
}
