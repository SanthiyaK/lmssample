import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
  const courses = [
    { id: 1, title: "React Fundamentals", instructor: "John Doe", students: 2540 },
    { id: 2, title: "Node.js Backend", instructor: "Jane Smith", students: 1890 },
    { id: 3, title: "MongoDB Mastery", instructor: "Mike Johnson", students: 1450 },
    { id: 4, title: "Full-Stack MERN", instructor: "Sarah Lee", students: 3120 },
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to LearnHub</h1>
          <p>Master modern web development with our comprehensive MERN stack courses</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-large btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-large btn-secondary">
              Log In
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="section-header">
          <h2>Featured Courses</h2>
          <p>Learn from industry experts</p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <span className="course-badge">{course.id}</span>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor}</p>
                <p className="students">{course.students.toLocaleString()} students</p>
              </div>
              <button className="btn btn-small btn-outline">Explore</button>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2>Why Choose LearnHub?</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Learning</h3>
            <p>Structured curriculum designed for efficient skill acquisition</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Community</h3>
            <p>Connect with learners and professionals from around the world</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Certificates</h3>
            <p>Earn recognized certificates upon course completion</p>
          </div>
        </div>
      </section>
    </div>
  )
}
