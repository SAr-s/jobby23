import './index.css'

const SimilarJobItemDetails = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails
  return (
    <li>
      <div className="first-part">
        <img src={companyLogoUrl} alt="" className="image" />
        <div>
          <h1 className="title">{title}</h1>
          <p className="rating">{rating}</p>
        </div>
      </div>
      <div className="description-container">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div>
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItemDetails
