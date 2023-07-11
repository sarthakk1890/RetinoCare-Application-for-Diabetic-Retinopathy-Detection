import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HistoryCard from './HistoryCard';
import img from '../images/no_history.png'

const History = () => {
  const [hisFetched, setHisFetched] = useState([]);
  const headingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // fetch history data
  const getHistory = async () => {
    try {
      const hisResponse = await fetch('http://localhost:4000/api/history/fetchhistory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      setHisFetched(await hisResponse.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line
  }, []);

  //Scroll effect on the heading
  useEffect(() => {
    const handleScroll = () => {
      const headingElement = headingRef.current;
      if (headingElement) {
        const scrollSpeed = 0.5;
        const scrollPosition = window.scrollY;
        headingElement.style.transform = `translateX(${scrollPosition * scrollSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); //cleaning the even listner when component is unmounted
    };
  }, []);


  return (
    <>
      <div className="fixed-top" >
        <Navbar />
      </div>
      {hisFetched.length > 0 ? (
        <div>
          <div className='historyPage' style={ hisFetched.length >= 4 ? {} : {height: '100vh'}}>
            <div className="d-flex justify-content-center" >
              <h1 className="text-center scroll-heading" style={{ marginTop: '1em' }} ref={headingRef}>History</h1>
            </div>

            <div className="container hisCards" style={{ marginTop: '1em' }}>
              <div className="row mx-4">

                {hisFetched.map((elements) => (
                  <div className="col-md-3 mx-5 my-4" key={elements._id}>
                    <HistoryCard imgPath={elements.url} imgResult={elements.result} imgDate={elements.date} />
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      ) :
        <div>
          <div className='historyPage' style={{ height: '100vh' }}>

            <div className="d-flex justify-content-center" >
              <h1 className="text-center scroll-heading" style={{ marginTop: '1em' }} ref={headingRef}>History</h1>
            </div>
            <div className="d-flex justify-content-center">
              <img src={img} alt="" style={{ height: '50vh' }} />
            </div>
            <div className="d-flex justify-content-center">
              <p style={{ fontSize: '1.5em', fontFamily:'Times New Roman', fontWeight:'500' }}>You have no history</p>
            </div>

          </div>
        </div>
      }
    </>
  );
};

export default History;
