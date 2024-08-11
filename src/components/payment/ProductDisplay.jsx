/**
 * Product Display Component
 *
 * Purpose: Displays details of display as well as a Map of the product location.
 */
import React from "react";
import MapBox from "../elements/MapBox";
import { CardContent, Flex, InfoBox } from "./styled";
import {presaleProducer} from "./configs";

const ProductDisplay = () => {
  return (
    <>
      <MapBox />

      <InfoBox>
        <CardContent>
          <h3>A farmer near you is selling now</h3>
        </CardContent>
        <CardContent>
          <Flex direction="row" justify="space-between">
            <p>{presaleProducer?.location}</p>
            <p>{presaleProducer?.totalLandArea} acres</p>
          </Flex>
        </CardContent>
        <CardContent>
          <p className="subtext">
            Supplier: {presaleProducer?.producer.toUpperCase()}
          </p>
        </CardContent>

        <CardContent>
          <span className="link">Change farmers...</span>
        </CardContent>
      </InfoBox>

      <span className="disclaimer">
        This is a pre-order for verified impact certificates. Detailed
        information about the farmer and supply will be provided with the launch
        of our marketplace.
      </span>
    </>
  );
};

export default ProductDisplay;
