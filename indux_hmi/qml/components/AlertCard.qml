import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    width: parent.width
    height: 60
    color: "#ff4444"
    radius: 8

    Label {
        anchors.centerIn: parent
        text: alertText
        color: "white"
    }

    property string alertText: "Alert"
}
