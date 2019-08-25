// @ts-ignore

import baseX from 'base-x';
import * as bip from 'bip39';

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';

function encodeHex(uint8) {
    var hex = '';
    var aux = void 0;
    for (var i = 0; i < uint8.length; i++) {
        aux = uint8[i].toString(16).toUpperCase();
        if (aux.length == 1) aux = '0' + aux;
        hex += aux;
        aux = '';
    }
    return hex;
};

function decodeHex(hex) {
    var length = hex.length / 2 | 0;
    var uint8 = new Uint8Array(length);
    for (var i = 0; i < length; i++) {
        uint8[i] = parseInt(hex.substr(i * 2, 2), 16);
    } return Buffer.from(uint8);
};

function encodeBase64(input){
    return Buffer.from(input).toString('base64');
}

function decodeBase64(base64){
    return Buffer.from(base64, 'base64');
}

function encodeBase58(input){
    return baseX(BASE58).encode(Buffer.from(input));
}

function decodeBase58(base58){
    return baseX(BASE58).decode(base58);
}

function encodeBase36(input){
    return baseX(BASE36).encode(Buffer.from(input));
}

function decodeBase36(base36){
    return baseX(BASE36).decode(base36);
}

function encodeMnemonic(input, lang = 'english'){
    if(!bip.wordlists[lang]) throw new Error('Language not supported.');
    return bip.entropyToMnemonic(encodeHex(input), bip.wordlists[lang]);
}

function decodeMnemonic(mnemonic){
    return decodeHex(bip.mnemonicToEntropy(mnemonic));
}

function decodeString(input){
    let buffer;
    if(input.length === 64){
        buffer = decodeHex(input);
    } else if(input.length === 49 || input.length === 50){
        buffer = decodeBase36(input);
    } else {
        try{
            buffer = decodeBase58(input);
        } catch {
            buffer = decodeBase64(input);
            if(buffer.length !== 32){
                try{
                    buffer = decodeMnemonic(input);
                } catch{
                    buffer = null;
                }
            }
        }
    }
    if(buffer.length !== 32) throw new Error('Invalid key size.')
    return buffer;
} 


export default {
    encodeBase64,
    decodeBase64,
    encodeBase58,
    decodeBase58,
    encodeBase36,
    decodeBase36,
    encodeHex,
    decodeHex,
    encodeMnemonic,
    decodeMnemonic,
    decodeString,
};