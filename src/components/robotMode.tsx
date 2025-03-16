import { NetworkTablesTopic } from "ntcore-ts-client";
import { Component } from "preact";

interface ModeProps {
    mode: NetworkTablesTopic<string>;
}

export class RobotMode extends Component<ModeProps> {

    constructor (props: ModeProps) {
        super();
        this.props = props;
        this.state = {
            mode: this.props.mode.getValue() ? this.props.mode.getValue() : "Disabled"
        };
    }

    componentDidMount() {
        this.updater = setInterval(() => {
            this.setState({
                mode: this.props.mode.getValue() ? this.props.mode.getValue() : "Disabled"
            })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }
    render() {
        const { mode } = this.state;
        return (
            <div style="text-align: center;">
                Game Mode: {mode}    
            </div>
        );
    }
}
