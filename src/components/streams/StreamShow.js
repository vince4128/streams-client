import React, {Component} from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {

        const {id} = this.props.match.params;
        this.buildPlayer();
        
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }

        const {id} = this.props.match.params;

        this.props.fetchStream(id);
        this.player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render(){
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        const {title, description} = this.props.stream;

        return<div>
            <video style={{width:'100%'}} controls ref={this.videoRef}/>
            <h1>{this.props.stream.title}</h1>
            <h5>{this.props.stream.description}</h5>
        </div>;
    }    
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
}

export default connect(
    mapStateToProps,
    {fetchStream}
)(StreamShow);