/*
	Bitnation Text Strings
	Version 0.3.1
	
	Text strings for use in the UI, and to represent coded values.
	
	Notes:
	- Some strings have both a regular and Title version, one with Title Case the other with Sentence case.
*/

// ========================================
// DEFAULT STRINGS
// ========================================

const defaultStrings = {
	
	//General for UI
	optional: 'Optional',
	options: 'Options',
	fees: 'Fees',
	
	// Navigation
	dashboard: 'Dashboard',
	nations: 'Nations',
	chat: 'Chat',
	wallet: 'Wallet',
	profile: 'Profile',
	
	// Nations
	createNationTitle: 'Create A Nation',
	createNationIntroText: 'Reclaim your sovereignty by creating your own decentralized borderless voluntary nation(DBVN).',
	createNationNationNamePrompt: 'Nation name',
	createNationShortDescPrompt: 'Short description',
	createNationLocationPrompt: 'Nation location',
	createNationRepresentsPrompt: 'Nation represents an existing Earth country',
	createNationCoreFootnote: 'Virtual nations exist only in Pangea. Geographic nations are on Earth.',
	
	// Nations generic strings
	governmentalStructure: 'Governmental structure',
	governmentalStructureTitle: 'Governmental Structure',
	legalCode: 'Legal code',
	
	// Nations Fields
	virtualNationTrue: 'Virtual nation',
	virtualNationFalse: 'Geographical nation',
	
	// Wallet strings
	send: 'Send',
	receive: 'Receive',
	sendTo: 'To',
	receiveFrom: 'From',
	note: 'Note',
	amount: 'Amount',
	fee: 'Fee',
	blockchainAddress: 'Address',
	
	sendCommand: 'Send',
	
}

// ========================================
// Nation Strings
// ========================================
const walletStrings = {
	
	scanQRCodeMsg: 'The sender can scan this QR code with a phone or computer camera to get your wallet address.',
	copyAddressMsg: 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!',
	
}

// ========================================
// Wallet Strings
// ========================================
const nationStrings = {
	scanQRCodeMsg: 'The sender can scan this QR code with a phone or computer camera to get your wallet address.',
	copyAddressMsg: 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!',
}

// ========================================
// LANGUAGE LOCALIZATION STRINGS
// ========================================

const FR = {
	governmentalStructure: 'Structure gouvernementale',
}

// Round currency for screen display. Different currencies might require different treatment.
// currency (string) The code of the currency, e.g. 'ETH' or 'BTC'
// amount (real) The amount of currency to show, e.g. 0.21495893984
// addCurrency (bool) True = format the display string with the currency name (might be different from 'currency', above!)
//                      false = return rounded currency without the name
var showCurrency = (currency, amount, addCurrency) => {
	if (!amount) {
		amount = 0
	}
	// pow is the
	var precision, pattern;
	
	switch (currency) {
		case 'ETH':
			precision = 5;
			pattern = '{amount} ETH';
			break;
		default:
			precision = 5;
	}
	// Current default is ETH, round to 1/10,000
	var factor = Math.pow(10, precision)
	amount = Math.round(amount * factor) / factor
	
	var displayAmount = amount.toFixed(precision);
	if (addCurrency) {
		displayAmount = pattern.replace('{amount}', displayAmount);
	}
	return displayAmount
}

const stringFunctions = {
	showCurrency: showCurrency,
}

const strings = {
	...defaultStrings,
	...walletStrings,
	...nationStrings,
	...stringFunctions,
}

export default strings