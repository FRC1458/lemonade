import { NetworkTablesTopic } from "ntcore-ts-client";
import { Component } from "preact";

interface LimelightProps {
    vfl: NetworkTablesTopic<number>;
    vfr: NetworkTablesTopic<number>;
    vl: NetworkTablesTopic<number>;
    vr: NetworkTablesTopic<number>;
}

export class Limelights extends Component<LimelightProps> {

    constructor (props: LimelightProps) {
        super();
        this.props = props;
        this.state = {
            vfl: this.props.vfl.getValue() ? this.props.vfl.getValue() : 0,
            vfr: this.props.vfr.getValue() ? this.props.vfr.getValue() : 0,
            vl: this.props.vl.getValue() ? this.props.vl.getValue() : 0,
            vr: this.props.vr.getValue() ? this.props.vr.getValue() : 0
        };
    }

    componentDidMount() {
        this.updater = setInterval(() => {
            this.setState({
                vfl: this.props.vfl.getValue() ? this.props.vfl.getValue() : 0,
                vfr: this.props.vfr.getValue() ? this.props.vfr.getValue() : 0,
                vl: this.props.vl.getValue() ? this.props.vl.getValue() : 0,
                vr: this.props.vr.getValue() ? this.props.vr.getValue() : 0
            })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }
    render() {
        const { vfl, vfr, vl, vr } = this.state;
        return (
            <div style="text-align: center;">
                <div>Front Left Limelight: {vfl ? "✅" : "❌"} Front Right Limelight: {vfr ? "✅" : "❌"}</div>
                <div>Right Limelight: {vr ? "✅" : "❌"} Left Limelight: {vl ? "✅" : "❌"}</div>
            </div>
        );
    }
}
