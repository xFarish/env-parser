const fs = require('fs');

const parser = (file = '.env', debug = false) => {
    const kv = [];

    const contents = fs.readFileSync(file, 'utf8').trim();
    const contentsArray = contents.split(/\r?\n|\n/)
        .filter(i => i.length)
        .filter(i => /^[^#]/.test(i))
        .filter(line => /=/i.test(line));

    contentsArray.forEach(x => {
        const match = x.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        const key = match[1];

        let value = match[2];
        if (/\'|"/.test(value[0]) && /\'|"/.test(value[value.length - 1])) {
            value = value.slice(1, -1);
        }

        else if (value === 'true' || value === 'false' || value === 'null' || value === 'undefined') {
            if (value === 'true') value = true;
            else if (value === 'false') value = false;
            else if (value === 'null') value = null;
            else value = undefined;
        }

        else if (!isNaN(value) && !isNaN(parseFloat(value))) {
            value = parseFloat(value);
        }

        kv.push([key, value]);
    });

    // DEBUG
    if (debug && debug === true) {
        console.log(kv);
    }

    for (const [key, value] of kv) {
        process.env[key] = value;
    }
}

module.exports = parser;