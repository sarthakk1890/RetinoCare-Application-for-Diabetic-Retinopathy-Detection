import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import mild from '../images/mild.png';
import { useNavigate } from 'react-router-dom';
import moderate from '../images/moderate.png';
import severe from '../images/severe.png';
import proliferative from '../images/proliferative.png';


const About = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  const [state , setState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
    setState(!state);
  };


  const collapsibles = [
    {
      title:
        <div style={{ fontSize: '2em', fontFamily: 'Times New Roman', marginRight: '10px' }}>
          What is Diabetic Retinopathy ?
        </div>,
      content:
        <div className='about_body_parah'>It is a complication of diabetes that affects the eyes.
          Diabetic retinopathy is caused by damage to the blood vessels in the tissue at the back of the eye (retina). Poorly controlled blood sugar is a risk factor.
          Early symptoms include floaters, blurriness, dark areas of vision and difficulty perceiving colours. Blindness can occur.
          Mild cases may be treated with careful diabetes management. Advanced cases may require laser treatment or surgery.
        </div>,
    },
    {
      title:
        <div style={{ fontSize: '2em', fontFamily: 'Times New Roman', marginRight: '10px' }}>
          Symptoms
        </div>,
      content:
        <div className='about_body_parah'>
          <ul>
            <li>Spots or dark strings floating in your vision (floaters)</li>
            <li>Blurred vision</li>
            <li>Fluctuating vision</li>
            <li>Dark or empty areas in your vision</li>
            <li>Vision loss</li>
          </ul>
        </div>,
    },
    {
      title:
        <div style={{ fontSize: '2em', fontFamily: 'Times New Roman', marginRight: '10px' }}>
          Stages
        </div>,
      content:
        <div className='about_body_parah'>
          <div className="d-flex flex-row">
            <img src={mild} alt="" style={{ height: '20vh', width: '25vh', margin: '0em 2em 2em 0em' }} />
            <div>
              <p><strong>Mild:</strong> <br />
                This is the earliest stage of diabetic retinopathy, characterized by tiny areas of swelling in the blood vessels of the retina. These areas of swelling are known as micro aneurysms.
                Small amounts of fluid can leak into the retina at this stage, triggering swelling of the macula. This is an area near the center of the retina.</p>
            </div>
          </div>

          <div className="d-flex flex-row">
            <img src={moderate} alt="" style={{ height: '20vh', width: '25vh', margin: '0em 2em 2em 0em' }} />
            <div>
              <p><strong>Moderate:</strong> <br />
                Increased swelling of tiny blood vessels starts to interfere with blood flow to the retina, preventing proper nourishment.
                This causes an accumulation of blood and other fluids in the macula.</p>
            </div>
          </div>

          <div className="d-flex flex-row">
            <img src={severe} alt="" style={{ height: '20vh', width: '25vh', margin: '0em 2em 2em 0em'}} />
            <div>
              <p><strong>Severe:</strong> <br />
                A larger section of blood vessels in the retina becomes blocked, causing a significant decrease in blood flow to this area.
                At this point, the body receives signals to start growing new blood vessels in the retina.</p>
            </div>
          </div>

          <div className="d-flex flex-row">
            <img src={proliferative} alt="" style={{ height: '20vh', width: '25vh', margin: '0em 2em 0em 0em ' }} />
            <div>
              <p><strong>Proliferative:</strong> <br />
                This is an advanced stage of the disease, in which new blood vessels form in the retina. Since these blood vessels are often
                fragile, there's a higher risk of fluid leakage. This triggers different vision problems such as blurriness, reduced field of vision, and even blindness.</p>
            </div>
          </div>

        </div>,
    },
    {
      title:
        <div style={{ fontSize: '2em', fontFamily: 'Times New Roman', marginRight: '10px' }}>
          Problems Faced
        </div>,

      content:
        <div className='about_body_parah'>
          <ul>
            <li>Lack of Awareness</li>
            <li>Inaccessibility to Eye Care</li>
            <li>Variability in Symptoms</li>
            <li>Time taking diagnosis</li>
            <li>Complexity of tests cause errors</li>
          </ul>
        </div>,
    },
    {
      title:
        <div style={{ fontSize: '2em', fontFamily: 'Times New Roman', marginRight: '10px' }}>
          About RetinoCare
        </div>,

      content:
        <div className='about_body_parah'>
          <em><strong>RetinoCare</strong></em> is a service made with a vision to provide fast and accurate diagnosis of the Diabetic Retinopathy stage. It takes
          color fundus images as input, then predict the result. The service also allows the user to save the history. The user can access the previous
          nine predictions, that has been saved by him/her. Each user has their unique id which doesn't allow users to access each others history.
          By using RetinoCare medical experts can catch on the stage which the patient is currently suffering from and provide medication according to it, untill
          the laboratory results arrive.
        </div>,
    },

  ];

  

  return (

    <div className='about_main'>

      <div className="fixed-top" >
        <Navbar />
      </div>

      <div className='about_body'>
        <div className="container">
          <h1 className='about_heading text-center' style={{ marginBottom: '10vh' }}>Know More</h1>
          <div className='container'>
            {collapsibles.map((collapsible, index) => (
              <div key={index} className='collapse_element'>
                <button onClick={() => handleToggle(index)} style={{ border: 'none', background: 'none' }}>
                  {collapsible.title}
                </button>
                {activeIndex === index && <div>{collapsible.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About