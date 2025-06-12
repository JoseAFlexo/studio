from PySide6.QtCore import QObject, Slot, Signal, Property

class MachineBackend(QObject):
    def __init__(self):
        super().__init__()
        self._status = "Running"
        self._alerts = ["Check pressure", "Lubrication overdue"]

    statusChanged = Signal()
    alertsChanged = Signal()

    @Property(str, notify=statusChanged)
    def status(self):
        return self._status

    @Property("QStringList", notify=alertsChanged)
    def alerts(self):
        return self._alerts

    @Slot()
    def acknowledgeAll(self):
        self._alerts.clear()
        self.alertsChanged.emit()
