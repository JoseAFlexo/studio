import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    width: parent.width
    height: 50
    color: "#333333"

    Label {
        anchors.centerIn: parent
        text: title
        font.pointSize: 20
        color: "white"
    }

    property string title: "TopBar"
}
