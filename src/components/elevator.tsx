import { NetworkTablesTopic } from "ntcore-ts-client";
import { Component } from "preact";

interface ElevatorProps {
    levelTopic: NetworkTablesTopic<string>;
}

export class Elevator extends Component<ElevatorProps> {

    constructor (props: ElevatorProps) {
        super();
        this.props = props;
        this.state = {
            level: this.props.levelTopic.getValue() ? this.props.levelTopic.getValue() : "Resting"
        };
    }

    componentDidMount() {
        this.updater = setInterval(() => {
            this.setState({
                level: this.props.levelTopic.getValue() ? this.props.levelTopic.getValue() : "Resting"
            })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }
    render() {
        const { level } = this.state;
        
        const levels = {
            "Resting": 1,
            "L2": 2,
            "L3": 3,
            "L4": 4,
            "AP": 1,
            "A1": 2,
            "A2": 3
        }

        const squareStyle = {
            width: '300px',
            height: '500px',
            backgroundColor: 'transparent',
            backgroundPosition: 'center',
            backgroundSize: '200px',
            backgroundRepeat: 'no-repeat',
            filter: 'invert(1)',
            borderLeft: '10px solid black',
            borderRight: '10px solid black',
            borderTop: '10px solid black',
            borderRadius: '1.5%',
        };

        const levelStyle = {
            width: '300px',
            backgroundColor: 'black',
            height: '125px',
            transform: `translate(0, ${125*(4-levels[level])}px)`,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        };

        const textStyle = {
            textAlign: 'center',
        }

        return (
            <div style={squareStyle}>
                <div style={levelStyle}>
                    <p style={textStyle}>State: {level}</p>
                </div>
            </div>
        );
    }
}
