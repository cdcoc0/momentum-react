import React, {useState, useCallback} from 'react';
import styled from 'styled-components';

const UserDiv = styled.div`
`

const User = () => {   
    const USER_KEY = "User"; 
    const [userInput, setUserInput] = useState('');

    const onUserChange = useCallback (
        e => {
            setUserInput(e.target.value);
            }, []);

    const onUserSubmit = useCallback (
        () => {
            //e.preventDefault();
            //새로고침 안할 수 있는 방법 찾아보기 visible true/false
            localStorage.setItem(USER_KEY, userInput);
            //setUserInput('');
            }, [userInput]);

    const loadUser = useCallback (
        () => {
        const USER_VAL = localStorage.getItem(USER_KEY);
        if(USER_VAL === '') {
            return (
                <form  onSubmit={onUserSubmit}>
                    <input type="text" placeholder="Name" 
                    value={userInput} onChange={onUserChange} />
                    <button>enter</button>
                </form>
            );
        }
        return (<h4>{`Good Day ${USER_VAL}!`}</h4>);
    }, [onUserChange, onUserSubmit, userInput]);

    return (
        <UserDiv>
            {loadUser()}
        </UserDiv>
    );
}

export default User;