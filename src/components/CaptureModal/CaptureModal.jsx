import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { MdClose, MdFiberManualRecord } from "react-icons/md";
import Processing from '../Processing/Processing';

import snapCapture from '../Processing/sketches/snapCapture';
import * as AppActions from '../../actions/application';
import Context from '../../context';

const ModalWrapper = styled.div`
    background: rgba(0,0,0,0.85);
    cursor: default;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ModalContent = styled.div`
    background: white;
    border-radius: 5px;
    border 1px solid grey;
    min-width: 40%;
    min-height: 40%;
    max-width: 60%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-size: 2rem;
`;

const StyledProcessing = styled(Processing)`
    overflow-y: scroll;
    border-radius: 5px;
    border: 1px solid black;
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;

    > * {
        margin: 1rem;
    }
`;

const CaptureModal = props => {
    const { showModal, handleModalToggle, uploadImage } = props;
    const { state, dispatch } = useContext(Context);
    const [ shouldCapture, setShouldCapture ] = useState(false);

    const handleCapture = () => {
        setShouldCapture(true);
    }
    const handleImageUpload = data => {
      uploadImage(data)
    }

    return showModal ? (
      <ModalWrapper>
        <ModalContent>
          <MdClose
            onClick={handleModalToggle}
            style={{ width: "2rem", marginLeft: "auto", cursor: "pointer" }}
          />
          <div>Take a photo. Be a worm.</div>
          <StyledProcessing
            width={"640px"}
            height={"480px"}
            sketch={snapCapture}
            p5Props={{
              sketchName: "snapCapture",
              closeModal: handleModalToggle,
              createObjectURL: window.URL.createObjectURL,
              handleImageUpload,
              shouldCapture,
              setShouldCapture
            }}
          />
          <Row>
            <button onClick={handleCapture}>
              <MdFiberManualRecord
                style={{ color: "red", width: "2rem", height: "2rem" }}
              />
            </button>
          </Row>
        </ModalContent>
      </ModalWrapper>
    ) : null;
};

export default CaptureModal;