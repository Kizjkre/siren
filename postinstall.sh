cp node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js static/ffmpeg/ffmpeg-core.js
cp node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm static/ffmpeg/ffmpeg-core.wasm
cp node_modules/@ffmpeg/ffmpeg/dist/esm/worker.js static/ffmpeg/worker.js
echo -e "0a\nimport './docfix.js';\n.\nw" | ed static/ffmpeg/ffmpeg-core.js
