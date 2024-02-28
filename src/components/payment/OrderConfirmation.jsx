import { useState, useEffect } from 'react';
import { configs } from './configs';
import { colors } from '../../data/styles';
import { logoColors } from '../../styles/colors';

const DISCOUT_PERCENTAGE = 50;

 export const stripe_unitToString = (unit) => String((unit / 100).toFixed(2))

function OrderConfirmation({ onNextClick, lineItems }) {
  const [item, setItem] = useState(null);
  const [payAmount, setPayAmount] = useState(null);
  const { serverUrl } = configs || {};

  //##TO-DO Support for more items later
  const lineItem = lineItems?.[0] || {};

  console.log("lineItem", lineItem, lineItems)

  useEffect(() => {
    const { unit_amount } = item || {};
    if(unit_amount){
        const toPay = unit_amount - ((DISCOUT_PERCENTAGE/100) * unit_amount);
        setPayAmount(toPay);
    }

  }, [item])
  

  useEffect(() => {
    //#REQ# SERVER URL AND PRICE_ID IS DEFINED.
    if(serverUrl && lineItem.priceID){
        fetch(`${serverUrl}/get-stripe-price/${lineItem.priceID}`)
        .then(res => res.json())
        .then(data => {
          console.log('Data', data)
          const { price } = data;
          setItem({
            name: price.nickname,
            unit_amount: price.unit_amount,
            string_amount: stripe_unitToString(price.unit_amount), // Convert from cents to dollars
            currency: price.currency.toUpperCase(),
          });
        })
        .catch(error => console.error("Failed to fetch item details:", error));
    }

    console.log("#REQ# SERVER URL AND PRICE_ID IS DEFINED", serverUrl, lineItem.priceID)
  }, []);

  if (!item) {
    return <div>Loading...</div>; // Ideally, show a better loading state
  }

  const proceedToPayment = () => {
    onNextClick?.({data: item, payAmount})
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Name: {item.name}</p>
      <p>Price: {item.currency} {item.string_amount}</p>
      <p>Purchase is accepted via Stripe.<br/><br/>
        Stripe will retain the card information, 
        whereas we will retain the First and Last Name, Email Address, Quantity, 
        Whether or not purchase is for a business, if so, what the business is named.
        <br/><br/>
        <span style={{color: logoColors.primary}}>During presale, we hold 50% of the payment total. The other 50% will be processed upon the release of our initial supply.</span></p>
      <button onClick={proceedToPayment}>Proceed to Pay {item.currency} {stripe_unitToString(payAmount)}</button>
    </div>
  );
}

export default OrderConfirmation;