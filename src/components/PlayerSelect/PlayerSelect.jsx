import React, { useContext } from 'react';
import Context from '../../context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setNumPlayers, setPlayerName } from '../../actions/application';

import { ROUTES } from '../../constants/index';

const SelectButton = styled(Link)`
    flex-grow: 1;
    min-width: 20vw;
    font-size: 4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    font-family: Caveat Brush;
    
    &:hover {
        background: lightgreen;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
        margin: 10px;
    }
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    > * {
        margin-bottom: 10px;
    }
`;
const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    justify-items: center;
    width: 100%;
    margin-bottom: 40px;

    > * {
        margin: auto 10px;
        border: 1px solid grey;
        padding: 10px;
        border-radius: 5px;
        width: 45%;
    }
`;

const PlayerSelect = props => {
    const { state, dispatch } = useContext(Context);
    const handleSelect = e => {
        e.preventDefault();
        let numPlayers = Number(e.target.innerHTML);
        dispatch(setNumPlayers(numPlayers));
    }
    const handlePlayerNameChange = e => {
        let target = e.target;
        dispatch(setPlayerName({
            playerId: Number(target.dataset.player),
            name: target.value
        }))
    }
    const renderSelectControls = () => {
        // if ( state.app.numPlayers !== 1) {
            return (
                <>
                    <ColumnWrapper>
                        <RowWrapper>
                            <div>
                                <h4>{state.app.players.find(x => x.playerId === 1).name}</h4>
                                <div>Name:&nbsp;&nbsp;
                                <input
                                        onChange={handlePlayerNameChange}
                                        type="text"
                                        data-player={1}
                                        value={state.app.players.find(x => x.playerId === 1).name}
                                    />
                                </div>
                            </div>
                            <div>
                                <h4>{state.app.players.find(x => x.playerId === 2).name}</h4>
                                <div>Name:&nbsp;&nbsp;
                                <input
                                        onChange={handlePlayerNameChange}
                                        type="text"
                                        data-player={2}
                                        value={state.app.players.find(x => x.playerId === 2).name}
                                    />
                                </div>
                            </div>
                        </RowWrapper>
                        <SelectButton to={ROUTES.PLAY}>Start</SelectButton>
                    </ColumnWrapper>
                </>
            )
        // }
        // return (
        //     <SelectButton
        //         to={'#'}
        //         onClick={handleSelect} value={2}>2</SelectButton>
        // );
    }
    return (
        <ContentWrapper>
            <h2>Player Config</h2>
            { renderSelectControls() }
        </ContentWrapper>
    )
};

export default PlayerSelect;