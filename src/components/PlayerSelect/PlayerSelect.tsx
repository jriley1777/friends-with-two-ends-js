import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as AppActions from '../../actions/application';
import * as Selectors from '../../selectors/index';
import * as Types from '../../types/index';

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

const PlayerSelect = (props: any) => {
    const { username, changePlayerAttribute, getPlayerAttributes } = props;
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
    const handleAttrChange = (e: any) => {
        let target = e.target;
        changePlayerAttribute({
            playerId: Number(target.dataset.player),
            attr: {
                [target.name]: target.value
            }
        })
    }
    useEffect(() => {
        if(username){
            changePlayerAttribute({
                playerId: 1,
                attr: {
                    name: username
                }
            })
        }
    }, [username, changePlayerAttribute])
    const renderSelectControls = () => {
        let playerOne = getPlayerAttributes(1);
        let playerTwo = getPlayerAttributes(2);
        if (!playerOne || !playerTwo) {
            return null;
        }
        return (
          <>
            <ColumnWrapper>
              <RowWrapper>
                <div
                  style={{
                    background: "rgba(255, 255,255, 0.5)"
                  }}
                >
                  <h4>{playerOne.name}</h4>
                  <StyledInput>
                    Name:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="name"
                      type="text"
                      data-player={1}
                      value={playerOne.name}
                    />
                  </StyledInput>
                  <StyledInput>
                    Big:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="big"
                      type="range"
                      min={filters.big.min}
                      max={filters.big.max}
                      data-player={1}
                      value={playerOne.big}
                    />
                  </StyledInput>
                  <StyledInput>
                    Tall:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="tall"
                      type="range"
                      min={filters.tall.min}
                      max={filters.tall.max}
                      data-player={1}
                      value={playerOne.tall}
                    />
                  </StyledInput>
                </div>
                <div
                  style={{
                    background: "rgba(0,0,0, 0.5)"
                  }}
                >
                  <h4>{playerTwo.name}</h4>
                  <StyledInput>
                    Name:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="name"
                      type="text"
                      data-player={2}
                      value={playerTwo.name}
                    />
                  </StyledInput>
                  <StyledInput>
                    Big:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="big"
                      type="range"
                      min={filters.big.min}
                      max={filters.big.max}
                      data-player={2}
                      value={playerTwo.big}
                    />
                  </StyledInput>
                  <StyledInput>
                    Tall:&nbsp;&nbsp;
                    <input
                      onChange={handleAttrChange}
                      name="tall"
                      type="range"
                      min={filters.tall.min}
                      max={filters.tall.max}
                      data-player={2}
                      value={playerTwo.tall}
                    />
                  </StyledInput>
                </div>
              </RowWrapper>
              <SelectButton to={ROUTES.INTRODUCTION}>Start</SelectButton>
            </ColumnWrapper>
          </>
        );
    }
    return (
        <ContentWrapper>
            <h2>Player Config</h2>
            { renderSelectControls() }
        </ContentWrapper>
    )
};

const mapStateToProps = (state: Types.AppState) => ({
  username: Selectors.getUsername(state),
  getPlayerAttributes: Selectors.getPlayerAttributes(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
      changePlayerAttribute: AppActions.changePlayerAttribute
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelect);