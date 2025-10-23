/*
Copyright 2025
*/
import React from 'react';
import {Link} from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import Loading from './base/Loading';
import "./lfArticles.scss";
import placeholderCard from '../images/wknd-card.jpeg';

function LfArticleItem(props) {
    const editorProps = {
        "data-aue-resource": "urn:aemconnection:" + props?._path + "/jcr:content/data/master",
        "data-aue-type": "reference",
        "data-aue-filter": "cf",
        "data-aue-label": props.slug
    };

    if (!props || !props._path || !props.title) {
        return null;
    }

    const imageUrl = props.primaryImage?._publishUrl || placeholderCard;

    return (
        <li className="adventure-item lf-article-card" {...editorProps}>
            <Link to={`/lf/articles/${props.slug}${window.location.search}`} className="adventure-image-card">
                <img
                    className="adventure-item-image"
                    src={`${imageUrl}`}
                    alt={props.title}
                    data-aue-prop="primaryImage"
                    data-aue-type="media"
                />
            </Link>
            <div className="lf-article-content">
                <h3 className="adventure-item-title" data-aue-prop="title" data-aue-type="text">{props.title}</h3>
                <p className="lf-article-summary" data-aue-prop="summary" data-aue-type="text">
                    {props.summary?.plaintext}
                </p>
            </div>
        </li>
    );
}

function LfArticles() {
    const persistentQuery = `wknd-shared/ing-articles-by-articletype;articleType=Lab`;
    const { data, errorMessage } = useGraphQL(persistentQuery);

    if (errorMessage) return null;
    if (!data) return <Loading/>;

    return (
        <section id={`lf-articles-lab`} className="lf-articles">
            <ul className="adventure-items">
                {data.ingArticleList.items.map((article, index) => (
                    <LfArticleItem key={index} {...article} />
                ))}
            </ul>
        </section>
    );
}

export default LfArticles;


