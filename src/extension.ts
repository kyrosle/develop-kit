import { DebugSession } from '@vscode/debugadapter';
import * as vscode from 'vscode';
import path from 'node:path';


export function activate(context: vscode.ExtensionContext) {

  var panel: vscode.WebviewPanel;

  const createDebugEditWindow = vscode.commands.registerCommand("code-debugger.debugKit", () => {
    vscode.window.showInformationMessage('-- Attach Debug Console --');

    panel = vscode.window.createWebviewPanel(
      'testWebView', 'DebugView', vscode.ViewColumn.One, {
      enableScripts: true,
      retainContextWhenHidden: true
    });

    const isProduction = context.extensionMode === vscode.ExtensionMode.Production;
    let srcUrl = '';
    if (isProduction) {
      const filePath = vscode.Uri.file(
        path.join(context.extensionPath, 'dist', 'static/js/main.js')
      );
      srcUrl = panel.webview.asWebviewUri(filePath).toString();
    } else {
      srcUrl = 'http://localhost:3000/static/js/main.js';
    }
    panel.webview.html = getWebviewContent(srcUrl);

    const updateWebview = () => {
      panel.webview.html = getWebviewContent(srcUrl);
    };
    updateWebview();
    // const interval = setInterval(updateWebview, 1000);

    // panel.onDidDispose(
    //   () => {
    //     clearInterval(interval);
    //   },
    //   null,
    //   context.subscriptions,
    // );

  });

  context.subscriptions.push(createDebugEditWindow);

  const disposable = vscode.debug.registerDebugAdapterTrackerFactory('*', {
    createDebugAdapterTracker() {
      return {
        onWillReceiveMessage: m => {
          // console.log('>:\n' + JSON.stringify(m));
          // panel.webview.postMessage({ output: m.output });
        },
        onDidSendMessage: m => {
          // console.log('<:\n' + JSON.stringify(m));
          if (m.type === 'event' && m.event === 'output') {
            panel.webview.postMessage({ output: m.body.output });
            // console.log('log: ' + m.body.output);
          }
        }
      };
    }
  });
}

export function deactivate() { }

function getWebviewContent(srcUri: string) {
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>webview-react</title>
    <script defer="defer" src="${srcUri}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>`;
}
