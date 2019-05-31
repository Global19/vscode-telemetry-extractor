import * as fs from 'fs';
import * as path from 'path';

/**
 * @param {string} outputFile 
 * @param {string} contents 
 * @returns {Promise}
 */
export function writeFile(outputFile: string, contents: string) {
    const directory = path.dirname(outputFile);
    return mkdirp(directory).then((dir: string) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(outputFile, contents, { encoding: 'utf8' }, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    });
}

// copied from https://github.com/Microsoft/vscode/blob/master/src/main.js#L139
function mkdirp(dir: string): any {
    return mkdir(dir)
        .then(null, function (err: any) {
            if (err && err.code === 'ENOENT') {
                var parent = path.dirname(dir);
                if (parent !== dir) { // if not arrived at root
                    return mkdirp(parent)
                        .then(function () {
                            return mkdir(dir);
                        });
                }
            }
            throw err;
        });
}

// copied from https://github.com/Microsoft/vscode/blob/master/src/main.js#L155
function mkdir(dir: string): any {
    return new Promise(function (resolve, reject) {
        fs.mkdir(dir, function (err: any) {
            if (err && err.code !== 'EEXIST') {
                reject(err);
            } else {
                resolve(dir);
            }
        });
    });
}