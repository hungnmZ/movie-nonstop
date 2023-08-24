import fs from 'fs-extra';

const decrypt = function (t) {
  const i = function (t) {
    const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 13;
    return t.replace(/[a-zA-Z]/g, function (t) {
      return String.fromCharCode((t <= 'Z' ? 90 : 122) >= (t = t.charCodeAt(0) + e) ? t : t - 26);
    });
  };

  return atob(i(t, 6));
};

export const decryptFile = async ({ m3u8Path }) => {
  const data = await fs.readFile(m3u8Path, 'utf8');
  const lines = data.split('\n');
  let newData = '';

  for (let line of lines) {
    if (line.startsWith('https://')) {
      var parts = line.split('/');
      var lastSegment = parts.pop();
      var ext = lastSegment.split('.')[1];
      var decryptedName = decrypt(lastSegment.split('.')[0]);
      var newLastSegment = decryptedName + '.' + ext;

      parts.push(newLastSegment);
      var decryptedLine = parts.join('/');

      newData += decryptedLine + '\n';
    } else if (line.startsWith('#EXT-X-KEY')) {
      newData +=
        line.replace(/URI="(.*).key"/, (match, uri) => {
          return `URI="https://ff1.fvv.one/${decrypt(uri)}.key"`;
        }) + '\n';
    } else {
      newData += line + '\n';
    }
  }

  await fs.writeFile(m3u8Path, newData, 'utf8');
};
