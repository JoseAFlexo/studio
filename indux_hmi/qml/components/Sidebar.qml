import QtQuick 2.15
import QtQuick.Controls 2.15

Rectangle {
    width: 200
    color: "#1e1e1e"
    anchors.left: parent.left
    anchors.top: parent.top
    anchors.bottom: parent.bottom

    Column {
        spacing: 20
        anchors.centerIn: parent

        Label {
            text: "⚙️ Machine"
            color: "white"
        }
        Label {
            text: "📊 Status"
            color: "white"
        }
        Label {
            text: "🧠 AI Tools"
            color: "white"
        }
    }
}
