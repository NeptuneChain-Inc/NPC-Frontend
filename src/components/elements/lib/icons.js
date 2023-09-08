import { faChartSimple, faHourglassHalf, faLeaf, faMoneyBill1, faQuestion, faSackDollar, faWallet } from '@fortawesome/free-solid-svg-icons';

const getIcon = (icon) => {
  switch (icon) {
    case 'wallet':
      return faWallet
    case 'money-bill-1':
      return faMoneyBill1
    case 'sack-dollar':
      return faSackDollar
    case 'hourglass-half':
      return faHourglassHalf
    case 'chart-simple':
      return faChartSimple
    case 'leaf':
      return faLeaf
    default:
      return faQuestion
  }
}

export default getIcon;