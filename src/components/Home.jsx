/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './base/Container';
import Title from './base/Title';
import Text from './base/Text';
import Teaser from './Teaser';
import Adventures from './Adventures';
import IngArticles from './ingArticles';
import HelpAccordionContainer from './HelpAccordionContainer';
import "./Home.scss";

/***
 * Displays a grid of current adventures
 */
function Home() {
    return (
        <div className="Home">
            <section className="primary-teaser">
                <Teaser item="we-are-close-at-every-stage-of-life"/>
            </section>
            <section className="section-one">
                <Title resource="urn:aemconnection:/content/demopotemeaprogram3/us/en/ing/jcr:content/root/container/container/title" prop="jcr:title" type="text"/>
                <IngArticles category="Lab" />
            </section>     
            <section className="section-two">
                <HelpAccordionContainer slug="faq-about-borrowing" />
            </section>     
            {/* <section className="section-two">
                <Title resource="urn:aemconnection:/content/wknd/us/en/tesco-home/jcr:content/root/container/section_two_title" prop="jcr:title" type="text"/>
                <Adventures category="healthy" />
            </section>   
            <section className="newsletter">
                <div className="content">
                    <Title resource="urn:aemconnection:/content/wknd/us/en/newsletter/jcr:content/root/container/title" prop="jcr:title" type="text"/>
                    <Text resource="urn:aemconnection:/content/wknd/us/en/newsletter/jcr:content/root/container/text" prop="text" type="richtext" />
                </div>
                <button>Know more</button>
            </section>
            <section className="section-three">
                <Title resource="urn:aemconnection:/content/wknd/us/en/tesco-home/jcr:content/root/container/section_three_title" prop="jcr:title" type="text"/>
                <Adventures category="world" />
            </section>            
            <section className="section-four">
                <Title resource="urn:aemconnection:/content/wknd/us/en/tesco-home/jcr:content/root/container/section_four_title" prop="jcr:title" type="text"/>
                <Adventures category="healthy" />
            </section>    */}
            {/* <section className="about-us">
                <div className="content">
                    <Title resource="urn:aemconnection:/content/wknd/language-masters/en/universal-editor-container/jcr:content/root/title" prop="jcr:title" type="text"/>
                    <Container resource="urn:aemconnection:/content/wknd/language-masters/en/universal-editor-container/jcr:content/root/container" type="container" />
                </div>d
                <Link to={`/aboutus${window.location.search}`}>
                    <button className="dark">Read more</button>
                </Link>
            </section> */}
        </div>
    );
}

export default Home;
