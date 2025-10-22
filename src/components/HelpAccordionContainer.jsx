/*
Copyright 2025
All Rights Reserved.
*/
import React from 'react';
import { useParams } from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import Loading from './base/Loading';
import Error from './base/Error';
import HelpAccordion from './HelpAccordion';

function HelpAccordionContainer({ slug: slugProp }) {
    const params = useParams();
    const slug = slugProp || params?.slug;

    const persistentQuery = `wknd-shared/ing-help-accordion-by-slug;slug=${slug}`;
    const { data, errorMessage } = useGraphQL(persistentQuery);

    if (errorMessage) return <Error errorMessage={errorMessage} />;
    if (!data) return <Loading />;

    const list = data?.ingHelpAccordionList?.items?.[0];
    const heading = list?.title || 'Help';
    const helpItems = list?.helpItems || [];

    const editorProps = list?._path ? {
        "data-aue-resource": `urn:aemconnection:${list._path}/jcr:content/data/master`,
        "data-aue-type": 'reference',
        "data-aue-filter": 'cf',
        "data-aue-label": list?.slug || slug
    } : {};

    return (
        <div className="help-accordion-container" {...editorProps}>
            <HelpAccordion heading={heading} items={helpItems} />
        </div>
    );
}

export default HelpAccordionContainer;


