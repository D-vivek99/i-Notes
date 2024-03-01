import React from 'react';
import { Link } from 'react-router-dom';
import './styles/About.css';

const About = () => {

  return (
    <>
      <div className='container'>
        <div className='container d-flex justify-content-between'>
          <div>
            <h1 id='heading'><strong id="inotes">i</strong>Notes</h1>
            <h3>Your Personal Note-Keeper</h3>
            {/* <p>An online platform where you can maintain all your personal notes at one place privately and securely. You can easily create, edit, or delete any note.</p>  */}
            <p>
              Welcome to iNotes, 
              
              Designed with simplicity and productivity in mind, iNotes empowers you to capture, organize, and access your ideas effortlessly, whether you're on the go or at your desk.
            </p>
            <p>
              With intuitive features and a sleek interface, iNotes offers a seamless note-taking experience across all your devices. From jotting down quick thoughts to drafting detailed plans, our app provides the tools you need to bring your ideas to life.
            </p>
            <div className="text-center my-5">
              {localStorage.getItem("token")? <Link className="btn btn-outline-primary btn-md" to="/" role="button">Add new Note</Link>: <Link className="btn btn-outline-primary btn-md" to="/login" role="button">Login Now</Link>}
            </div>
          </div>
          <img src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg" className='mx-2' alt="..." id='img1'/>
        </div>

        <br />

        <div className='container d-flex my-5'>
          <img className='' src="https://img.freepik.com/premium-vector/illustration-man-working-presentation-business-work_922925-100.jpg" alt="..." id='img2'/>
          <div className='my-5'>
            <div className="text-center"><h3>Key Features:</h3></div>
            <ol className='mt-3'>
              <li> <span> Effortless Note-Taking:</span> Quickly jot down notes, lists and more with ease.</li>
              <li> <span> Organization Made Simple:</span> Organize your notes into customizable notebooks, tags, and categories for easy retrieval.</li>
              <li> <span> Sync Across Devices:</span> Seamlessly access your notes from your smartphone, tablet, or computer, ensuring you're always connected to your ideas.</li>
              <li> <span> Privacy and Security:</span> Rest assured knowing your notes are securely stored and protected with encryption and privacy controls.</li>
            </ol>
          </div>
        </div>

        <hr />

        <p className='my-4 text-center'>
          <i>Whether you're a student, professional, or creative thinker, iNotes is your go-to solution for staying organized, productive, and inspired. Join the millions of users who trust iNotes to bring their ideas to life, anytime, anywhere. Start your note-taking journey today with iNotes and discover a world of possibilities at your fingertips.</i>
        </p>
        <p className="text-center">***</p>
        <br />
        <hr />
      </div>
    </>
  )
}

export default About
