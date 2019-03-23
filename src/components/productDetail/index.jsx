import React from 'react'
import {
  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap'
import { CalculatedCart, setCart, getCart } from '../../utils';
import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(url)



class ProductDetail extends React.Component {
  state = {
    brand: {},
    brews: [],
    cartItems: []
  }
  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `
        query {
          brand(id: "${this.props.match.params.id}") {
            name
            description
            image {
              url
              name
            }
            brews {
              _id
              name
              description
              price
              image {
                url
                name
              }
            }
          }
        }
      `
        }
      })
      this.setState(
        {
          brew: response.data.brand,
          brews: response.data.brand.brews,
          cartItems: getCart()
        }
      )
    } catch (error) {
      console.error(error.message)
    }

  }

  handleAddToCart = (brew) => {
    const alreadyInCart = this.state.cartItems.findIndex(item => item._id === brew._id);
    if (alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...brew,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems))
    } else {
      const updatedItems = [...this.state.cartItems]
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems))
    }
  }

  handleDeleteCartItem = (deleteCartItem) => {
    const filteredCartItem = this.state.cartItems.filter(item => item._id !== deleteCartItem)
    this.setState({ cartItems: filteredCartItem }, () => setCart(filteredCartItem))
  }
  render() {
    const { brews, cartItems } = this.state;
    return (
      <div>
        <Row>
          {brews.map((brew) => (
            <div>
              <Col xs="12" md="10">
                <Card>
                  <CardImg top height="600" width="200" src={`${url + brew.image.url}`} alt="Card image cap" />
                  <CardBody className="mr-auto">
                    <CardTitle>{brew.name}</CardTitle>
                    <CardSubtitle>${brew.price}</CardSubtitle>
                    <CardText>{brew.description}</CardText>
                    <Button color="primary" size="sm" onClick={() => this.handleAddToCart(brew)}>Add to cart</Button>
                  </CardBody>
                </Card></Col>
              <Col md="2">
                {cartItems && cartItems.length} items selected <br />
                {cartItems && cartItems.map(item => (
                  <div key={item._id}>
                    {item.name} * {item.quantity} - ${(item.price * item.quantity)} <button onClick={() => this.handleDeleteCartItem(item._id)} className="btn btn-danger btn-sm" >Delete</button> <br />
                    Total Price: {CalculatedCart(cartItems)}
                  </div>
                ))}
              </Col>
            </div>
          ))}
        </Row>
      </div>
    )
  }
}

export default ProductDetail;