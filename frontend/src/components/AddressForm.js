import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Button } from '@mui/material';

const baseUrl = 'http://localhost:8989/api';
const data = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: ''
}

export default function AddressForm() {

  const USER_ID = JSON.parse(localStorage.getItem('userId'));
  const [address, setAddress] = React.useState(data);

  const handleChange = (event) => {
    const { name, value } = event.target
    setAddress({
      ...address,
      [name]: value
    })
  }
  const handleSubmit = () => {
    console.log(address);
    axios.post(`${baseUrl}/v3/addAddress/${USER_ID}`, address).then((response) => {
      console.log(response);
      if (response) {
        alert('Address added successfully!');
        localStorage.setItem('addressId', JSON.stringify(response.data.addressId));
        console.log(JSON.parse(localStorage.getItem('addressId')));
      }
    }).catch(error => {
      if (!error.response) {
        // network error
        console.log('Error: Network Error');
      } else {
        console.log(error.response);
      }
    })
  }
  // React.useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('addressId'))) {
      
  //   }
  // })
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            name="addressLine1"
            onChange={handleChange}
            value={address.addressLine1}
            variant="standard"
          />
          <small id='address_error'></small>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            name="addressLine2"
            onChange={handleChange}
            value={address.addressLine2}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            name="city"
            onChange={handleChange}
            value={address.city}
            variant="standard"
          />
          <small id='city_error'></small>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            label="State/Province/Region"
            fullWidth
            name="state"
            onChange={handleChange}
            value={address.state}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postal_code"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            name="postalCode"
            onChange={handleChange}
            value={address.postalCode}
            variant="standard"
          />
          <small id='postalcode_error'></small>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            name="country"
            onChange={handleChange}
            value={address.country}
            variant="standard"
          />
          <small id='country_error'></small>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" id='checkbox' />}
            label="Use this address for payment details"
          />
          <small id='checkbox_error'></small>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleSubmit}>Save address</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}