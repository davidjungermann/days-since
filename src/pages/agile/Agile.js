import { getAgile, getDaily, getRetro } from '../../api/agileRepository';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Batman } from '../../assets/batman.svg';
import { ReactComponent as Robin } from '../../assets/robin.svg';
import { ReactComponent as Captain } from '../../assets/captain.svg';
import { Container } from 'react-bootstrap';

export const Agile = ({ uid }) => {
  const [daily, setDaily] = useState(null);
  const [retro, setRetro] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        let support = await getAgile(uid);

        if (support) {
          let daily = await getDaily(uid);
          let retro = await getRetro(uid);
          setDaily(daily);
          setRetro(retro);
        }
      })();
    }
  }, []);

  return (
    <React.Fragment>
      <Container fluid className="support-container">
        <Batman className="support-icon" />
        <h4>{daily}</h4>
        <Robin className="support-icon" />
        <h4>{retro}</h4>
      </Container>
    </React.Fragment>
  );
};
