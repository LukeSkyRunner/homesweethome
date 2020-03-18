import React, { Component } from 'react';
//import ProductItem from './../../components/ProductItem';
import { create as createPurchase } from './../../Services/purchase';

import './style.scss';

class FirstPayment extends Component {
  constructor() {
    super();
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  async handlePurchase() {
    const ids = this.props.cart.map(product => product._id);
    try {
      await createPurchase(ids);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
       <div>
        <h1>Six Months Plan</h1>
        <button onClick={this.handlePurchase}>Purchase</button>
        </div>
        <div>
        <h1>One Year Plan</h1>
        <button onClick={this.handlePurchase}>Purchase</button>
        </div>
        <div>
        <h1>Two Years Plan</h1>
        <button onClick={this.handlePurchase}>Purchase</button>
        </div>
        



        <button onClick={this.handlePurchase}>Purchase</button>
      </div>
    );
  }
}

export default FirstPayment;