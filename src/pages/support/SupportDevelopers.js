import { getBatman, getRobin, getSupport } from '../../api/supportRepository';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Batman } from '../../assets/batman.svg';
import { ReactComponent as Robin } from '../../assets/robin.svg';
import { Container } from 'react-bootstrap';
import './Support.css';

const SupportDevelopers = ({ uid }) => {
  const [batman, setBatman] = useState(null);
  const [robin, setRobin] = useState(null);
  const [renderSupport, setRenderSupport] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        let support = await getSupport(uid);
        setRenderSupport(support);

        if (support) {
          let batman = await getBatman(uid);
          let robin = await getRobin(uid);
          setBatman(batman);
          setRobin(robin);
        }
      })();
    }
  }, []);

  return (
    <React.Fragment>
      {renderSupport && (
        <Container fluid className="support-container">
          <Batman className="supporticon" />
          <h5>{batman}</h5>
          <Robin className="support-icon" />
          <h5>{robin}</h5>
        </Container>
      )}
    </React.Fragment>
  );
};

export default SupportDevelopers;
