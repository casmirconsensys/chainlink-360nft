import React, { useState } from "react";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardLink,
  CardTitle,
  Collapse,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Carousel,
  CarouselItem,
  CarouselIndicators
} from "reactstrap";

// core components
import MainNavBar from "components/Navbars/MainNavBar.js";
// import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import ProductPageHeader from "components/Headers/ProductPageHeader.js";
import Footer from "components/Footers/Footer.js";
import axios from "axios";

const items = [
  {
    src: "https://sneakrcred.s3-us-west-1.amazonaws.com/ethj.png",
    altText: "",
    caption: ""
  },
  {
    src: "https://sneakrcred.s3-us-west-1.amazonaws.com/ethj.png",
    altText: "",
    caption: ""
  },
  {
    src: "https://sneakrcred.s3-us-west-1.amazonaws.com/ethj.png",
    altText: "",
    caption: ""
  },
  {
    src: "https://sneakrcred.s3-us-west-1.amazonaws.com/ethj.png",
    altText: "",
    caption: ""
  }
];

function ProductPage(props) {
  console.log(props.match.params.tokenId);

  const tokenId = props.match.params.tokenId;

  // carousel states and functions
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [sneakrInfo, setSneakrInfo] = useState([]);

  const searchAsset = async () => {
    const res = await axios.get(
      `https://api.opensea.io/api/v1/asset/0x1EaC31A0B93E81bd093d116f5D36a83Be08f381B/${tokenId}/`
    );
    setSneakrInfo(res.data);
  };
  // console.log(sneakrInfo);

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    // setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  // collapse states and functions
  const [collapses, setCollapses] = React.useState([1]);
  const changeCollapse = collapse => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter(prop => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };
  // select states and functions
  const [colorSelect, setColorSelect] = React.useState(null);
  const [sizeSelect, setSizeSelect] = React.useState(null);

  React.useEffect(() => {
    searchAsset();

    document.body.classList.add("product-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("product-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const {
    name,
    description,
    image_original_url,
    image_url,
    asset_contract,
    current_price,
    traits,
    owner,
    permalink,
    sell_orders,
    collection,
    orders
  } = sneakrInfo;
  let price;
  let currentprice;
  let usdPrice;
  let usd;

  if (orders) {
    currentprice = orders[0].current_price;
    price = currentprice / 1000000000000000000;
  } else {
    price = 0;
  }

  // OpenSea collection price conversion
  if (collection) {
    usdPrice = price * collection.payment_tokens[0].usd_price;
    // Formatting USD price to remove remaining fractions
    usd = usdPrice.toString().substr(0, 5);
  }

  let address;
  let imgUrl;
  if (asset_contract) {
    address = asset_contract.address;
    imgUrl = image_original_url;
  }
  return (
    <>
      <MainNavBar />
      <div className="wrapper">
        <ProductPageHeader />
        <div className="section">
          <Container>
            <Row>
              <Col md="5">
                <img
                  src={image_url}
                  alt="Name"
                  className="d-block img-raised"
                />
              </Col>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className="title">{name}</h2>
                <h5 className="category">{address}</h5>
                <h2 className="main-price">ETH Ξ {price}</h2>
                <h2 className="offer-price">USD ${usd}</h2>
                <div
                  aria-multiselectable={true}
                  className="card-collapse"
                  id="accordion"
                  role="tablist"
                >
                  <Card className="card-plain">
                    <CardHeader id="headingOne" role="tab">
                      <a
                        aria-expanded={collapses.includes(1)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          changeCollapse(1);
                        }}
                      >
                        Description{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(1)}>
                      <CardBody>
                        <p>{description}</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader id="headingTwo" role="tab">
                      <a
                        aria-expanded={collapses.includes(2)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          changeCollapse(2);
                        }}
                      >
                        Designer Information{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(2)}>
                      <CardBody>
                        <p>
                          <i className="now-ui-icons design_palette"></i> Design
                          by{" "}
                          <a target="_blank" href="http://sneakrcred.com/">
                            sneakrcred
                          </a>
                        </p>
                        <p>
                          {" "}
                          <i className="now-ui-icons"></i>Intragram
                        </p>
                        <p>
                          {" "}
                          <i className="now-ui-icons"></i>Twitter
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader id="headingThree" role="tab">
                      <a
                        aria-expanded={collapses.includes(3)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          changeCollapse(3);
                        }}
                      >
                        Traits{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(3)}>
                      <CardBody>
                        {/* <ul>
                          {traits &&
                            traits.map(trait => (
                              <li>
                                {" "}
                                {trait.trait_type} || {trait.value}
                              </li>
                            ))}
                        </ul>
                        {traits && traits.map(item => console.log(item))} */}
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <Row className="justify-content-end">
                  <Button
                    className="mr-3"
                    color="info"
                    href={permalink && permalink}
                    target="_blank"
                  >
                    Buy On OpenSea
                    <i className="now-ui-icons shopping_cart-simple"></i>
                  </Button>
                </Row>
              </Col>
            </Row>
            {/* <div className="section">
              <Row>
                    <Col className="ml-auto mr-auto text-center mr-5" md="8">
                  <h2 className="title">How to wear it</h2>
                  <h4 className="description">
                    You need more information? Check what other persons are
                    saying about our product. They are very happy with their
                    purchase.
                  </h4>
                </Col>
              </Row>
              <div className="section-story-overview">
                <Row>
                  <Col className="ml-auto mr-auto" md="4">
                    <div
                      className="image-container image-left"
                      style={{
                        backgroundImage:
                          "url(https://sneakrcred.s3-us-west-1.amazonaws.com/ethj.png)"
                      }}
                    >
                      <p className="blockquote blockquote-info">
                        "Over the span of the satellite record, Arctic sea ice
                        has been declining significantly, while sea ice in the
                        Antarctichas increased very slightly" <br></br>
                        <br></br>
                        <small>- NOAA</small>
                      </p>
                    </div>
                    <div
                      className="image-container"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg29.jpg") + ")"
                      }}
                    ></div>
                  </Col>
                  <Col className="ml-auto mr-auto" md="4">
                    <div
                      className="image-container image-right"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/pp-4.jpg") + ")"
                      }}
                    ></div>
                    <h3>
                      So what does the new record for the lowest level of winter
                      ice actually mean
                    </h3>
                    <p>
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens with climate change. Even if the
                      Arctic continues to be one of the fastest-warming regions
                      of the world, it will always be plunged into bitterly cold
                      polar dark every winter. And year-by-year, for all kinds
                      of natural reasons, there’s huge variety of the state of
                      the ice.  
                    </p>
                    <p>
                      For a start, it does not automatically follow that a
                      record amount of ice will melt this summer. More important
                      for determining the size of the annual thaw is the state
                      of the weather as the midnight sun approaches and
                      temperatures rise. But over the more than 30 years of
                      satellite records, scientists have observed a clear
                      pattern of decline, decade-by-decade.
                    </p>
                  </Col>
                </Row>
              </div>
            </div> */}
            {/* <div className="features-4">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto text-center" md="8">
                    <h2 className="title">Not convinced yet!</h2>
                    <h4 className="description">
                      Havenly is a convenient, personal and affordable way to
                      redecorate your home room by room. Collaborate with our
                      professional interior designers on our online platform.
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Card
                      className="card-background card-raised"
                      data-background-color=""
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg24.jpg") + ")"
                      }}
                    >
                      <div className="info">
                        <div className="icon icon-white">
                          <i className="now-ui-icons shopping_delivery-fast"></i>
                        </div>
                        <div className="description">
                          <h4 className="info-title">1 Day Delivery</h4>
                          <p>
                            Divide details about your product or agency work
                            into parts. Write a few lines about each one. A
                            paragraph describing a feature will be enough.
                          </p>
                          <a
                            className="ml-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Find more...
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card
                      className="card-background card-raised"
                      data-background-color=""
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg28.jpg") + ")"
                      }}
                    >
                      <div className="info">
                        <div className="icon icon-white">
                          <i className="now-ui-icons business_badge"></i>
                        </div>
                        <div className="description">
                          <h4 className="info-title">Refund Policy</h4>
                          <p>
                            Divide details about your product or agency work
                            into parts. Write a few lines about each one. Very
                            good refund policy just for you.
                          </p>
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Find more...
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card
                      className="card-background card-raised"
                      data-background-color=""
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg25.jpg") + ")"
                      }}
                    >
                      <div className="info">
                        <div className="icon">
                          <i className="now-ui-icons ui-2_favourite-28"></i>
                        </div>
                        <div className="description">
                          <h4 className="info-title">Popular Item</h4>
                          <p>
                            Share a floor plan, and we'll create a visualization
                            of your room. A paragraph describing a feature will
                            be enough. This is a popular item for you.
                          </p>
                          <a
                            className="ml-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Find more...
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
        <div className="section related-products" data-background-color="black">
          <Container>
            <h3 className="title text-center">
              You may also be interested in:
            </h3>
            <Row>
              <Col md="3" sm="6">
                <Card className="card-product">
                  <div className="card-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("assets/img/saint-laurent.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="category text-danger">Trending</h6>
                    <CardTitle tag="h4">
                      <CardLink href="#pablo" onClick={e => e.preventDefault()}>
                        Dolce &amp; Gabbana
                      </CardLink>
                    </CardTitle>
                    <div className="card-description">
                      Dolce &amp; Gabbana's 'Greta' tote has been crafted in
                      Italy from hard-wearing red textured-leather.
                    </div>
                    <CardFooter>
                      <div className="price-container">
                        <span className="price">€1,459</span>
                      </div>
                      <Button
                        className="btn-neutral btn-icon btn-round pull-right"
                        color="default"
                        data-placement="left"
                        id="tooltip963523139"
                      >
                        <i className="now-ui-icons ui-2_favourite-28"></i>
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="left"
                        target="tooltip963523139"
                      >
                        Add to wishlist
                      </UncontrolledTooltip>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3" sm="6">
                <Card className="card-product">
                  <div className="card-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("assets/img/gucci.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="category text-muted">Popular</h6>
                    <CardTitle tag="h4">
                      <CardLink href="#pablo" onClick={e => e.preventDefault()}>
                        Balmain
                      </CardLink>
                    </CardTitle>
                    <div className="card-description">
                      Balmain's mid-rise skinny jeans are cut with stretch to
                      ensure they retain their second-skin fit but move
                      comfortably.
                    </div>
                    <CardFooter>
                      <div className="price-container">
                        <span className="price">€459</span>
                      </div>
                      <Button
                        className="btn-neutral btn-icon btn-round pull-right"
                        color="default"
                        data-placement="left"
                        id="tooltip788385879"
                      >
                        <i className="now-ui-icons ui-2_favourite-28"></i>
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="left"
                        target="tooltip788385879"
                      >
                        Add to wishlist
                      </UncontrolledTooltip>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3" sm="6">
                <Card className="card-product">
                  <div className="card-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("assets/img/wooyoungmi.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="category text-muted">Popular</h6>
                    <CardTitle tag="h4">
                      <CardLink href="#pablo" onClick={e => e.preventDefault()}>
                        Balenciaga
                      </CardLink>
                    </CardTitle>
                    <div className="card-description">
                      Balenciaga's black textured-leather wallet is finished
                      with the label's iconic 'Giant' studs. This is where you
                      can...
                    </div>
                    <CardFooter>
                      <div className="price-container">
                        <span className="price">€559</span>
                      </div>
                      <Button
                        className="btn-neutral btn-icon btn-round pull-right"
                        color="default"
                        data-placement="left"
                        id="tooltip29821793"
                      >
                        <i className="now-ui-icons ui-2_favourite-28"></i>
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="left"
                        target="tooltip29821793"
                      >
                        Add to wishlist
                      </UncontrolledTooltip>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3" sm="6">
                <Card className="card-product">
                  <div className="card-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="img rounded"
                        src={require("assets/img/saint-laurent1.jpg")}
                      ></img>
                    </a>
                  </div>
                  <CardBody>
                    <h6 className="category text-rose">Trending</h6>
                    <CardTitle tag="h4">
                      <CardLink href="#pablo" onClick={e => e.preventDefault()}>
                        Dolce &amp; Gabbana
                      </CardLink>
                    </CardTitle>
                    <div className="card-description">
                      Dolce &amp; Gabbana's 'Greta' tote has been crafted in
                      Italy from hard-wearing red textured-leather.
                    </div>
                    <CardFooter>
                      <div className="price-container">
                        <span className="price">€ 1,359</span>
                      </div>
                      <Button
                        className="btn-neutral btn-icon btn-round pull-right"
                        color="default"
                        data-placement="left"
                        id="tooltip338597952"
                      >
                        <i className="now-ui-icons ui-2_favourite-28"></i>
                      </Button>
                      <UncontrolledTooltip
                        delay={0}
                        placement="left"
                        target="tooltip338597952"
                      >
                        Add to wishlist
                      </UncontrolledTooltip>
                    </CardFooter>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
