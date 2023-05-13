import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Layout, Select, Button , Typography, List, Statistic} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Text  } = Typography

let value
function App() {
  const [baseCurrency, setBaseCurrency] = useState('RUB');
  const [currencyRates, setCurrencyRates] = useState({});
  const currenciesToShow = ['USD', 'EUR' , 'RUB', 'GBP'];// При увелечении валют нужно будет добавлять в массив
  const filtrRates = currenciesToShow.filter((e) => e !== baseCurrency) //Исключаю базовую валюту
  const currentFiltrRates = useRef(filtrRates);
  currentFiltrRates.current = filtrRates;
  const handleBaseCurrencyChange = (value)=>{
   
    setBaseCurrency(value)

  }
  const fetchCurrencyRates = async () => {
      
    const rates = await Promise.all(
      filtrRates.map(async (currency) => {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
        return response.data.rates;
      }))
  
 
    console.log(rates, 'DATA')
    setCurrencyRates(rates);

  };
  useEffect(() => {
    fetchCurrencyRates();
  }, [baseCurrency, currentFiltrRates]);

  useEffect(() => { // Делает запрос каждую минуту 
    fetchCurrencyRates();

    const interval = setInterval(() => {
      fetchCurrencyRates();
    }, 60000); 

    return () => clearInterval(interval);
  }, [baseCurrency, currentFiltrRates]);

 const handleRefreshClick = () => {
  fetchCurrencyRates()
  }
  let cur =  typeof currencyRates !== 'undefined' && currencyRates.length > 0 ? value = currentFiltrRates.current.map((rate) => {
    const rateValue = currencyRates[currentFiltrRates.current.indexOf(rate)][baseCurrency];
    return `${rate} = ${rateValue}  `;
  }): ''; // перебирает валюту и возвращает номинал и стоимость 
  

  return (
    <Layout>
       <Header>
        <div className="logo">Currency Converter</div>
      </Header>

      <Content style={{  padding: '100px' }}>
      
        <div className="base-currency">
          <Select value={baseCurrency} onChange={handleBaseCurrencyChange}>
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
            <Option value="RUB">RUB</Option>
            <Option value="GBP">GBP</Option>
            {/* Добавьте другие валюты */}
          </Select>
        </div>
        <List
      header={<Text strong style={{ fontSize: '35px', color: '#16223b' }}>{'Currency rates'}</Text>}
      dataSource={[baseCurrency]}
      renderItem={currency  => (
        <List.Item>
          <Statistic
            title=""
            value={ Array.isArray(value) ? value.join(", ") : ''}
            precision={2}
            suffix=''
          />
        </List.Item>
      )}
    />        
        <div className="refresh-button">
          <Button onClick={handleRefreshClick}>Обновить курсы</Button>
          <Button  className="refresh-button"><Link to="/about">Конвертер валюты</Link></Button>
        </div>
      </Content>

     <Footer  style={{padding: 0}}>
     <div className="footer"><h4>Created by a non-profit organication</h4></div>
     </Footer>
    </Layout>
  );
}

export default App;
