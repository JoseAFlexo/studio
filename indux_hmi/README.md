# Indux HMI Example

This is a minimal example of a Human-Machine Interface built with PySide6 and QML.
It demonstrates a modular layout inspired by the Indux OS design style.

## Structure
```
indux_hmi/
├── main.py
├── backend.py
├── qml/
│   ├── main.qml
│   └── components/
│       ├── Sidebar.qml
│       ├── StatusPanel.qml
│       ├── AlertCard.qml
│       └── TopBar.qml
├── resources/
│   └── logo.png
├── styles/
│   └── theme.qml
```

Run `python main.py` to launch the interface.
