import React from 'react';

import {Cards , Chart, CountryPicker, Loading} from './components'
import style from './App.module.sass';
import { fetchData } from './api/index';

import img from './assets/images/image.png';
import loader from './assets/images/loader.svg';

class App extends React.Component {


    state = {
        data: null,
        country: ''
    }

    async componentDidMount() {
        const data = await fetchData();
        let myData = this.state.data;
        myData = data;
        this.setState({
            data: myData
        })
    }

    selectedCountryHandler = async (country) => {
        const fetchCountryData = await fetchData(country);
        this.setState({data: fetchCountryData, country: country})
    }

    render () {
        const { data, country } = this.state;
        
        return (
            <div>
                {data !== null ? 
                    <div className={style.container}>
                        <h1>COVID-19</h1>
                        <Cards data={data}/>
                        <CountryPicker selectedCountry={this.selectedCountryHandler}/>
                        <Chart country={country} data={data}/>
                    </div>
                 : <Loading />}
            </div>
        )
    }
}



export default App;