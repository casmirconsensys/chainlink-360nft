import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import FixedTransparentNavbar from "components/Navbars/FixedTransparentNavbar.js";
import MainNavBar from "components/Navbars/MainNavBar.js";
import Footer from "components/Footers/Footer.js";

const loginGoogle = async () => {
  axios.get(`http://localhost:5001/api/auth/google`);

  // const res = await axios.get(`http://localhost:5001/api/auth/google`, {
  //   crossdomain: true,
  // });
  // console.log(res);
  // axios.get(`http://localhost:5001/api/auth/google`, {
  //   crossdomain: true,
  // });
  // fetch("http://localhost:5001/api/auth/google", {
  //   method: "GET",
  //   headers: { "Access-Control-Allow-Origin": "*" },
  // });
};

function SignupPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("signup-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("signup-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <FixedTransparentNavbar />
      {/* <MainNavBar /> */}
      <div className="page-header header-filter" filter-color="black">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("assets/img/bg-basketball.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6" lg="4">
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-2_sound-wave"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">
                      Buy and Trade your very own Digikicks
                    </h5>
                    <p className="description">
                      You're one step closer to the future.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons shopping_credit-card"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">
                      Purchase with Credit Card or Crypto
                    </h5>
                    <p className="description">
                      The future is decentralized. Start buying your digital
                      kicks for the cause today.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-1_button-pause"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Sneaker DAO</h5>
                    <p className="description">
                      Keep your tokens in our secure sneaker DAO or transfer the
                      NFTS to your wallet of choice.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="6" lg="4">
                <Card className="card-signup">
                  <CardBody>
                    <CardTitle className="text-center" tag="h4">
                      Register
                    </CardTitle>
                    <div className="social text-center">
                      <Button
                        className="btn-icon btn-round mr-2"
                        color="twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-icon btn-round mr-2"
                        color="google"
                        onClick={loginGoogle}
                        // tag={Link}
                        // to="/api/auth/google"
                      >
                        <i className="fab fa-google"></i>
                      </Button>
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook"></i>
                      </Button>
                      <h5 className="card-description">or be classical</h5>
                    </div>
                    <Form action="" className="form" method="">
                      <InputGroup
                        className={firstFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="fullname"
                          placeholder="First Name..."
                          type="text"
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={lastFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="name"
                          placeholder="Last Name..."
                          type="text"
                          onFocus={() => setLastFocus(true)}
                          onBlur={() => setLastFocus(false)}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={emailFocus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="email"
                          placeholder="Your Email..."
                          type="text"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                        ></Input>
                      </InputGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"></Input>
                          <span className="form-check-sign"></span>I agree to
                          the terms and{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                      <CardFooter className="text-center">
                        <Button
                          className="btn-round"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="lg"
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;
