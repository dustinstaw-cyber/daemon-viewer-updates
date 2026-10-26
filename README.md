<p align="center"><img src="assets/daemon-logo.png" width="144" alt="Daemon Viewer"></p>

# Daemon Viewer

**by Daemon · Windows · Grau-Gold-Werkstatt**

Viewer für Modelle, Texturen, Effekte und Metin2-Karten mit Grau-Gold-Werkstatt.

[**Aktuellen Windows-Installer herunterladen**](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/latest)

## Installation und Updates

1. Lade den Installer aus dem neuesten Release herunter und installiere den Viewer.
2. Wähle beim ersten Start deinen eigenen entpackten Client- oder Map-Ordner.
3. Ab Version 1.6 sucht das Programm beim Start und alle sechs Stunden automatisch nach stabilen Updates und lädt sie herunter.
4. Über **Updates → Installieren & neu starten** bestätigst du die Installation. Speichere vorher deine Kartenänderungen.

Unter **Updates** kannst du auch manuell prüfen und die automatische Suche ausschalten. Updates werden vor der Installation mit der von GitHub gelieferten SHA-256-Prüfsumme verglichen. Einstellungen und eigene Dateien bleiben erhalten.

**Version 1.5 und ältere Fassungen benötigen einmalig den neuen Installer.** Nutzer brauchen für Downloads und Updates kein GitHub-Konto.


## Startanimation

Ab Version 1.6.1 erscheint beim Start das goldene D auf transparentem Hintergrund, begleitet von Goldnebel, feinen Funken und einem schimmernden Schriftzug. Die Animation läuft während des Ladens in 8-Sekunden-Schleifen. Enter oder Escape überspringt sie, sobald der Viewer bereit ist. Grafiken und die Schriftart Cinzel werden lokal mitgeliefert. Seit Version 1.6.2 ist die gesamte Startanimation um 50 Prozent vergrößert; auf kleinen Bildschirmen passt sie sich an den verfügbaren Arbeitsbereich an.

## Voraussetzungen

Windows 10 ab Build 17763 oder Windows 11, 64 Bit. Clientdateien und Maps sind nicht enthalten; sie werden lokal ausgewählt. Für die automatische Update-Suche und Downloads ist eine Internetverbindung erforderlich.

## Darstellung

GR2-Modelle werden in statischer Restpose angezeigt. Die Effektvorschau bildet nicht die vollständige Spiel-Engine nach. Seit Version 1.7.0 werden Kartenobjekte mit aufgelösten GR2-Properties als Modelle dargestellt. Nicht aufgelöste Properties und nicht unterstützte Modelltypen bleiben Positionsmarkierungen.

Dieses öffentliche Repository dient ausschließlich der Verteilung von Installern und Versionshinweisen. Das Projekt-Repository bleibt privat.

## Goldgestaltung

Version 1.6.3 verstärkt die Goldakzente an Rahmen, Schaltflächen, Symbolen und Auswahlzuständen. Eine dunkle Titelleiste mit goldenen Windows-Bedienelementen ergänzt das Schwarz-Gold-Design. Die große transparente Startanimation bleibt erhalten.

## Manuelle Wiedergabe

Ab Version 1.6.4 startet die Asset-Vorschau pausiert bei 0,00 Sekunden, auch nach einem Dateiwechsel. Wiedergabe beginnt erst durch Klick auf „Abspielen“ oder Betätigung der Leertaste. Die goldene Oberfläche und die transparente Startanimation bleiben erhalten.

## Karten-Objektbibliothek

Ab Version 1.6.8 gibt es unter **Karten → Objektbibliothek** einen eigenen Katalog für Mapping-Modelle. Er bietet sieben Hauptkategorien, Untergruppen, Suche, natürliche Sortierung, Vorschaubilder und eine interaktive 3D-Vorschau. ZIP-Pakete werden dort lokal über **Modellpaket hinzufügen** importiert und beim nächsten Start wiederhergestellt. Modellpfade lassen sich kopieren und die Paketdateien im Explorer öffnen. Die importierten Kartenmodelle werden nicht der Asset-Galerie hinzugefügt.

Das Alturi-HD-Paket wurde mit 226 Modellen in 16 Untergruppen geprüft; alle Modell- und Texturreferenzen sind auflösbar. Der Installer enthält keine Clientdateien. Seit Version 1.7.0 ist die Bibliothek direkt in die Karten-Werkstatt integriert; geeignete GR2-Modelle können auf der Karte platziert und bearbeitet werden.

## Karten-Werkstatt 1.7.0

Die neue Grau-Gold-Oberfläche bietet Terrain und Objekte als Werkstatt-Reiter sowie eine Material-/Objektablage unter der Kartenansicht. GR2-Objekte können platziert, ausgewählt, verschoben, gedreht, dupliziert und gelöscht werden – mit 3D-Transformationswerkzeugen, Zahlenfeldern, Raster, Zufallsdrehung und Undo/Redo. W verschiebt, E dreht, F fokussiert und Entf löscht das ausgewählte Objekt.

Gespeicherte Kartenkopien enthalten neu platzierte Modelle, Texturen, Properties und vorhandene zugehörige MDATR-Dateien. Originaldateien bleiben erhalten. Es wird kein externer World Editor eingebunden.

**Dieses Update ist noch kein vollständiger World-Editor-Ersatz.** SpeedTree, vollständige Umgebungs-, Effekt- und Skripteditoren, Kollisionsbearbeitung sowie Schatten-, Minimap- und server_attr-Erzeugung stehen noch aus. Vorhandene MDATR-Dateien werden kopiert; neue Kollisionen werden nicht berechnet.

[Versionshinweise und Installer für 1.7.0](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.0)

## Korrekturupdate 1.7.1: Platzieren und Böden

Eine Modellkarte auswählen aktiviert direkt den Platzierungsmodus. Anschließend auf die Map klicken oder eine Modellkarte auf das Gelände ziehen. F fokussiert ein platziertes Objekt; Escape beendet die Platzierung. Lade- und Fehlerhinweise stehen über der Objektablage.

Unter **Terrain** sind jetzt neun eigene Standardböden direkt verfügbar: Graswiese, trockenes Gras, Moos, Erde, Waldboden, Sand, Kies, Fels und Pflaster. Neue Karten ohne eigenes TextureSet beginnen mit einer Graswiese. Bestehende Karten behalten ihre Materialien. Verwendete Böden werden in Kartenkopien gespeichert. Eigene Texturordner und ZIP-Texturpakete können zusätzlich importiert werden.

Die Standardböden sind eigens erzeugte Materialien; private Client-, Modellpaket- und Map-Dateien werden weiterhin nicht mitgeliefert.

[Installer und Versionshinweise für 1.7.1](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.1)
