import { getBatman, getRobin, getSupport, getCaptain } from '../../api/supportRepository';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Batman } from '../../assets/batman.svg';
import { ReactComponent as Robin } from '../../assets/robin.svg';
import { ReactComponent as Captain } from '../../assets/captain.svg';
import { Container } from 'react-bootstrap';
import './Support.css';

export const SupportDevelopers = ({ uid }) => {
  const [batman, setBatman] = useState(null);
  const [robin, setRobin] = useState(null);
  const [captain, setCaptain] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        let support = await getSupport(uid);

        if (support) {
          let batman = await getBatman(uid);
          let robin = await getRobin(uid);
          let captain = await getCaptain(uid);
          setBatman(batman);
          setRobin(robin);
          setCaptain(captain);
        }
      })();
    }
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="support-container">
        <Batman className="support-icon" />
        <h4>{batman}</h4>
        <Robin className="support-icon" />
        <h4>{robin}</h4>
        <Captain className="support-icon" />
        <h4>{captain}</h4>
      </Container>
    </React.Fragment>
  );
};
