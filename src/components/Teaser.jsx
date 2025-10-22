/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import { getArticle } from '../utils/commons';
import { getPublishHost } from '../utils/fetchData';
import { mapJsonRichText } from '../utils/renderRichText';
// import Error from './base/Error';
import Loading from './base/Loading';
import "./Teaser.scss";


const Teaser = (props) => {
  const persistentQuery = `wknd-shared/article-by-slug;slug=${props.item}`;
  const {data, errorMessage} = useGraphQL(persistentQuery);
  	//If there is an error with the GraphQL query
	if (errorMessage) {
    console.log("errorMessage");
    return;
  }

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;
  const article =  getArticle(data);
  if(!article) return <></>
  const { title, _path, featuredImage, synopsis, slug } = article;
  const ctaLabel = article?.ctaLabel || article?.ctaText || article?.buttonLabel || article?.cta?.label || 'Read more';

  const editorProps = {
		"data-aue-resource": "urn:aemconnection:" + _path + "/jcr:content/data/master",
		"data-aue-type": "reference",
		"data-aue-filter": "cf"
	};

  return (

  <section {...editorProps} className="Teaser">
      <div className="teaser__container">
        <div className="teaser__image">
          <img className="teaser__image-el" src={`${getPublishHost()}${featuredImage._path}`} alt={title} data-aue-type="media" data-aue-prop="featuredImage" />
        </div>
        <div className="teaser__content">
          <h2 className="teaser__title" data-aue-prop="title" data-aue-type="text">
            <span>{title}</span>
          </h2>
          {synopsis && (
            <div className="teaser__body" data-aue-prop="synopsis" data-aue-type="richtext">
              {mapJsonRichText(synopsis.json)}
            </div>
          )}
          <Link to={`/articles/article/${slug || 'article'}${window.location.search}`} className="teaser__cta-link">
            <button className="teaser-button" data-aue-prop="ctaLabel" data-aue-type="text">{ctaLabel}</button>
          </Link>
        </div>
      </div>
  </section>

);
  }
  
export default Teaser;

