import React from 'react';
import './style.scss';

interface Props {
    percent: number;
}

const CicleProgress = ({ percent }: Props) => {
    const ROTATE_VALUE = 360;

    const calculateRotation = (): number => {
        return ROTATE_VALUE * (percent / 100);
    };

    return (
        <div className={`progress-circle${percent > 50 ? ' over50' : ''}`}>
            <span>{percent}%</span>
            <div className="left-half-clipper">
                <div className="first50-bar"></div>
                <div className="value-bar" style={{ transform: `rotate(${calculateRotation()}deg)` }}></div>
            </div>
        </div>
    );
};

export default CicleProgress;
