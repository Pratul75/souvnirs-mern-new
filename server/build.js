const fs = require("fs");
const path = require("path");

const srcDir = "src";
const distDir = "dist";

function copyFiles(src, dest) {
  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath);
      copyFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyFiles(srcDir, distDir);
