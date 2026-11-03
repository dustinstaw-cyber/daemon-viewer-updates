# Release policy after Daemon M2 Tool 1.7.68

The complete tested Windows x64 installer and legacy latest migration route are now v1.7.68. It includes Nachtkrone EXE/setup branding and the authenticated local Admin Nexus. Do not move releases/latest to a patch-only release.

Future routine releases must remain small independently signed DVP file patches with make_latest=false. Discover newer routine versions through the releases list. Preserve all published bytes and owner signatures. Publication checks for the legacy latest route must now expect v1.7.68, replacing the former v1.7.56 baseline.

Retain technical package identity daemon-viewer, Daemon Viewer.exe, com.daemon.viewer, existing userData/Output locations and legacy-compatible public installer/patch filenames. Public names and product branding are Daemon M2 Tool. Do not rebuild or redownload the installer, Electron engine or bundled libraries for ordinary application patches.

Fresh installations must start in Free and English, without user imports, private administrator configuration, license activation, credentials or signing keys. Repair must preserve profiles, licenses, projects and Output. Admin Nexus mutations require the existing authenticated owner session. Its products, coupons and audit are local configuration; no payment or central license server is configured.
