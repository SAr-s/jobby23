import Navbar from '../Navbar'
import './index.css'

const Home = () => (
  <div>
    <Navbar />
    <div className="hero-section">
      <h1 className="heading">Find The Job That Fits your Life</h1>
      <p className="paragraph">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button type="button" className="jobs">
        Find Jobs
      </button>
    </div>
  </div>
)

export default Home
