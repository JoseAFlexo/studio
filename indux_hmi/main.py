from PySide6.QtWidgets import QApplication
from PySide6.QtQml import QQmlApplicationEngine
from backend import MachineBackend
import sys

if __name__ == "__main__":
    app = QApplication(sys.argv)

    engine = QQmlApplicationEngine()
    backend = MachineBackend()
    engine.rootContext().setContextProperty("machineBackend", backend)

    engine.load("qml/main.qml")
    if not engine.rootObjects():
        sys.exit(-1)

    sys.exit(app.exec())
