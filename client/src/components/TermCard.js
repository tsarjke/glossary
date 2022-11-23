import React from 'react';
import {capitalizeFirstLetter, endingDot} from "../utils/herlpers";

const TermCard = ({term: {term, description, date}}) => {

    return (
        <>
            <h2>{capitalizeFirstLetter(term)}</h2>
            <p className="flow-text"><span style={{textDecoration: 'underline'}}>Определение:</span><strong> {capitalizeFirstLetter(description)}{endingDot(description)}</strong></p>
            <p>Date of creation: <strong>{new Date(date).toLocaleDateString()}</strong></p>
        </>
    );
};

export default TermCard;