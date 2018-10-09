import React from 'react'
import PureComponent from './PureComponent';
import PropTypes from 'prop-types';
import {intersection} from 'underscore';
import {
    getHoverColor,
    getPathwayColorMask,
    scoreData,
    getColorDensity, normalizedColor, getDarkColor
} from "../functions/ColorFunctions";

export class GeneSetSvgSelector extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: props.selected,
            pathways: props.pathways,
        };
    }

    /**
     * Score is from 0 to 1
     * @param score
     * @param selected
     * @param hovered
     * @param labelOffset
     * @param left
     * @param width
     * @param labelHeight
     * @param colorMask
     * @returns {*}
     */
    labelStyle(score, selected, hovered, labelOffset, left, width, labelHeight, colorMask) {

        if (selected) {
            return {
                top: labelOffset,
                left: left,
                height: labelHeight,
                width: width,
                strokeWidth: 1,
                boxShadow: '0 0 4px 4px blue',
                borderRadius: '25px',

            }
        }

        else if (hovered) {
            return {
                top: labelOffset,
                left: left,
                height: labelHeight,
                width: width,
                backgroundColor: getHoverColor(score),
                strokeWidth: 1,
                borderRadius: '15px',
                boxShadow: '0 0 1px 1px gray',
                cursor: 'pointer'
            }
        }
        else {
            return {
                top: labelOffset,
                left: left,
                height: labelHeight,
                width: width,
                strokeWidth: 2,
                cursor: 'pointer'
            }
        }
    }

    pillStyle(score, colorMask) {
        let colorString = 'rgba(';
        colorString += colorMask[0];
        colorString += ',';
        colorString += colorMask[1];
        colorString += ',';
        colorString += colorMask[2];
        colorString += ',';
        colorString += score + ')';
        return {
            top: 0,
            left: 0,
            height: this.props.labelHeight,
            strokeWidth: 1,
            stroke: colorString,
            fill: colorString,

            cursor: 'pointer'
        }
    }


    onClick = (geneSet, event) => {
        let {onClick} = this.props;
        if (onClick) {
            onClick(geneSet);
        }
    };

    onMouseOut = (geneSet, event) => {
        let {onHover} = this.props;
        onHover(null);
    };

    onHover = (geneSet, event) => {
        let {onHover} = this.props;
        if (onHover) {
            onHover(geneSet);
        }
        else {
            onHover(null);
        }
    };



    render() {
        let {pathways, selectedPathways, topOffset, hoveredPathways, width, labelHeight, labelOffset, left} = this.props;
        if (selectedPathways.length === 0) {
            return (
                <div></div>
            )
        }

        let newRefPathways = pathways.map(r => {

            return {
                goid: r.goid,
                golabel: r.golabel,
                gene: r.gene,
                firstDensity: r.firstDensity,
                secondDensity: r.secondDensity,
                firstNumSamples: r.firstNumSamples,
                secondNumSamples: r.secondNumSamples,
            };
        });


        let hoveredLabel = hoveredPathways ? hoveredPathways.golabel : '';
        let genesToHover = hoveredPathways ? hoveredPathways.gene : '';
        let selectedLabels = selectedPathways.map(p => p && p.golabel);
        let colorMask = getPathwayColorMask();
        console.log('selected labels',selectedLabels)

        return newRefPathways.map((p, index) => {
            let labelString = '(' + p.gene.length + ') ' + p.golabel;

            let hovered = intersection(genesToHover, p.gene).length > 0;
            hovered = hovered || p.gene.indexOf(hoveredLabel) >= 0;
            let selected = selectedLabels.indexOf(p.golabel) >= 0;
            let firstScore = scoreData(p.firstDensity, p.firstNumSamples, p.gene.length,labelString);
            let secondScore = scoreData(p.secondDensity, p.secondNumSamples, p.gene.length,labelString);

            return (
                <svg
                    style={this.labelStyle((p.firstDensity + p.secondDensity) / 2.0, selected, hovered, labelOffset, left, width, labelHeight, colorMask)}
                    onMouseDown={this.onClick.bind(this, p)}
                    onMouseOut={this.onMouseOut.bind(this, p)}
                    onMouseOver={this.onHover.bind(this, p)}
                    key={p.golabel}
                >
                    {p.firstDensity &&
                    <rect width={width / 2 - 1} x={0} height={labelHeight}
                          style={this.pillStyle(firstScore, colorMask)}/>
                    }
                    {p.secondDensity &&
                    <rect width={width / 2} x={width / 2 + 1} height={labelHeight}
                          style={this.pillStyle(secondScore, colorMask)}/>
                    }
                    <text x={10} y={topOffset} fontFamily='Arial' fontSize={12}
                          fill={'black'}
                    >
                        {width < 10 ? '' : labelString}
                    </text>
                </svg>
            );
        });
    }

}

GeneSetSvgSelector.propTypes = {
    pathways: PropTypes.any,
    layout: PropTypes.any,
    width: PropTypes.any,
    referenceLayout: PropTypes.any,
    selectedPathways: PropTypes.any,
    hoveredPathways: PropTypes.any,
    associateData: PropTypes.any,
    labelHeight: PropTypes.any,
    topOffset: PropTypes.any,
    onClick: PropTypes.any,
    onHover: PropTypes.any,
    onMouseOut: PropTypes.any,
};
