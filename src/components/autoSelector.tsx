import { NetworkTablesTopic } from "ntcore-ts-client";
import { Component } from "preact";

interface AutoProps {
    mode: NetworkTablesTopic<string>,
    options: NetworkTablesTopic<string[]>
}

export class AutoSelector extends Component<AutoProps> {

    constructor (props: AutoProps) {
        super();
        this.props = props;
        this.state = {
            mode: this.props.mode.getValue() ? this.props.mode.getValue() : "",
            options: this.props.options.getValue() ? this.props.options.getValue() : [""]
        };
    }

    componentDidMount() {
        this.updater = setInterval(() => {
            this.setState({
                mode: this.props.mode.getValue() ? this.props.mode.getValue() : "",
                options: this.props.options.getValue() ? this.props.options.getValue() : [""]
            })
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }


    render() {
        const { mode, options } = this.state;
        return (
            <div style="text-align: center;">
                <select onChange={(e) => this.props.mode.setValue(e.target.value)}>
                    {options.map((option) => {
                        return <option value={option}>{option}</option>;
                    })}
                </select>
            </div>
        );
    }
}
