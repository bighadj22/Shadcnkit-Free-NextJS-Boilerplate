import React from 'react';
import { Column, Img, Row, Text } from "@react-email/components";

interface SignatureProps {
  name: string;
  position: string;
  company: string;
}

export const EmailSignature: React.FC<SignatureProps> = ({ name, position, company }) => {
  return (
    <Row style={{ marginTop: '20px', alignItems: 'center' }}>
      <Column style={{ width: '70px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, purple, black)',
          padding: '2px',
          display: 'inline-block'
        }}>
          <Img
            src="https://utfs.io/f/acca5747-b6ef-4a02-ba07-e2fc26ce9b5e-2oo.jpg"
            width="56"
            height="56"
            alt={`${name}'s profile`}
            style={{ borderRadius: '50%', display: 'block' }}
          />
        </div>
      </Column>
      <Column>
        <Text style={{ margin: '0', color: '#4A5568', fontSize: '16px', fontWeight: 'bold' }}>
          Kindest Regards
        </Text>
        <Text style={{ margin: '0', color: '#4A5568', fontSize: '16px', fontWeight: 'bold' }}>
          {name},
        </Text>
        <Text style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
          {position} @ {company}
        </Text>
      </Column>
    </Row>
  );
};

export default EmailSignature;