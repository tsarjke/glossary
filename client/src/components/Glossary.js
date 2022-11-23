import React from 'react';
import {Link} from "react-router-dom";
import {capitalizeFirstLetter} from "../utils/herlpers";

const style = {
    maxWidth: '25rem',
    margin: '0 auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

const Glossary = ({terms}) => {
    if (!terms.length) {
        return <p className="center">Терминов не найдено</p>
    }

    return (
        <table className="highlight centered">
            <thead>
            <tr>
                <th>№</th>
                <th>Термин</th>
                <th>Определение</th>
                <th>Открыть карточку</th>
            </tr>
            </thead>
            <tbody>
            {terms.map((term, index) =>
                (<tr key={term._id}>
                    <td>{index + 1}</td>
                    <td>{capitalizeFirstLetter(term.term)}</td>
                    <td>
                        <div className="col s3" style={style}>{capitalizeFirstLetter(term.description)}</div>
                    </td>
                    <td>
                        <Link to={`/detail/${term._id}`}>Открыть</Link>
                    </td>
                </tr>)
            )}
            </tbody>
        </table>
    );
};

export default Glossary;