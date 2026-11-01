# Release channels after full installer 1.7.56

The complete Windows x64 migration installer is version 1.7.56. Once its publication workflow passes all installation, UI, repair and download integrity checks, GitHub releases/latest points to v1.7.56. This gives older latest-only updaters a complete migration route.

Future routine releases remain small signed DVP file patches, published with make_latest=false. Modern clients discover them through releases?per_page=10. Do not move the legacy latest route to a file-patch-only release and do not replace any published installer, patch, signature or checksum bytes.

Build a new full installer only when explicitly requested or needed for a new migration baseline. Preserve existing user profiles, licenses and Output files on repair. Fresh installations start in Free with English selected; user imports, credentials, administrator configuration and private signing keys must remain outside the installer.

The full installer includes the owner update public key and the separate public license verification key. Both are public verification material. Future full-installer builds must include the immutable files in addition to runtime-files.json; that manifest covers files changed by patches, not all installation dependencies.
