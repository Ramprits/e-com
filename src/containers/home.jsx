import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody, Spinner,
  CardTitle, CardSubtitle, Button, InputGroup, InputGroupAddon, InputGroupText, Input
} from 'reactstrap';
import Strapi from 'strapi-sdk-javascript/build/main'
const url = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(url)

class home extends React.Component {

  state = {
    brands: [],
    search: ""
  }

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `
          query {
          brands {
            _id
            name
            description
            image {
              _id
              name
              url
            }
          }
        }
       `
        }
      })
      this.setState({ brands: response.data.brands })
    } catch (error) {
      console.error(error)
    }

  }

  handleChange = (event) => {
    this.setState({ search: event.target.value })
  }

  filteredBrands = ({ search, brands }) => (
    brands.filter(b => (
      b.name.toLowerCase().includes(search.toLowerCase())
      || b.description.toLowerCase().includes(search.toLowerCase())
    ))
  )

  render() {
    const { brands, search } = this.state;
    return (
      <React.Fragment>

        <InputGroup>
          <InputGroupAddon addonType="prepend" >
            Search
          </InputGroupAddon>
          <Input placeholder="search brand" onChange={this.handleChange} />
        </InputGroup>
        <br />
        <div className="row">

          {brands ? this.filteredBrands(this.state).map((b) => (
            <div className="col-md-4 col-xs-12" key={b._id}>
              <Card >
                <CardImg top src={`${url + b.image.url}`} alt={b.name} />
                <CardBody>
                  <CardTitle>{b.name}</CardTitle>
                  <CardText>
                    {b.description.substr(0, 255)}
                  </CardText>
                  <Link color="primary" to={`/${b._id}`} size="sm">More</Link>
                </CardBody>
              </Card></div>

          )) : (
              <Spinner style={{ width: '3rem', height: '3rem', marginLeft: "30rem" }} />
            )}
        </div>
      </React.Fragment>
    )
  }

}


export default home;