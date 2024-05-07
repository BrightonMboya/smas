import axios from "axios";
import * as convert from "xml-js";

class Payments {
  companyToken: string;
  constructor(companyToken: string) {
    this.companyToken = companyToken;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  async getToken(paymentAmount: string) {
    const paymentDate = this.formatDate(new Date());

    let payLoad = `
        <?xml version="1.0" encoding="utf-8"?>
        <API3G>
        <CompanyToken>${this.companyToken}</CompanyToken>
        <Request>createToken</Request>
        <Transaction>
            <PaymentAmount>${paymentAmount}</PaymentAmount>
            <PaymentCurrency>USD</PaymentCurrency>
            <PTL>5</PTL>
        </Transaction>
        <Services>
            <Service>
            <ServiceType>57819</ServiceType>
            <ServiceDescription>Charges for SMAS Saas application</ServiceDescription>
            <ServiceDate>${paymentDate}</ServiceDate>
            </Service>
        </Services>
        </API3G>
        `;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*",
      },
      data: payLoad,
    };
    const xmlToken = await axios.request(config);
    const parsedXml = convert.xml2js(xmlToken.data, { compact: true });

    if (parsedXml["API3G"]["Result"]["_text"] === "000") {
      return {
        status_code: parsedXml["API3G"]["Result"]["_text"],
        token: parsedXml["API3G"]["TransToken"]["_text"],
        transactionToken: parsedXml["API3G"]["TransToken"]["_text"],
        transRef: parsedXml["API3G"]["TransRef"]["_text"],
      };
    } else {
      return {
        status_code: parsedXml["API3G"]["Result"]["_text"],
        token: null,
        error: parsedXml["API3G"]["ResultExplanation"]["_text"],
      };
    }
  }

  async chargeTokenMobile(
    transactionToken: string,
    phoneNumber: string,
    mno: string,
    mnoCountry: string,
  ) {
    const payLoad = `
    <?xml version="1.0" encoding="UTF-8"?>
        <API3G>
        <CompanyToken>${this.companyToken}</CompanyToken>
        <Request>ChargeTokenMobile</Request>
        <TransactionToken>${transactionToken}</TransactionToken>
        <PhoneNumber>${phoneNumber}</PhoneNumber>
        <MNO>${mno}</MNO>
        <MNOcountry>${mnoCountry}</MNOcountry>
        </API3G>
    `;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
      },
      data: payLoad,
    };

    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, {
      compact: true,
      alwaysChildren: true,
    });
    return jsonResponse["API3G"];
  }

  async getServices() {
    const payLoad = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>getServices</Request>
    <CompanyToken>${this.companyToken}</CompanyToken>
    </API3G>
    `;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
      },
      data: payLoad,
    };
    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, {
      compact: true,
      alwaysChildren: true,
    });
    // return jsonResponse;
    return jsonResponse["API3G"]["Services"]["Service"];
  }

  async companyMobilePaymentOptions() {
    const payLoad = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${this.companyToken}</CompanyToken>
    <Request>CompanyMobilePaymentOptions</Request>
    </API3G>
    `;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
      },
      data: payLoad,
    };
    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, {
      compact: true,
      alwaysChildren: true,
    });
    return jsonResponse["API3G"]["paymentoptionsmobile"];
  }
  //   this method below is not working
  async getMobilePaymentOptions(transactionToken: string) {
    const payLoad = `
   <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${this.companyToken}</CompanyToken>
    <Request>GetMobilePaymentOptions</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
    </API3G>
   `;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
      },
      data: payLoad,
    };
    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, {
      compact: true,
      alwaysChildren: true,
    });
    return jsonResponse;
  }

  async chargeTokenCreditCard(
    transactionToken: string,
    cardNumber: string,
    creditCardExpiry: string,
    cvv: string,
    cardHolderName: string,
  ) {
    const payLoad = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${this.companyToken}</CompanyToken>
    <Request>chargeTokenCreditCard</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
    <CreditCardNumber>${cardNumber}</CreditCardNumber>
    <CreditCardExpiry>${creditCardExpiry}</CreditCardExpiry>
    <CreditCardCVV>${cvv}</CreditCardCVV>
    <CardHolderName>${cardHolderName}</CardHolderName>
    <ChargeType></ChargeType>
    </API3G>`;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://secure.3gdirectpay.com/API/v6/",
      headers: {
        "Content-Type": "application/xml",
      },
      data: payLoad,
    };
    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, {
      compact: true,
      alwaysChildren: true,
    });
    return jsonResponse;
  }
}
