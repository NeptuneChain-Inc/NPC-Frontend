import { useState, useEffect, useRef } from 'react';
import CheckoutForm from './CheckoutForm';
import CustomerInfoForm from './CustomerInfoForm';
import { FaArrowLeft, FaTimes } from 'react-icons/fa'; 
import { FormWrapper, Button } from '../routes/Presale';
import OrderConfirmation from './OrderConfirmation';
import './Payment.css';

function Payment({setIsPaying, lineItems}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutItem, setCheckoutItem] = useState(null);

  const numSteps = 2; // Number of steps in the form slideshow.
  const formRef = useRef(null);

  useEffect(() => {
    if(checkoutItem){
      setCurrentStep(3)
    }
  }, [checkoutItem])

  const exitSteps = () => {
    setIsPaying?.(false);
  };

  const goToNextStep = () => {
    if (currentStep < numSteps) {
      setCurrentStep(currentStep + 1);
      formRef.current.classList.add('slide-left');
      setTimeout(() => {
        formRef.current.classList.remove('slide-left');
      }, 500); // Match CSS animation duration
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      formRef.current.classList.add('slide-right');
      setTimeout(() => {
        formRef.current.classList.remove('slide-right');
      }, 500); // Match CSS animation duration
    }
  };

  const proceedToPayment = (item) => setCheckoutItem(item);

  return (
    <FormWrapper>
      <div className='form-container' ref={formRef}>
        {currentStep === 1 && <CustomerInfoForm onNextClick={goToNextStep} />}
        {currentStep === 2 && <OrderConfirmation onNextClick={proceedToPayment} lineItems={lineItems} />}
        {currentStep === 3 && checkoutItem && (
            <CheckoutForm item={checkoutItem}/>
        )}
      </div>
      <div className='navigation'>
        {currentStep > 1 && (
          <Button className='prev' onClick={goToPreviousStep}>
            <FaArrowLeft /> Prev
          </Button>
        )}

{currentStep < 2 && (
          <Button className='prev' onClick={goToNextStep}>
            <FaArrowLeft /> Next
          </Button>
        )}
        <Button className='next' onClick={exitSteps}>
        <FaTimes />
          </Button>
      </div>
    </FormWrapper>
  );
}

export default Payment;