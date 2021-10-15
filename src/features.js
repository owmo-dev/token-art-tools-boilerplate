/**
 * Calculate features for the given token data
 * @param {Object} tokenData
 * @param {string} tokenData.tokenId - Unique identifier of the token on its contract.
 * @param {string} tokenData.hash - Unique hash generated upon minting the token.
 */
function calculateFeatures(tokenData) {
    const { tokenId, hash } = tokenData;

    const features = {
        Hash: hash,
    };

    return features;
}

// DO NOT include below this line when uploading to ArtBlocks
export default calculateFeatures;
