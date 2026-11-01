[Setup]
AppId={{82F9184C-7044-4A20-90AC-6BEA1623C997}
AppName=Daemon Viewer
AppVersion=1.7.56
AppVerName=Daemon Viewer 1.7.56
AppPublisher=Daemon
AppPublisherURL=https://github.com/dustinstaw-cyber/daemon-viewer-updates
AppUpdatesURL=https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases
DefaultDirName={code:DefaultDirectory}
UsePreviousAppDir=no
DefaultGroupName=Daemon Viewer
DisableProgramGroupPage=yes
DisableDirPage=no
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
MinVersion=10.0.17763
OutputDir=dist
OutputBaseFilename=Daemon_Viewer_Setup_1.7.56_x64
Compression=lzma2/normal
SolidCompression=yes
LZMANumBlockThreads=2
LZMAUseSeparateProcess=yes
LZMADictionarySize=32768
SetupIconFile=D:\Daemon-Viewer-Patch-1.7.40-Test\resources\app\app-icon.ico
UninstallDisplayIcon={app}\resources\app\app-icon.ico
UninstallDisplayName=Daemon Viewer by Daemon
Uninstallable=not IsTestInstall
CreateUninstallRegKey=not IsTestInstall
CloseApplications=yes
CloseApplicationsFilter=Daemon Viewer.exe
RestartApplications=no
WizardStyle=modern
WizardResizable=yes
WizardSizePercent=110
SetupLogging=yes
VersionInfoVersion=1.7.56.0
VersionInfoDescription=Daemon Viewer Full Installer
[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "german"; MessagesFile: "compiler:Languages\German.isl"
[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; Flags: unchecked; Check: not IsTestInstall
[Files]
#include "payload-local.iss"
[Icons]
Name: "{autoprograms}\Daemon Viewer"; Filename: "{app}\Daemon Viewer.exe"; WorkingDir: "{app}"; Check: not IsTestInstall
Name: "{autodesktop}\Daemon Viewer"; Filename: "{app}\Daemon Viewer.exe"; WorkingDir: "{app}"; Tasks: desktopicon; Check: not IsTestInstall
[Registry]
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe"; ValueType: string; ValueName: "FriendlyAppName"; ValueData: "Daemon Viewer"; Flags: uninsdeletekey; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\DefaultIcon"; ValueType: string; ValueData: "{app}\resources\app\app-icon.ico"; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\shell\open\command"; ValueType: string; ValueData: """{app}\Daemon Viewer.exe"" --open ""%1"""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".gr2"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".msm"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".msa"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".mse"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".mde"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".dds"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".tga"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".zip"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".rar"; ValueData: ""; Check: not IsTestInstall
Root: HKCU; Subkey: "Software\Classes\Applications\Daemon Viewer.exe\SupportedTypes"; ValueType: string; ValueName: ".7z"; ValueData: ""; Check: not IsTestInstall
[Run]
Filename: "{app}\Daemon Viewer.exe"; Description: "Launch Daemon Viewer"; WorkingDir: "{app}"; Flags: nowait postinstall skipifsilent; Check: not IsTestInstall
[Code]
function IsTestInstall: Boolean;
begin
  Result := ExpandConstant('{param:DAEMONTEST|0}') = '1';
end;
function DefaultDirectory(Param: String): String;
var Command, Candidate: String; LastQuote: Integer;
begin
  Result := ExpandConstant('{localappdata}\Programs\Daemon Viewer');
  if IsTestInstall then exit;
  if RegQueryStringValue(HKCU, 'Software\Classes\Applications\Daemon Viewer.exe\shell\open\command', '', Command) then begin
    if (Length(Command) > 2) and (Command[1] = '"') then begin
      Delete(Command, 1, 1);
      LastQuote := Pos('"', Command);
      if LastQuote > 0 then begin
        Candidate := ExtractFileDir(Copy(Command, 1, LastQuote - 1));
        if FileExists(Candidate + '\resources\app\package.json') and FileExists(Candidate + '\Daemon Viewer.exe') then Result := Candidate;
      end;
    end;
  end;
end;
function CreateFileW(FileName: String; DesiredAccess, ShareMode, SecurityAttributes, CreationDisposition, FlagsAndAttributes, TemplateFile: LongWord): THandle;
external 'CreateFileW@kernel32.dll stdcall';
function CloseHandle(Handle: THandle): Boolean;
external 'CloseHandle@kernel32.dll stdcall';
function PrepareToInstall(var NeedsRestart: Boolean): String;
var Attempts: Integer; Handle: THandle; Target: String;
begin
  Result := '';
  if ExpandConstant('{param:DAEMONUPDATE|0}') <> '1' then exit;
  Target := ExpandConstant('{app}\Daemon Viewer.exe');
  if not FileExists(Target) then exit;
  for Attempts := 1 to 480 do begin
    Handle := CreateFileW(Target, $40000000, 0, 0, 3, 0, 0);
    if Handle <> THandle(-1) then begin
      CloseHandle(Handle);
      exit;
    end;
    Sleep(250);
  end;
  Result := 'Please close Daemon Viewer completely and run the installer again. Your files have not been removed.';
end;
procedure CurStepChanged(CurStep: TSetupStep);
var Code: Integer;
begin
  if (CurStep = ssDone) and (ExpandConstant('{param:DAEMONUPDATE|0}') = '1') and not IsTestInstall then begin
    if not Exec(ExpandConstant('{app}\Daemon Viewer.exe'), '', ExpandConstant('{app}'), SW_SHOWNORMAL, ewNoWait, Code) then
      Log('Viewer restart failed; Windows error: ' + IntToStr(Code));
  end;
end;
