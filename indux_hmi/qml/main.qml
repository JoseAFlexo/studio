import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15

import "components"
import "../styles/theme.qml" as Theme

ApplicationWindow {
    visible: true
    width: 1200
    height: 700
    title: "Indux HMI Demo"
    color: Theme.background

    Sidebar {
        id: sidebar
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 16
        spacing: 20

        TopBar {
            title: "Dashboard"
        }

        RowLayout {
            spacing: 24
            StatusPanel {
                statusText: machineBackend.status
            }

            ListView {
                model: machineBackend.alerts
                delegate: AlertCard {
                    alertText: modelData
                }
                width: 400
                height: 300
            }
        }

        Button {
            text: "Acknowledge All"
            onClicked: machineBackend.acknowledgeAll()
        }
    }
}
