/*
Copyright 2025
*/
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import backIcon from '../images/Back.svg';
import Error from './base/Error';
import Loading from './base/Loading';
import './lfArticleDetails.scss';
import useGraphQL from '../api/useGraphQL';

function LfArticleDetails() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const persistentQuery = `wknd-shared/lf-articles-by-slug;slug=${slug}`;

    const {data, errorMessage} = useGraphQL(persistentQuery);
    if (errorMessage) return <Error errorMessage={errorMessage}/>;
    if (!data) return <Loading/>;

    const currentArticle = getArticle(data);
    if (!currentArticle) {
        return <NoArticleFound/>;
    }

    const editorProps = {
        "data-aue-resource": "urn:aemconnection:" + currentArticle._path + "/jcr:content/data/master",
        "data-aue-type": "reference",
        itemfilter: "cf"
    };

    return (
        <div  {...editorProps} className="lf-article-detail">
            <div><div className="adventure-detail-header">
                <button className="adventure-detail-back-nav dark" onClick={() => navigate(-1)}>
                    <img className="Backbutton-icon" src={backIcon} alt="Return"/> Articles
                </button>
                <h1 className="lf-article-detail-title" data-aue-prop="title" data-aue-type="text">{currentArticle.title}</h1>
                <div className="pill default">
                    <span data-aue-prop="articleType" data-aue-type="text">{currentArticle.articleType}</span>
                </div>
            </div></div>
            <ArticleDetailRender {...currentArticle} />
        </div>
    );
}

function ArticleDetailRender({
                               title,
                               primaryImage,
                               articleType,
                               associatedProduct,
                               summary,
                               articleContent
                           }) {
    return (
        <div>
            <img
                className="lf-article-detail-primaryimage"
                src={primaryImage?._publishUrl}
                alt={title}
                data-aue-prop="primaryImage"
                data-aue-type="media"
            />
            <div className="lf-article-detail-content">
                {summary?.plaintext && (
                    <div data-aue-prop="summary" data-aue-type="text">
                        {summary.plaintext}
                    </div>
                )}
                <div className="lf-article-detail-info">
                    <div className="adventure-detail-info-label">
                        <h6>Article Type</h6>
                        <span data-aue-prop='articleType' data-aue-type="text">{articleType}</span>
                    </div>
                    <div className="adventure-detail-info-label">
                        <h6>Associated Product</h6>
                        <span data-aue-prop='associatedProduct' data-aue-type="text">{associatedProduct}</span>
                    </div>
                </div>
                <h2>Content</h2>
                <div
                    data-aue-prop="articleContent"
                    data-aue-type="richtext"
                    dangerouslySetInnerHTML={{ __html: articleContent?.html || '' }}
                />
            </div>
        </div>
    );
}

function NoArticleFound() {
    return (
        <div className="adventure-detail">
            <Link className="adventure-detail-close-button" to={`/${window.location.search}`}>
                <img className="Backbutton-icon" src={backIcon} alt="Return"/>
            </Link>
            <Error errorMessage="Missing data, article could not be rendered."/>
        </div>
    );
}

function getArticle(data) {
    if (data && data.ingArticleList && data.ingArticleList.items && data.ingArticleList.items.length > 0) {
        return data.ingArticleList.items[0];
    }
    return undefined;
}

export default LfArticleDetails;


