/*global google*/
import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  // componentDidMount() {
  //   // Save a reference to the component instance
  //   window.signUpForm = this;

  //   // Check if Google Maps API is already loaded
  //   if (window.google) {
  //     this.initGoogle();
  //   }
  // }

  // initGoogle = () => {
  //   const location = {
  //     lat: 40.000,
  //     lng: -79.000
  //   };

  //   let map;  // Define map here

  //   const options = {
  //     center: location,
  //     zoom: 9
  //   };
  //   if (navigator.geolocation) {
  //     console.log('geolocation here')
  //     navigator.geolocation.getCurrentPosition((loc) => {
  //       location.lat = loc.coords.latitude;
  //       location.lng = loc.coords.longitude;
  //       map = new google.maps.Map(document.getElementById('map'), options);
  //     },
  //       (err) => {
  //         console.log('user clicked no');
  //         map = new google.maps.Map(document.getElementById('map'), options);
  //       }
  //     );
  //   }
  //   else {
  //     console.log('geolocation not supported')
  //     map = new google.maps.Map(document.getElementById("map"), options);
  //   }
  //   var autocomplete = new google.maps.places.Autocomplete(document.getElementById('addressInput'), {
  //     componentRestrictions: { country: ['us'] },
  //     fields: ['geometry', 'name'],
  //     types: ['establishments']
  //   });
  //   autocomplete.addListener("place changed", () => {
  //     const place = autocomplete.getPlace();
  //     new google.maps.Marker({
  //       position: place.geometry.location,
  //       title: place.name,
  //       map: map,
  //     });
  //   });
  // };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch (error) {
      console.error('Sign Up Error:', error);
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="form-parent">
        {/* <div id="map" style={{ height: '1000px', width: '1000px' }}></div> */}
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            {/* <label>Address</label>
            <input id="addressInput" type="text" name="address" required /> */}
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}