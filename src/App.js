import {React} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import IngArticles from "./components/ingArticles";
import IngArticleDetail from "./components/ingArticleDetail";
import About from "./components/About";
import HelpAccordionContainer from "./components/HelpAccordionContainer";
import {getAuthorHost, getProtocol, getService} from "./utils/fetchData";
import logo from "./images/lf-stockholm.svg";
import footerImage from "./images/sidfotsillustration_stockholm.svg";
import "./App.scss";
// import ProductDetails from "./components/ProductDetails";
// import ProductList from './components/ProductList';
// import { useSparkleAppUrl } from "./hooks";

// const httpLink = createHttpLink({
//     uri: 'https://com526.adobedemo.com/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//     return {
//         headers: {
//             ...headers,
//             Store: 'fresh_store',
//         }
//     }
// });

// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
// });

const NavMenu = () => (
  <nav>
    <ul className="menu">
      <li><a href={`/${window.location.search}`}>Home</a></li>
      <li><a href={`/articles${window.location.search}`}>Insurance</a></li>
      <li><a href={`/aboutus${window.location.search}`}>Bank</a></li>
      <li><a href={`/${window.location.search}`}>Pension</a></li>
      <li><a href={`/articles${window.location.search}`}>Real estate agency</a></li>
      <li><a href={`/aboutus${window.location.search}`}>About us</a></li>
    </ul>
  </nav>
);

const Header = () => {
  // const sparkleAppUrl = useSparkleAppUrl();
  return (
    <header className="header">
        {/*<a href={sparkleAppUrl}><img src={logo} className="logo" alt="WKND Logo" /></a>*/}
        <img src={logo} className="logo" alt="ING Logo" />
      <NavMenu />
      <button className="dark">Sign in</button>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
    <img src={footerImage} className="footer-image" alt="LF Logo" />
    </div>
    <img src={logo} className="logo" alt="ING Logo" />
    <NavMenu />
    <small>Copyright &copy; 2025 Adobe. All rights reserved. Länsförsäkringar and associated are fully copyright by Länsförsäkringar Inc. Built for demo purposes only</small>
  </footer>
);

function App() {

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <meta name="urn:adobe:aue:system:aemconnection" content={`${getProtocol()}:${getAuthorHost()}`}/>
          <meta name="urn:adobe:aue:config:extensions" content="https://47679-workflowextension.adobeio-static.net"/>
            { getService() && <meta name="urn:adobe:aue:config:service" content={getService()}/> }
        </Helmet>
        <Router>
          <Header />
          <hr/>
          <main>
            <Routes>
              <Route path="/adventure/:slug" element={<AdventureDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/article/:slug" element={<ArticleDetail />} />
              <Route path="/ing/articles" element={<IngArticles />} />
              <Route path="/ing/articles/:slug" element={<IngArticleDetail />} />
              <Route path="/help/:slug" element={<HelpAccordionContainer />} />
              <Route path="/aboutus" element={<About />} />
            </Routes>
              {/*<ApolloProvider client={client}>
                  <ProductDetails sku="10001"/>
              </ApolloProvider>*/}
          </main>
        </Router>
          <hr/>
          <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;
