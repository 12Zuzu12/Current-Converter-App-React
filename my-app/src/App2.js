import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Input, Select, Button,  Layout } from 'antd';
import { Link } from 'react-router-dom';


const { Option } = Select;
const { Header, Content, Footer } = Layout;

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [convert, setConvert] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('RUB');

  function  handleAmountChange(event) {
    setAmount(event.target.value);
  }

  async function axiosResponse () {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`);
    const value = response.data.rates[currencyTo]
    let currentSum = Number(amount) * Number(value)
    setConvert(currentSum.toFixed(2))
  }

  function handleCurrencyFromChange(value) {
    setCurrencyFrom(value);
  }

  function handleCurrencyToChange(value) {
    setCurrencyTo(value);
  }

  function handleSwapCurrencies() {
    const temp = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(temp);
    setAmount(convert, () => {
      setConvert(amount, axiosResponse);
    });
    setConvert(amount, () => {
      setConvert(convert, axiosResponse);
    });
  }

  function handleConvert() {
    axiosResponse()
  }

  return (

    <div>
      <Layout>
  <Header>
    <div className="logo">Converter</div>
  </Header>
  <div style={{ marginBottom: '50px', fontSize: '24px' }} >
  <Content style={{  padding: '100px' }}>
  
 
  <Button style={{ backgroundColor: '#16223b', color: 'white', fontWeight: 'bold' , cursor: 'not-allowed', pointerEvents: 'none' }} > From</Button>
  <Input  value={amount} onChange={handleAmountChange} />
  <Button style={{ backgroundColor: '#16223b', color: 'white', fontWeight: 'bold', cursor: 'not-allowed', pointerEvents: 'none' }} > To</Button>
  <Input  value={convert} readOnly />

      <Select  value={currencyFrom} onChange={handleCurrencyFromChange}>
        <Option value="USD">USD</Option>
        <Option value="EUR">EUR</Option>
        <Option value="RUB">RUB</Option>
        <Option value="GBP">GBP</Option>
      </Select>
      <Select value={currencyTo} onChange={handleCurrencyToChange}>
        <Option value="USD">USD</Option>
        <Option value="EUR">EUR</Option>
        <Option value="RUB">RUB</Option>
        <Option value="GBP">GBP</Option>
      </Select>
      <Button onClick={handleSwapCurrencies}>Swap</Button>
      <Button onClick={handleConvert}>Convert</Button>
    
      </Content>
      </div>
      <div style={{width: '30%', marginLeft: '100px', marginBottom: '10px' }}>
      <Button  className="refresh-button"><Link to="/">Home</Link></Button>
      </div>
      <Footer  style={{padding: 0}}>
     <div className="footer"><h4>Created by a non-profit organication</h4></div>
     </Footer>
     </Layout>
    </div>
  );
}

export default CurrencyConverter;