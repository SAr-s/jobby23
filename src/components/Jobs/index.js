import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSearch} from 'react-icons/md'
import JobsCard from '../JobsCard'
import Navbar from '../Navbar'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchActiveOptionId: '',
    salaryRangeActiveOptionId: salaryRangesList[0].salaryRangeId,
    employmentTypesOptionId: employmentTypesList[0].employmentTypeId,
    searchValue: '',
    profileDetails: [],
    jobsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getJobs = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {
      employmentTypesOptionId,
      salaryRangeActiveOptionId,
      searchActiveOptionId,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesOptionId}&minimum_package=${salaryRangeActiveOptionId}&search=${searchActiveOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(jobs_ => ({
        companyLogoUrl: jobs_.company_logo_url,
        employmentType: jobs_.employment_type,
        id: jobs_.id,
        jobDescription: jobs_.job_description,
        location: jobs_.location,
        packagePerAnnum: jobs_.package_per_annum,
        rating: jobs_.rating,
        title: jobs_.title,
      }))
      this.setState({
        jobsList: updatedData,
        isLoading: false,
      })
    }
  }

  getProfileDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        isLoading: false,
      })
    }
  }

  onChangeSearchFilter = event => {
    this.setState({searchValue: event.target.value})
  }

  onChangeSalaryFilter = event => {
    this.setState({salaryRangeActiveOptionId: event}, this.getJobs)
  }

  onChangeEmploymencyFilter = event => {
    this.setState({employmentTypesOptionId: event}, this.getJobs)
  }

  handleSearchFilter = () => {
    const {searchValue} = this.state
    this.setState({searchActiveOptionId: searchValue}, this.getJobs)
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <div>
        <ul>
          {jobsList.map(eachItem => (
            <JobsCard jobData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, profileDetails} = this.state
    return (
      <>
        <Navbar />
        <div className="jobs-main-page">
          <div className="filter-side">
            <div className="profile-container">
              <img src={profileDetails.profileImageUrl} alt="" />
              <h1>{profileDetails.name}</h1>
              <p>{profileDetails.shortBio}</p>
            </div>
            <hr className="line" />
            <div>
              <h1 className="employment-filter-heading">Type of Employment</h1>
              {employmentTypesList.map(eachList => (
                <li key={eachList.employmentTypeId}>
                  <input
                    type="checkbox"
                    id="checkboxCheck"
                    onChange={() =>
                      this.onChangeEmploymencyFilter(eachList.employmentTypeId)
                    }
                  />
                  <label
                    htmlFor="checkboxCheck"
                    className="employment-filter-item"
                  >
                    {eachList.label}
                  </label>
                </li>
              ))}
            </div>
            <hr className="line" />
            <div>
              <h1 className="salary-filter-heading">Salary Range</h1>
              {salaryRangesList.map(eachRange => (
                <li key={eachRange.salaryRangeId}>
                  <input
                    type="radio"
                    htmlFor="radioCheck"
                    onChange={() =>
                      this.onChangeSalaryFilter(eachRange.salaryRangeId)
                    }
                  />
                  <label htmlFor="radioCheck" className="salary-filter-item">
                    {eachRange.label}
                  </label>
                </li>
              ))}
            </div>
          </div>

          <div className="non-filter-side">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-filter"
                onChange={this.onChangeSearchFilter}
              />
              <button
                type="button"
                aria-label="Search"
                className="search-button"
                onClick={this.handleSearchFilter}
              >
                <MdSearch className="icon" />
              </button>
            </div>
            {isLoading ? this.renderLoader() : this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
