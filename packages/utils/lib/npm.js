import axios from 'axios';
import log from './log.js';

function getNpmInfo(npmName) {
    const npmPrefix = 'https://registry.npmjs.org/';
    const url = npmPrefix+npmName;
    return axios.get(url).then(res => {
        try {
            return res.data
        }catch(err) {
            return Promise.reject(err)
        }
    })
}


async function getLastestVersion(npmName) {
    const npmInfo = await getNpmInfo(npmName);
    if(!npmInfo['dist-tags'] || !npmInfo['dist-tags'].latest) {
        log.error('没有latest版本号');
        throw new Error('no version info find');
    }else {
        return npmInfo['dist-tags'].latest
    }
};

export {
    getNpmInfo,
    getLastestVersion,
}