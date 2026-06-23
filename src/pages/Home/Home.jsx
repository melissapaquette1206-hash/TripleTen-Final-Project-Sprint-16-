import { useState } from "react";

import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import NewsCardList from "../../components/NewsCardList/NewsCardList";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";

import newsApi from "../../utils/NewsApi";

function Home() {
  const [articles, setArticles] = useState([]);

  const handleSearch = (keyword) => {
    newsApi
      .searchNews(keyword)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch(console.error);
  };

  return (
    <>
      {" "}
      <Header />
      <SearchForm onSearch={handleSearch} />
      {articles.length > 0 && <NewsCardList articles={articles} />}
      <About />
      <Footer />
    </>
  );
}

export default Home;
