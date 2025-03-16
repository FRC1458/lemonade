import { NetworkTablesTopic } from "ntcore-ts-client";
import { Component } from "preact";

interface FieldProps {
    RobotPoseTopic: NetworkTablesTopic<number[]>
}

export class Field extends Component<FieldProps> {

    constructor (props: Field) {
        super();
        this.props = props;
        this.state = {
            RobotPose: this.props.RobotPoseTopic.getValue() ? this.props.RobotPoseTopic.getValue() : [0, 0, 0]
        };
    }

    componentDidMount() {
        this.updater = setInterval(() => {
            this.setState({
                RobotPose: this.props.RobotPoseTopic.getValue() ? this.props.RobotPoseTopic.getValue() : [0, 0, 0]
            })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }
    render() {
        const { RobotPose } = this.state;
        
        const RobotStyle = {
            transform: `translate(${(RobotPose[0]*32.8084)-12}px, ${248-(RobotPose[1]*32.8084)}px) rotate(${RobotPose[2]}deg)`,
            border: '5px solid white',
            width: '24px',
            height: '24px'
        }
        const fieldStyle = {
            backgroundImage: 'url(field.png)',
            backgroundSize: 'cover'
        }

        return (
            <div id="field" style={fieldStyle}>
                <div id="robot" style={RobotStyle}></div>
            </div>
        );
    }
}
