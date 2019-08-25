// Type definitions for lumo-utils

declare const util: util;
export = util;

interface util {
    encodeBase64(buffer: BufferSource): string;
    decodeBase64(s: string): BufferSource;
    encodeBase58(buffer: BufferSource): string,
    decodeBase58(s: string): BufferSource,
    encodeBase36(buffer: BufferSource): string,
    decodeBase36(s: string): BufferSource,
    encodeHex(buffer: BufferSource): string,
    decodeHex(s: string): BufferSource,
    encodeMnemonic(buffer: BufferSource, language: string): string,
    decodeMnemonic(s: string): BufferSource,
    decodeString(s: string): BufferSource,
}