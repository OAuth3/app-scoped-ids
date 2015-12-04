'use strict';

var crypto = require('crypto');
var cipherEncoding = 'base64'; // 'hex'
var cipherType = 'aes-128-cbc'; // 'des-ede3-cbc'
var fauxIv = new Buffer([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

//
// Note: these "ciphers" are meant to produce predictable always-identical output from a given input
// they are also intended to be fast, not slow
// they are used for the purpose of ciphering ids, but they still need to function as ids (not random)
//
module.exports.decipher = module.exports.decipher = function (crypted, secret) {
  var secbuf =  crypto.createHash('sha1').update(secret).digest().slice(0, 16);
  var decipherer = crypto.createDecipheriv(cipherType, secbuf, fauxIv);
  var decrypted;

  crypted = crypted
    .replace(/\-/g, '+') // Convert '-' to '+'
    .replace(/\_/g, '/') // Convert '_' to '/'
    ;

  try {
    decrypted = decipherer.update(crypted, cipherEncoding, 'utf8') + decipherer.final('utf8');
  } catch(e) {
    //console.error('[e] id.decipher');
    //console.error(e.stake);
    return null;
  }

  return decrypted;
};

module.exports.cipher = module.exports.cipher = function (val, secret) {
  // TODO require the caller to change any string to a buffer so that all entropy is preserved
  // we cannot reversably detect int, hex, base32, base64, vs utf8 and
  // 24 bytes of base64 is only 16 bytes of binary (8 wasted bytes) and is tell if it has been properly decoded
  var secbuf =  crypto.createHash('sha1').update(secret).digest().slice(0, 16);
  var cipherer = crypto.createCipheriv(cipherType, secbuf, fauxIv);
  var crypted;

  try {
    crypted = (cipherer.update(val.toString(), 'utf8', cipherEncoding) + cipherer.final(cipherEncoding))
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, '') // Remove ending '='
      ;
  } catch(e) {
    //console.error('[e] id.cipher');
    //console.error(e);
    return null;
  }

  return crypted;
};
