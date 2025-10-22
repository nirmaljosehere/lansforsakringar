/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import backIcon from '../images/Back.svg';
import Error from './base/Error';
import Loading from './base/Loading';
import './ingArticleDetail.scss';
import useGraphQL from '../api/useGraphQL';

function IngArticleDetail() {
	// params hook from React router
	const {slug} = useParams();
	const navigate = useNavigate();
	const persistentQuery = `wknd-shared/ing-articles-by-slug;slug=${slug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL(persistentQuery);

	//If there is an error with the GraphQL query
	if (errorMessage) return <Error errorMessage={errorMessage}/>;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;

	//Get current article from the graphQL response
	const currentArticle = getArticle(data);

	//Must have required fields
	if (!currentArticle) {
		return <NoArticleFound/>;
	}

	const editorProps = {
		"data-aue-resource": "urn:aemconnection:" + currentArticle._path + "/jcr:content/data/master",
		"data-aue-type": "reference",
		itemfilter: "cf"
	};

	return (
		<div  {...editorProps} className="adventure-detail">
			<div><div className="adventure-detail-header">
				<button className="adventure-detail-back-nav dark" onClick={() => navigate(-1)}>
					<img className="Backbutton-icon" src={backIcon} alt="Return"/> Articles
				</button>
				<h1 className="adventure-detail-title" data-aue-prop="title" data-aue-type="text">{currentArticle.title}</h1>
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
				className="adventure-detail-primaryimage"
				src={primaryImage?._publishUrl}
				alt={title}
				data-aue-prop="primaryImage"
				data-aue-type="media"
			/>
			<div className="adventure-detail-content">
				{summary?.plaintext && (
					<div data-aue-prop="summary" data-aue-type="text">
						{summary.plaintext}
					</div>
				)}
				<div className="adventure-detail-info">
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

/**
 * Helper function to get the first adventure from the response
 * @param {*} response
 */
function getArticle(data) {
	if (data && data.ingArticleList && data.ingArticleList.items && data.ingArticleList.items.length > 0) {
		return data.ingArticleList.items[0];
	}
	return undefined;
}

/**
 * Example of using a custom render for in-line references in a multi line field
 */
export default IngArticleDetail;
