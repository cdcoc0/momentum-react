import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
    //background: black;
    height: 120px;
    display: flex;
    flex-direction: row-reverse;
    font-family: sans-serif;
    font-size: 1.5rem;
    color: white;
`

const Clock = () => {
    const [time, setTime] = useState({
        date: new Date()
    });

    const getTime = () => {
        setTime({date: new Date()});
    };

    useEffect(() => {
        const oneMinCall = setInterval(() => getTime(), 30000);
        return () => clearInterval(oneMinCall);
    });

    const hours = time.date.getHours();
    const minutes = time.date.getMinutes();

    return (
        <ClockContainer>
            <h1>{`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`}</h1>
        </ClockContainer>
    )
}

export default Clock;