import { getBatman, getRobin } from '../../api/supportRepository';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Batman } from '../../assets/batman.svg';
import { ReactComponent as Robin } from '../../assets/robin.svg';
import { Container } from 'react-bootstrap';
import './Support.css';

const SupportDevelopers = ({}) => {
  const [batman, setBatman] = useState(null);
  const [robin, setRobin] = useState(null);

  useEffect(() => {
    (async () => {
      const batman = await getBatman();
      const robin = await getRobin();
      setBatman(batman);
      setRobin(robin);
    })();
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="support-container">
        <Batman className="supporticon" />
        <h5>{batman}</h5>
        <Robin className="support-icon" />
        <h5>{robin}</h5>
      </Container>
    </React.Fragment>
  );
};

export default SupportDevelopers;
