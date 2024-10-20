import "../styles/FavJobs.css"

interface Job {
    companyName: string;
    jobTitle: string;
    imageUrl: string;
  }
  
  const FavJobs = () =>  {
    // Array of job data
    const jobs: Job[] = [
      {
        companyName: 'Meta',
        jobTitle: 'DevOps Engineer',
        imageUrl: 'src/assets/company/360_F_482385584_Dv6qBsdFeUvVZoZSzCCUm09pZv4cnkw4.png',
      },
      {
        companyName: 'Google',
        jobTitle: 'Full Stack Developer',
        imageUrl: 'src/assets/company/Google.png',
      },
      {
        companyName: 'Microsoft',
        jobTitle: 'Data Scientist',
        imageUrl: 'src/assets/company/3.png',
      },
      {
        companyName: 'Infosys',
        jobTitle: 'Back-End Developer',
        imageUrl: 'src/assets/company/infosys-leases-5-lakh-square-feet-in-bengaluru.png',
      },
    ];
  


  return (
    <div>
      <section className="favorite-jobs-section">
        <h2 className="section-title">Favorite Jobs</h2>
        <h3 className="section-subtitle">Right Resource Fit: Find Your Dream Job</h3>
        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <img src={job.imageUrl} alt={job.companyName} className="job-image" />
              <div className="job-info">
                <h4>{job.jobTitle}</h4>
                <p>{job.companyName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FavJobs;
