const vscode = require('vscode');
const path = require('path');
const player = require('play-sound')();

let lastPlayed = 0;

function activate(context) {

    console.log("Error Sound Extension Activated ✅");

    const disposable = vscode.languages.onDidChangeDiagnostics(() => {

        const diagnostics = vscode.languages.getDiagnostics();

        diagnostics.forEach(([uri, diagnosticList]) => {

            diagnosticList.forEach(diagnostic => {

                if (
                    diagnostic.severity === vscode.DiagnosticSeverity.Error &&
                    Date.now() - lastPlayed > 3000
                ) {
                    lastPlayed = Date.now();
                    playErrorSound(context);
                }

            });

        });

    });

    // ✅ VERY IMPORTANT
    context.subscriptions.push(disposable);
}

function playErrorSound(context) {

    const soundPath = path.join(
        context.extensionPath,
        'sounds',
        'error2.mp3'   // ← your file name from screenshot
    );
    player.play(soundPath, (err) => {
        if (err) console.log("Sound Error:", err);
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};