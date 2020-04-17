import React, {useState, useEffect} from 'react';

import {NativeSelect, FormControl} from '@material-ui/core';
import style from './CountryPicker.module.sass';
import { fetchCountries} from '../../api/index';

const CountryPicker = ({selectedCountry}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries( await fetchCountries());
        }   

        fetchAPI();
    }, [setCountries])

    return (
        <FormControl className={style.formControl} >
            <NativeSelect defaultValue="" onChange={(e) => selectedCountry(e.target.value)}>
                <option value="">Global</option>
                {countries.map(c => (<option value={c} key={c}>{c}</option>))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;