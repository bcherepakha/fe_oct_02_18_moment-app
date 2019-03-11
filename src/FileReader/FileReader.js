import React from 'react';
import PropTypes from 'prop-types';

function fileSelectHandle(files, readFilesHandler) {
    const result = Array.prototype.map.call(files, file => new Promise(resolve => {
        const reader = new FileReader(),
            blob = file.slice(0, file.size);

        reader.onloadend = function(e) {
            if (e.target.readyState === FileReader.DONE) {
                resolve(e.target.result);
            }
        }

        reader.readAsBinaryString(blob);
    }));

    Promise.all(result)
        .then(result => readFilesHandler(result));
}

export default function FileReaderComponent({name='files[]', accept, multiple=false, readFilesHandler}) {
    return <form>
        <input
            type='file'
            accept={accept}
            name={name}
            multiple={multiple}
            onChange={e => fileSelectHandle(e.target.files, readFilesHandler)}/>
        <button type='reset'>Reset</button>
    </form>;
}

FileReaderComponent.propTypes = {
    name: PropTypes.string,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    readFilesHandler: PropTypes.func.isRequired
}
