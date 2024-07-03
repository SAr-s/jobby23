import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import SimilarJobItemDetails from '../SimilarJobItemDetails'
import './index.css'

class JobItemDetails extends Component {
  state = {isLoading: false, jobData: {}, similarJobData: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const specificJobDetails = fetchedData.job_details
      const similarJobs = fetchedData.similar_jobs
      console.log(specificJobDetails)
      const details = {
        companyLogoUrl: specificJobDetails.company_logo_url,
        companyWebsiteUrl: specificJobDetails.company_website_url,
        employmentType: specificJobDetails.employment_type,
        id: specificJobDetails.id,
        jobDescription: specificJobDetails.jobDescription,
        skills: specificJobDetails.skills,
        lifeAtCompany: specificJobDetails.life_at_company,
        location: specificJobDetails.location,
        packagePerAnnum: specificJobDetails.package_per_annum,
        rating: specificJobDetails.rating,
      }
      console.log(details)

      const SimilarJobDetails = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.jobDescription,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobData: details,
        similarJobData: SimilarJobDetails,
        isLoading: false,
      })
    }
  }

  renderJobDetails = () => {
    const {jobData, similarJobData} = this.state
    return (
      <div className="card">
        <div className="first-part">
          <img src={jobData.companyLogoUrl} alt="" className="image" />
          <div>
            <h1 className="title">{jobData.title}</h1>
            <p className="rating">{jobData.rating}</p>
          </div>
        </div>
        <div>
          <p>{jobData.location}</p>
          <p>{jobData.employmentType}</p>
          <p>{jobData.packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div>
          <h1>Description</h1>
          <p>{jobData.jobDescription}</p>
        </div>
        <div className="skills">
          <h1>Skills</h1>
          {jobData.skills.map(eachItem => (
            <li>
              <img src={eachItem.image_url} alt="" />
              <p>{eachItem.name}</p>
            </li>
          ))}
        </div>
        <div className="life">
          <div>
            <h1>Life at Company</h1>
            <p>{jobData.description}</p>
          </div>
          <ims src={jobData.lifeAtCompany.image_url} alt="" />
        </div>
        {similarJobData.map(eachItem => (
          <SimilarJobItemDetails similarDetails={eachItem} key={eachItem.id} />
        ))}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Navbar />
        {isLoading ? this.renderLoader() : this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
