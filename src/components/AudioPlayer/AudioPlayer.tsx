import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdPlayArrow, MdPause, MdStop, MdVolumeOff, MdVolumeUp } from 'react-icons/md';

import * as Selectors from '../../selectors/index';
import * as AppActions from '../../actions/application';
import * as Types from '../../types/index';

const StyledAudioPlayer = styled.div.attrs({
    className: 'AudioPlayer'
})`
    display: flex;
    justify-content: center;
    position: absolute;
    left: 47vw;
    padding: 2px;

    > * {
        margin-left: 5px;
        margin-right: 5px;
    }
    > svg {
        &:hover {
            cursor: pointer;
            background: red;
        }
    }
`;

type AudioProps = {
    currentAudioSrc: string,
    autoPlay: boolean,
    loop: boolean,
    setIsAudioPlaying: any
}

const defaultProps = {
    currentAudioSrc: '',
    autoPlay: true,
    loop: true
}

const AudioPlayer = (props: AudioProps ) => {
    const { currentAudioSrc, autoPlay, loop, setIsAudioPlaying} = props;
    const [audio, setAudio]: any = useState(null);
    const [duration, setDuration]: any = useState(0);
    const [currentTime, setCurrentTime]: any = useState(0);
    const [isPlaying, setIsPlaying]: any = useState(false);
    const [timeInterval, setTimeInterval]: any = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    useEffect(() => {
        stopAudio();
        setAudio(new Audio(currentAudioSrc));
    }, [currentAudioSrc]);

    useEffect(() => {
        if(audio){
            audio.loop = loop;
            audio.onloadedmetadata = () => {
                setDuration(audio.duration);
                if(autoPlay){
                    playAudio();
                }
            }
            audio.onplay = () => {
                setIsPlaying(true);
                setTimeInterval(setInterval(() => {
                    setCurrentTime(audio.currentTime);
                }, 500))
            }
        }
    }, [audio]);

    const stopAudio = () => {
        if(audio){
            setIsPlaying(false);
            setIsAudioPlaying(false);
            audio.pause();
            adjustTime(0);
            clearInterval(timeInterval)
        }
    }
    const pauseAudio = () => {
       setIsPlaying(false);
       setIsAudioPlaying(false);
       audio.pause(); 
       clearInterval(timeInterval);
    }
    const playAudio = () => {
        setIsAudioPlaying(true);
        audio.play();
    }
    const toggleMute = () => {
        setIsMuted(!isMuted);
        audio.muted = !isMuted;
    }
    const adjustTime = (time: number) => {
        audio.currentTime = time;
        setCurrentTime(audio.currentTime);
    }

    const renderPlay = () => {
        return isPlaying ? (
          <MdPause onClick={pauseAudio} />
        ) : (
          <MdPlayArrow onClick={playAudio} />
        );
    }

    const renderMute = () => {
        return isMuted ? (
          <MdVolumeOff onClick={toggleMute} />
        ) : (
          <MdVolumeUp onClick={toggleMute} />
        );
    }

    return (
      <StyledAudioPlayer>
        {renderPlay()}
        <MdStop onClick={stopAudio} />
        {renderMute()}
        {/* <input
          type="range"
          min={0}
          max={duration}
          onChange={e => adjustTime(Number(e.target.value))}
          value={currentTime}
        /> */}
      </StyledAudioPlayer>
    );
};
AudioPlayer.defaultProps = defaultProps;

const mapStateToProps = (state: Types.AppState) => ({
    currentAudioSrc: Selectors.getCurrentAudioSrc(state)
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    setIsAudioPlaying: AppActions.setIsAudioPlaying
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);