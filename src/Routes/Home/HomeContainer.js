import { moviesApi } from "api";
import React from "react";
import HomePresenter from "./HomePresenter";

export default class Home extends React.Component {
  state = {
    noewPlaying: null,
    upcoming: null,
    popular: null,
    error: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: noewPlaying },
      } = await moviesApi.noewPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // throw Error();
      this.setState({
        noewPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { noewPlaying, upcoming, popular, error, loading } = this.state;
    // console.log(this.state);
    return (
      <HomePresenter
        noewPlaying={noewPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
