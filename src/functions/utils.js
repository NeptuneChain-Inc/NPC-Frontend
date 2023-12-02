export const formatLongString = (address, first = 6, last = 4) => {
    if (!address) return '';
    const firstPart = address.slice(0, first);
    const lastPart = address.slice(-last);
    return `${firstPart}...${lastPart}`;
  };

  export function isNotZeroAddress(address) {
    const zeroAddress = '0x0000000000000000000000000000000000000000';
    return address.toLowerCase() !== zeroAddress.toLowerCase();
}