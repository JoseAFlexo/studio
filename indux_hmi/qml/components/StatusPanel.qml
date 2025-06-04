import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    width: 300
    height: 200
    color: "#2d2d2d"
    radius: 16

    Label {
        anchors.centerIn: parent
        text: statusText
        font.pointSize: 24
        color: "lightgreen"
    }

    property string statusText: "Idle"
}
