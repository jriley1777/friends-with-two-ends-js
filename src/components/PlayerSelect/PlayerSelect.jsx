import React, { useContext, useEffect } from 'react';
import Context from '../../context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { changePlayerAttribute } from '../../actions/application';

import { ROUTES } from '../../constants/index';

const SelectButton = styled(Link)`
    flex-grow: 1;
    min-width: 20vw;
    font-size: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid black;
    text-decoration: none;
    color: black;
    font-family: Caveat Brush;
    background: rgba(255,255,255,0.5);
    
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
        margin: auto 40px;
        border: 1px solid grey;
        padding: 0 10px 10px 10px;
        border-radius: 5px;
        width: 15vw;
    }
`;

const StyledInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px auto;
    > * {
        border: 1px solid #2c2c2c;
    }
`;

const PlayerSelect = props => {
    const { state, dispatch } = useContext(Context);
    const { username } = state.auth;
    const filters = {
        big: {
            min: 20,
            max: 100,
        },
        tall: {
            min: 20,
            max: 100
        }
    }
    const handleAttrChange = e => {
        let target = e.target;
        dispatch(changePlayerAttribute({
            playerId: Number(target.dataset.player),
            attr: {
                [target.name]: target.value
            }
        }))
    }
    useEffect(() => {
        if(username){
            dispatch(changePlayerAttribute({
                playerId: 1,
                attr: {
                    name: username
                }
            }))
        }
    }, [username, dispatch])
    const renderSelectControls = () => {
        return (
            <>
                <ColumnWrapper>
                    <RowWrapper>
                        <div
                            style={{
                                background: 'rgba(255, 255,255, 0.5)'
                            }}>
                            <h4>{state.app.players.find(x => x.playerId === 1).attr.name}</h4>
                            <StyledInput>Name:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="name"
                                    type="text"
                                    data-player={1}
                                    value={state.app.players.find(x => x.playerId === 1).attr.name}
                                />
                            </StyledInput>
                            <StyledInput>Big:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="big"
                                    type="range"
                                    min={filters.big.min}
                                    max={filters.big.max}
                                    data-player={1}
                                    value={state.app.players.find(x => x.playerId === 1).attr.big}
                                />
                            </StyledInput>
                            <StyledInput>Tall:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="tall"
                                    type="range"
                                    min={filters.tall.min}
                                    max={filters.tall.max}
                                    data-player={1}
                                    value={state.app.players.find(x => x.playerId === 1).attr.tall}
                                />
                            </StyledInput>
                        </div>
                        <div
                            style={{ 
                                background: 'rgba(0,0,0, 0.5)'
                            }}>
                            <h4>{state.app.players.find(x => x.playerId === 2).attr.name}</h4>
                            <StyledInput>Name:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="name"
                                    type="text"
                                    data-player={2}
                                    value={state.app.players.find(x => x.playerId === 2).attr.name}
                                />
                            </StyledInput>
                            <StyledInput>Big:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="big"
                                    type="range"
                                    min={filters.big.min}
                                    max={filters.big.max}
                                    data-player={2}
                                    value={state.app.players.find(x => x.playerId === 2).attr.big}
                                />
                            </StyledInput>
                            <StyledInput>Tall:&nbsp;&nbsp;
                                <input
                                    onChange={handleAttrChange}
                                    name="tall"
                                    type="range"
                                    min={filters.tall.min}
                                    max={filters.tall.max}
                                    data-player={2}
                                    value={state.app.players.find(x => x.playerId === 2).attr.tall}
                                />
                            </StyledInput>
                        </div>
                    </RowWrapper>
                    <SelectButton to={ROUTES.PLAY}>Start</SelectButton>
                </ColumnWrapper>
            </>
        )
    }
    return (
        <ContentWrapper>
            <h2>Player Config</h2>
            { renderSelectControls() }
        </ContentWrapper>
    )
};

export default PlayerSelect;