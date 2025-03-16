import { hydrate, prerender as ssr } from 'preact-iso';
import { useRef, useEffect } from 'preact/hooks';

import { Elevator } from './components/elevator';
import { Limelights } from './components/limelights';
import { RobotMode } from './components/robotMode';

import './style.css';
import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import { Field } from './components/field';

let ntcore = NetworkTables.getInstanceByTeam(1458);

let poseTopic = ntcore.createTopic<number[]>('/SmartDashboard/Robot State/Robot', NetworkTablesTypeInfos.kDoubleArray);
let limelights = [
	ntcore.createTopic<number>('/limelight-frontl/tv', NetworkTablesTypeInfos.kDouble),
	ntcore.createTopic<number>('/limelight-frontr/tv', NetworkTablesTypeInfos.kDouble),
	ntcore.createTopic<number>('/limelight-left/tv', NetworkTablesTypeInfos.kDouble),
	ntcore.createTopic<number>('/limelight-right/tv', NetworkTablesTypeInfos.kDouble)
];

let poseID = poseTopic.subscribe((value) => {
	console.log(`Subscribed to pose topic with ${value[2]} degrees as latest rotation`);
});
let limelightIDs = limelights.map((topic, index) => topic.subscribe((value) => console.log(`Subscribed to limelight ${index} topic with ${value} degrees as latest rotation`)));

let elevatorState = ntcore.createTopic<string>('/SmartDashboard/State', NetworkTablesTypeInfos.kString);
let elevatorID = elevatorState.subscribe((value) => {
	console.log(`Subscribed to elevator state with ${value} as latest state`);
});

let gameMode = ntcore.createTopic<string>("/SmartDashboard/gameMode", NetworkTablesTypeInfos.kString);
let gameID = gameMode.subscribe((value) => {
	console.log(`Subscribed to game mode with ${value} as current game mode.`);
});

export function App() {
	return (
		<main id="main">
			<div id="sidebar">
				<div id="sidebar-top">
					<h1>Lemonade</h1>
				</div>
				<div id="sidebar-middle">
					<Elevator levelTopic={elevatorState} />
				</div>
				<div id="sidebar-bottom">
					<Limelights vfl={limelights[0]} vfr={limelights[1]} vl={limelights[2]} vr={limelights[3]} />
				</div>
			</div>
			<div id="mainbar">
				<div id="mainbar-top">
					<RobotMode mode={gameMode} />
				</div>
				<div id="mainbar-middle">
					<Field RobotPoseTopic={poseTopic} />
				</div>
				<div id="mainbar-bottom"></div>
			</div>
		</main>
	);
}

poseTopic.unsubscribe(poseID);
limelights.forEach((topic, index) => topic.unsubscribe(limelightIDs[index]));
elevatorState.unsubscribe(elevatorID);
gameMode.unsubscribe(gameID);

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
