# Lemonade

Lemonade is a configurable dashboard for FRC developed by Team 1458. 

## Setup

This project uses pynetworktables2js. After cloning, run:
```
pip install -r requirements.txt
python -m pynetworktables2js --dashboard
```

Change the values in `config.json` to match the networktables keys that have the appropriate values.

Currently, this dashboard is optimized for 1458's robot, but it should be quite easy to modify `index.html` to display different components. Future versions of lemonade will likely include more components, as well as modularizing the layout.
