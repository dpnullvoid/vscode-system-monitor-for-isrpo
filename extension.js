const vscode = require('vscode');
const os = require('os');
const osu = require('os-utils');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let statusBarItem =
      vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = '$(pulse) Monitoreando...';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  function updateStatus() {
    osu.cpuUsage(function(cpuPercent) {
      const totalMem = os.totalmem() / (1024 ** 3);  // GB
      const freeMem = os.freemem() / (1024 ** 3);    // GB
      const usedMem = totalMem - freeMem;
      statusBarItem.text =
          `🖥️ CPU: ${(cpuPercent * 100).toFixed(1)}% | 🧠 RAM: ${
              usedMem.toFixed(1)}/${totalMem.toFixed(1)}GB`;
    });
  }

  let interval = setInterval(updateStatus, 2000);
  context.subscriptions.push({dispose: () => clearInterval(interval)});
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
