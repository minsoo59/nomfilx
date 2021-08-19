import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 15px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-left: -5px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  :nth-of-type(2) {
    margin: -10px 0 20px 0;
  }
`;

const Item = styled.span`
  a {
    :hover {
      opacity: 0.5;
    }
  }
`;
const YTLink = styled.div`
  margin: 20px 0;
  font-size: 12px;
  line-height: 1.5;
  height: inherit;
  div {
    a {
      :hover {
        font-size: 12.4px;
        opacity: 0.5;
        transition-duration: 0.1s;
      }
    }
  }
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Production = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 85%;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title> Loading | Nomfilx </title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.name ??
            result.original_name ??
            result.title ??
            result.original_title}{" "}
          | Nomfilx
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          `https://image.tmdb.org/t/p/original${result.poster_path}` ||
          `https://image.tmdb.org/t/p/original${result.backdrop_path}`
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/no-poster.jpg").default
          }
        />
        <Data>
          <Title>
            {result.name ??
              result.original_name ??
              result.title ??
              result.original_title}
          </Title>
          <ItemContainer>
            <>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              {result.release_date || result.first_air_date ? (
                <Divider>▪</Divider>
              ) : null}
            </>
            <>
              <Item>
                {result.production_countries &&
                  result.production_countries.map((country) => country.name)}
              </Item>
              {result.production_countries ? <Divider>▪</Divider> : null}
            </>
            <>
              <Item>{result.runtime ?? result.episode_run_time[0]} min</Item>
              {result.runtime || result.episode_run_time[0] ? (
                <Divider>▪</Divider>
              ) : null}
            </>
            <>
              <Item>
                {result.genres &&
                  result.genres.map((genres, index) =>
                    index === result.genres.length - 1
                      ? genres.name
                      : `${genres.name} / `
                  )}
              </Item>
              {result.genres ? <Divider>▪</Divider> : null}
            </>
            <Item>{result.status}</Item>
          </ItemContainer>
          <ItemContainer>
            <>
              <Item>
                {result.seasons
                  ? `Season : ${
                      result.seasons[result.seasons.length - 1].season_number
                    }`
                  : null}
              </Item>
              {result.seasons ? <Divider>▪</Divider> : null}
            </>
            <Item>
              <a href={`${result.homepage}` || "null"} target="_blank">
                homepage
              </a>
            </Item>
          </ItemContainer>

          <Overview>
            {result.overview ? result.overview : "There is not overview"}
          </Overview>
          <YTLink>
            {result.videos &&
              result.videos.results.map((video) => (
                <div key={video.key}>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {video.name}
                  </a>
                </div>
              ))}
          </YTLink>
          <Production></Production>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default DetailPresenter;
