export const hostDomain = 'http://192.168.0.179:5173/';
export const mumbaiRPC =
  "https://polygon-amoy.g.alchemy.com/v2/xNT0Vs-Kpgg3Lgdlqjd_Qlg9XNQNfl75";
export const alchemyAPI = "xNT0Vs-Kpgg3Lgdlqjd_Qlg9XNQNfl75";
export const blockExplorerTxURL = 'https://amoy.polygonscan.com/tx';
export const contractAddress = '0x11948a80ec36919e7999D54d7f6D7df971814809';
export const contractABI = [
  "function getOwner() view returns (address _owner)",
  "function getTotalSupply() view returns (int256 _totalSupply)",
  "function getTotalDonatedSupply() view returns (int256 _totalDonatedSupply)",
  "function getTotalSold() view returns(int256 _totalSold)",
  "function getTotalCertificates() view returns (int256 _totalCertificates)",
  "function getCertificateById(int256 certificateId) view returns (tuple(int256 id, string buyer, string producer, string verifier, string creditType, int256 balance, int256 price, uint256 timestamp))",
  "function getCreditTypes() view returns(string[] _creditTypes)",
  "function getProducers() view returns (string[] _producers)",
  "function getProducerVerifiers(string producer) view returns (string[] _producerVerifiers)",
  "function getSupply(string producer, string verifier, string creditType) view returns (tuple(int256 issued, int256 available, int256 donated))",
  "function getAccountBalance(string accountID, string producer, string verifier, string creditType) view returns (int256 _accountBalance)",
  "function getAccountTotalBalance(string accountID) view returns (int256 _accountTotalBalance)",
  "function getAccountCertificates(string accountID) view returns (int256[] _accountCertificates)",
  "function isCreditRegistered(string memory creditType) view returns (bool _creditRegistered)",
  "function isProducerRegistered(string producer) view returns (bool _producerRegistered)",
  "function isProducerVerified(string producer, string verifier) view returns (bool _producerVerified)",
  "function issueCredits(string _producer, string _verifier, string _creditType, int256 amount) returns (bool _issued)",
  "function buyCredits(string _accountID, string _producer, string _verifier, string _creditType, int256 amount, int256 price) returns (bool _creditsBought)",
  "function transferCredits(string senderAccountID, string receiverAccountID, string _producer, string _verifier, string _creditType, int256 amount, int256 price) returns (bool _creditsTransferred)",
  "function donateCredits(string _accountID, string _producer, string _verifier, string _creditType, int256 amount) returns (bool _creditsDonated)",
  "function transferOwnership(address newOwner) returns (bool)",
  "event CreditsIssued( string producer, string verifier, string creditType, int256 amount)",
  "event CreditsBought(string accountID, string producer, string verifier, string creditType, int256 amount, int256 price)",
  "event CreditsTransferred(string senderAccountID, string receiverAccountID, string producer, string verifier, string creditType, int256 amount, int256 price)",
  "event CreditsDonated(string accountID, string producer, string verifier, string creditType, int256 amount)",
  "event CertificateCreated(int256 certificateId, string accountID, string producer, string verifier, string creditType, int256 balance)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)"
];

/** Keys => Not to be used in production - Only for testing purposes **/
export const privateKey = "188a696dfbd26bbad9d3602ac3f10787c1ba9036c36544275c0781defe45c165"; // Test Net Only
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51NTLlPFnymUk0uH4vxETrYPfIgizozEwByB2uPCcjZFJhBLR45bYS20M3a7KTI4PTwZKg6eMPDbeOPF1PBQr0OBa000EGQPaAB'; //Test Key
export const MapBoxKey = 'pk.eyJ1IjoiZm9yYW1ha28iLCJhIjoiY2xrMWg0amQzMDIwejNmb3kxdzI3NHA0NyJ9.SGbam3R3secsVpD2G5Kgrg'; //Test Key
export const GoogleMaps_API_KEY = 'AIzaSyAcDSUHQJukOfVZjDGxsbDDlx4sTzB78sg'; //Test Key
export const livepeer_API_KEY = 'ed2bb260-6dc2-431e-a10b-edabd81a14c5';


