/*
Copyright 2025
All Rights Reserved.
*/
import React, { useState, useCallback } from 'react';
import './HelpAccordion.scss';

function HelpAccordion({ heading, items = [], allowMultipleOpen = false }) {
    const [openIndices, setOpenIndices] = useState(() => new Set());

    const toggleIndex = useCallback((index) => {
        setOpenIndices((prev) => {
            const next = new Set(prev);
            const isOpen = next.has(index);
            if (allowMultipleOpen) {
                if (isOpen) {
                    next.delete(index);
                } else {
                    next.add(index);
                }
            } else {
                next.clear();
                if (!isOpen) {
                    next.add(index);
                }
            }
            return next;
        });
    }, [allowMultipleOpen]);

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section className="help-accordion" aria-label={heading || 'Help'}>
            {heading && <h2 className="help-accordion-title">{heading}</h2>}
            <ul className="accordion-list">
                {items.map((item, index) => {
                    const panelId = `accordion-panel-${index}`;
                    const buttonId = `accordion-button-${index}`;
                    const isOpen = openIndices.has(index);
                    const title = item?.title || `Item ${index + 1}`;
                    const content = item?.helpContent?.plaintext || '';

                    return (
                        <li key={index} className={`accordion-item${isOpen ? ' open' : ''}`}>
                            <div className="accordion-header">
                                <button
                                    id={buttonId}
                                    className="accordion-button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => toggleIndex(index)}
                                >
                                    <span className="accordion-button-label">{title}</span>
                                    <span className="accordion-button-icon" aria-hidden>
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                            </div>
                            <div
                                id={panelId}
                                className="accordion-content"
                                role="region"
                                aria-labelledby={buttonId}
                                hidden={!isOpen}
                            >
                                <p>{content}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default HelpAccordion;


