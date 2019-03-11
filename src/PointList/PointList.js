import React from 'react';
import PropTypes from 'prop-types';

function dragStart(e, startIdx) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('plain/text', startIdx.toString());
}

function drop(e, dropIdx, movePoint) {
    e.stopPropagation();
    const startIdx = e.dataTransfer.getData('plain/text');

    movePoint({startIdx, dropIdx})
}

function preventDefault(e) {
    e.preventDefault();
}

function PointListItem({point, idx, deletePoint, movePoint}) {
    return <li
        key={idx}
        className='point-list__item'
        onDragStart={e => dragStart(e, idx)}
        onDrop={e => drop(e, idx, movePoint)}
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        draggable>
        {`{x: ${point.x && point.x.toFixed(2)}, y: ${point.y && point.y.toFixed(2)}}`}
        {deletePoint &&
            <button onClick={() => deletePoint(point)}>
                Remove
            </button>}
    </li>;
}

PointListItem.propTypes = {
    point: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }).isRequired,
    idx: PropTypes.number.isRequired,
    deletePoint: PropTypes.func.isRequired,
    movePoint: PropTypes.func.isRequired
};

export default function PointList({points = [], deletePoint, movePoint}) {
    return <ul className='point-list'>
        {points.map((point, idx) => PointListItem({point, idx, deletePoint, movePoint}))}
    </ul>;
}

PointList.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })).isRequired,
    deletePoint: PropTypes.func.isRequired,
    movePoint: PropTypes.func.isRequired
}
