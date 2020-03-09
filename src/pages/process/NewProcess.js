// @flow
import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Label
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvRadioGroup,
  AvRadio
} from "availity-reactstrap-validation";
import classnames from "classnames";
import {
  AllCities,
  AllCategories,
  YelpSearchResults,
  YelpEmailResults,
  ValidEmailResults,
  Campaign
} from "./DummyData";
import PageTitle from "../../components/PageTitle";
import SelectWithAllOption from "../../components/SelectWithAllOption";

const TAB_SEARCH_YELP = 0;
const TAB_SCRAPE_YELP = 1;
const TAB_VALIDATE_EMAIL = 2;
const TAB_WOODPECKER_IMPORT = 3;

const tabContents = [
  {
    id: TAB_SEARCH_YELP,
    title: "Search Yelp",
    icon: "mdi mdi-home-variant",
    text: "Search Yelp - Price : 0.25 tokens per thread hour."
  },
  {
    id: TAB_SCRAPE_YELP,
    title: "Scrape Yelp",
    icon: "mdi mdi-account-circle",
    text: "Scrape Yelp - Price : 0.50 tokens per thread hour."
  },
  {
    id: TAB_VALIDATE_EMAIL,
    title: "Validate Email",
    icon: "mdi mdi-settings-outline",
    text: "Validate Email - Price : 0.1 token per validation."
  },
  {
    id: TAB_WOODPECKER_IMPORT,
    title: "Woodpecker Import",
    icon: "mdi mdi-settings-outline",
    text: "Woodpecker Import - Price : 0.01 token per record."
  }
];

class NewProcess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TAB_SEARCH_YELP,
      values: {
        name: "",
        searchmode: "sequential",
        pages: 10,
        rating: 3.5,
        threads: 5
      },
      errors: {},
      cities: [],
      categories: [],
      searchresults: [],
      campaign: []
    };

    this.chooseTab = this.chooseTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCities = this.handleChangeCities.bind(this);
    this.handleChangeCategories = this.handleChangeCategories.bind(this);
    this.handleChangeSearchResults = this.handleChangeSearchResults.bind(this);
    this.handleChangeCampaign = this.handleChangeCampaign.bind(this);
    this.handleStartProcess = this.handleStartProcess.bind(this);
    this.handleScheduleProcess = this.handleScheduleProcess.bind(this);
  }

  // choose tab (to select script)
  chooseTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        searchresults: []
      });
    }
  };

  handleChange = event => {
    event.persist();

    // console.log("handleChange :", event.target.name, event.target.value);

    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      }
    });
  };

  handleChangeCities = cities => {
    this.setState(
      {
        ...this.state,
        cities
      },
      () => {
        console.log("Cities selected: ", this.state.cities);
      }
    );
  };

  handleChangeCategories = categories => {
    this.setState(
      {
        ...this.state,
        categories
      },
      () => {
        console.log("Categories selected: ", this.state.categories);
      }
    );
  };

  handleChangeSearchResults = searchresults => {
    this.setState(
      {
        ...this.state,
        searchresults
      },
      () => {
        console.log("Searchresults selected: ", this.state.searchresults);
      }
    );
  };

  handleChangeCampaign = campaign => {
    this.setState(
      {
        ...this.state,
        campaign
      },
      () => {
        console.log("Campaign selected: ", this.state.campaign);
      }
    );
  };

  handleStartProcess = () => {
    const {
      activeTab,
      cities,
      categories,
      searchresults,
      campaign
    } = this.state;
    const { 
      name, 
      searchmode, 
      pages, 
      rating, 
      threads 
    } = this.state.values;

    let processInfo = null;

    switch (activeTab) {
      case TAB_SEARCH_YELP:
        processInfo = {
          type: TAB_SEARCH_YELP,
          name: name,
          cities: cities,
          categories: categories,
          depth: pages,
          threads: threads,
          searchmode: searchmode
        };
        break;

      case TAB_SCRAPE_YELP:
        processInfo = {
          type: TAB_SCRAPE_YELP,
          name: name,
          searchresults: searchresults,
          rating: rating,
          threads: threads
        };
        break;

      case TAB_VALIDATE_EMAIL:
        processInfo = {
          type: TAB_VALIDATE_EMAIL,
          name: name,
          searchresults: searchresults,
        }
        break;

      case TAB_WOODPECKER_IMPORT:
        processInfo = {
          type: TAB_WOODPECKER_IMPORT,
          name: name,
          searchresults: searchresults,
          campaign: campaign
        }
        break;

      default:
        break;
    }

    console.log("Start Process Information :", processInfo);
  };

  handleScheduleProcess = () => {
    const {
      activeTab,
      cities,
      categories,
      searchresults
    } = this.state;
    const { name, searchmode, pages, rating, threads } = this.state.values;

    let processInfo = null;

    switch (activeTab) {
      case TAB_SEARCH_YELP:
        processInfo = {
          type: TAB_SEARCH_YELP,
          name: name,
          cities: cities,
          categories: categories,
          depth: pages,
          threads: threads,
          searchmode: searchmode
        };
        break;

      case TAB_SCRAPE_YELP:
        processInfo = {
          type: TAB_SCRAPE_YELP,
          name: name,
          searchresults: searchresults,
          rating: rating,
          threads: threads
        };
        break;

      case TAB_VALIDATE_EMAIL:
        break;

      case TAB_WOODPECKER_IMPORT:
        break;

      default:
        break;
    }

    console.log("Schedule Process Information :", processInfo);
  };

  render() {
    const { cities, categories, searchresults, campaign } = this.state;
    const { pages, rating, threads, searchmode } = this.state.values;

    const searchYelpForm = () => {
      return (
        <AvForm>
          <AvGroup className="position-relative">
            <Label for="name">Name</Label>
            <AvField
              name="name"
              id="name"
              type="text"
              onChange={this.handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a process name"
                },
                pattern: {
                  value: "^[A-Za-z0-9 ]+$",
                  errorMessage:
                    "Process name must be composed only with letter and numbers"
                },
                minLength: {
                  value: 6,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                },
                maxLength: {
                  value: 32,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                }
              }}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="cities">Cities</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              allowSelectAll={true}
              placeholder="Select cities"
              value={cities}
              options={AllCities}
              onChange={this.handleChangeCities}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="categories">Categories</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              allowSelectAll={true}
              placeholder="Select categories"
              value={categories}
              options={AllCategories}
              onChange={this.handleChangeCategories}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="pages">Search Depth (pages: 1-100)</Label>
            <AvField
              name="pages"
              id="pages"
              value={pages}
              type="number"
              min={1}
              max={100}
              onChange={this.handleChange}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="threads">Threads (1-20)</Label>
            <AvField
              name="threads"
              id="threads"
              value={threads}
              type="number"
              min={1}
              max={20}
              onChange={this.handleChange}
              required
            />
          </AvGroup>

          <AvRadioGroup
            name="searchmode"
            value={searchmode}
            onChange={this.handleChange}
            required
          >
            <Label for="searchmode">Search Mode</Label>
            <AvRadio value="sequential" label="Sequential" />
            <AvRadio value="randomized" label="Randomized" />
          </AvRadioGroup>

          <div className="button-list">
            <Button
              color="primary"
              type="submit"
              onClick={this.handleStartProcess}
            >
              Start Process
            </Button>
            <Button color="primary" onClick={this.handleScheduleProcess}>
              Schedule Process
            </Button>
          </div>
        </AvForm>
      );
    };

    const scrapeYelpForm = () => {
      // const defaultValues = {
      //   name: "YelpForm Name",
      //   searchresult: "YelpForm SearchResult",
      //   rating: '3.5',
      //   threads: '5'
      // }

      return (
        // <AvForm onSubmit={this.handleSubmit} model={defaultValues}>
        <AvForm>
          <AvGroup className="position-relative">
            <Label for="name">Name</Label>
            <AvField
              name="name"
              id="name"
              type="text"
              onChange={this.handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a process name"
                },
                pattern: {
                  value: "^[A-Za-z0-9 ]+$",
                  errorMessage:
                    "Process name must be composed only with letter and numbers"
                },
                minLength: {
                  value: 6,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                },
                maxLength: {
                  value: 32,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                }
              }}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="searchresults">Yelp Search Result</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              allowSelectAll={true}
              placeholder="Select Yelp Search Result"
              value={searchresults}
              options={YelpSearchResults}
              onChange={this.handleChangeSearchResults}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="rating">Rating (1-5)</Label>
            <AvField
              name="rating"
              id="rating"
              value={rating}
              type="number"
              min={1}
              max={5}
              onChange={this.handleChange}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="threads">Threads (1-20)</Label>
            <AvField
              name="threads"
              id="threads"
              value={threads}
              type="number"
              min={1}
              max={20}
              onChange={this.handleChange}
              required
            />
          </AvGroup>

          <div className="button-list">
            <Button
              color="primary"
              type="submit"
              onClick={this.handleStartProcess}
            >
              Start Process
            </Button>
            <Button color="primary" onClick={this.handleScheduleProcess}>
              Schedule Process
            </Button>
          </div>
        </AvForm>
      );
    };

    const validateEamilForm = () => {
      return (
        <AvForm>
          <AvGroup className="position-relative">
            <Label for="name">Name</Label>
            <AvField
              name="name"
              id="name"
              type="text"
              onChange={this.handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a process name"
                },
                pattern: {
                  value: "^[A-Za-z0-9 ]+$",
                  errorMessage:
                    "Process name must be composed only with letter and numbers"
                },
                minLength: {
                  value: 6,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                },
                maxLength: {
                  value: 32,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                }
              }}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="searchresults">Yelp Scrape Result</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              allowSelectAll={true}
              placeholder="Select Yelp Scrape Result"
              value={searchresults}
              options={YelpEmailResults}
              onChange={this.handleChangeSearchResults}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <div className="button-list">
            <Button
              color="primary"
              type="submit"
              onClick={this.handleStartProcess}
            >
              Start Process
            </Button>
            <Button color="primary" onClick={this.handleScheduleProcess}>
              Schedule Process
            </Button>
          </div>
        </AvForm>
      );
    };

    const woodpeckerImportForm = () => {
      return (
        <AvForm>
          <AvGroup className="position-relative">
            <Label for="name">Name</Label>
            <AvField
              name="name"
              id="name"
              type="text"
              onChange={this.handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a process name"
                },
                pattern: {
                  value: "^[A-Za-z0-9 ]+$",
                  errorMessage:
                    "Process name must be composed only with letter and numbers"
                },
                minLength: {
                  value: 6,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                },
                maxLength: {
                  value: 32,
                  errorMessage:
                    "Process name must be between 6 and 32 characters"
                }
              }}
              required
            />
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="searchresults">Validated Mail Result</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              allowSelectAll={true}
              placeholder="Select Validated Mail Result"
              value={searchresults}
              options={ValidEmailResults}
              onChange={this.handleChangeSearchResults}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <AvGroup className="position-relative">
            <Label for="campaign">Campaign</Label>
            <SelectWithAllOption
              isMulti
              isSearchable
              placeholder="Select Campaign"
              value={campaign}
              options={Campaign}
              onChange={this.handleChangeCampaign}
              className="react-select"
              classNamePrefix="react-select"
            ></SelectWithAllOption>
          </AvGroup>

          <div className="button-list">
            <Button
              color="primary"
              type="submit"
              onClick={this.handleStartProcess}
            >
              Start Process
            </Button>
            <Button color="primary" onClick={this.handleScheduleProcess}>
              Schedule Process
            </Button>
          </div>
        </AvForm>
      );
    };

    return (
      <React.Fragment>
        <PageTitle
          breadCrumbItems={[
            { label: "Process", path: "/process" },
            { label: "Add a Process", path: "/process/new", active: true }
          ]}
          title={"Add a Process"}
        />

        <Row>
          <Col>
            <Card>
              <CardBody>
                {/* <h4 className="header-title mb-3">Default Tabs</h4> */}

                <Nav tabs>
                  {tabContents.map((tab, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          href="#"
                          className={classnames({
                            active: this.state.activeTab === tab.id
                          })}
                          onClick={() => {
                            this.chooseTab(tab.id);
                          }}
                        >
                          <i
                            className={classnames(
                              tab.icon,
                              "d-lg-none",
                              "d-block",
                              "mr-1"
                            )}
                          ></i>
                          <span className="d-none d-lg-block">{tab.title}</span>
                        </NavLink>
                      </NavItem>
                    );
                  })}
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                  {tabContents.map((tab, index) => {
                    return (
                      <TabPane tabId={tab.id} key={index}>
                        <Row>
                          <Col sm="12">
                            <p className="mt-3">{tab.text}</p>
                          </Col>
                        </Row>
                        <Row>
                          <div className="ml-3 container">
                            {tab.id === TAB_SEARCH_YELP && searchYelpForm()}
                            {tab.id === TAB_SCRAPE_YELP && scrapeYelpForm()}
                            {tab.id === TAB_VALIDATE_EMAIL &&
                              validateEamilForm()}
                            {tab.id === TAB_WOODPECKER_IMPORT &&
                              woodpeckerImportForm()}
                          </div>
                        </Row>
                      </TabPane>
                    );
                  })}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default NewProcess;
