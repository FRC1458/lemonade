# Lemonade

Lemonade is a configurable dashboard for FRC developed by Team 1458. 

![Screenshot](/assets/img/demo.webp)

## Setup

This project uses pynetworktables2js. After cloning, run:
```
pip install -r requirements.txt
python -m pynetworktables2js --dashboard
```

Change the values in `config.json` to match the networktables keys that have the appropriate values.

Currently, this dashboard is optimized for 1458's robot, but it should be quite easy to modify `index.html` to display different components. Future versions of lemonade will likely include more components, as well as modularizing the layout.

## Features

The project is targeted towards 1458's robot, so it uses logged NetworkTables value to get data about the robot and display:
- Motor temperatures
- PhotonVision camera statuses
- Driver Cam display
- Robot (estimated) position

The layout is planned to be more modular and customizable, so teams can replace components of the layout with features more pertinent to their robots (e.g. position --> batter voltage over time). Setting auto values and/or other SendableChoosers is also set to be implemented, but this will likely require stepping away from the `pynetworktables2js` library and using a more versatile NT library (likely custom made).

---

Lemonade was partially responsible for 1458's Innovation In Control award at the Contra Costa District Event in 2026. 
