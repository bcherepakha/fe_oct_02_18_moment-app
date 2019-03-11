import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';

import AddPointsForm from '../AddPointsForm/AddPointsForm';
import PointList from '../PointList/PointList';
import FileReaderComponent from '../FileReader/FileReader';

import 'react-vis/dist/style.css';
import './Graph.css';

class Graph extends Component {
    static propTypes = {
        mixCls: PropTypes.string
    }

    state = {
        points: []
    }

    componentDidMount() {
        if (window.localStorage.points) {
            try {
                const points = JSON.parse(window.localStorage.points);

                this.setState({points});
            } catch (ex) {
                console.error(ex);
            }
        }
    }

    savePoints = (points = this.state.points) => {
        window.localStorage.points = JSON.stringify(points);
    }

    addPoint = ({x, y}) => {
        this.setState(({points}) => ({
            points: [
                ...points, {
                    x: parseFloat(x),
                    y: parseFloat(y)
                }
            ]
        }), this.savePoints);
    }

    readFromFile = data => {
        const result = Array.prototype.concat.apply(
            [],
            data.map(d => {
                const rows = d.split(/\s{1,2}/g);

                return rows.map(s => {
                    const [x, y] = s.split(',');

                    return {
                        x: parseFloat(x),
                        y: parseFloat(y)
                    };
                }).filter(point => !isNaN(point.x) && !isNaN(point.y));
            })
        );

        this.setState(({points}) => ({
            points: [
                ...points,
                ...result
            ]
        }), this.savePoints);
    }

    deletePoint = point => {
        this.setState(({points}) => ({
            points: points.filter(p => p !== point)
        }), this.savePoints);
    }

    movePoint = ({startIdx, dropIdx}) => {
        this.setState(({points}) => {
            const newPoints = [...points];

            newPoints[startIdx] = points[dropIdx];
            newPoints[dropIdx] = points[startIdx];

            return {
                points: newPoints
            };
        }, this.savePoints);
    }

    render() {
        const {points} = this.state,
            {mixCls} = this.props;

        return (<div className={['graph', mixCls].filter(Boolean).join(' ')}>
            <div className='graph__points'>
                <h3>Add one point</h3>
                <AddPointsForm submitHandler={this.addPoint}/>
                <h3>Or read from csv file</h3>
                <FileReaderComponent
                    accept='.csv'
                    readFilesHandler={this.readFromFile}/>
                <h3>Control points</h3>
                <PointList
                    points={points}
                    deletePoint={this.deletePoint}
                    movePoint={this.movePoint}/>
            </div>
            <div className='graph__draw'>
                <XYPlot
                    width={400}
                    height={400}
                    colorType="linear"
                    colorDomain={[0, 9]}
                    colorRange={['yellow', 'orange']}>
                    <HorizontalGridLines stroke="#ccc"/>
                    <VerticalGridLines/>
                    <XAxis/>
                    <YAxis/>
                    <LineSeries
                        curve='curveBasis'
                        data={points}/>
                </XYPlot>
            </div>
        </div>);
    }
}

export default Graph;
