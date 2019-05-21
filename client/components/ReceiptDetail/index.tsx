import * as React from 'react';
import { match } from 'react-router';

interface ReceiptDetailParams {
  id: string;
}

export interface ReceiptDetailProps {
  match: match<ReceiptDetailParams>;
}

const ReceiptDetail: React.FC<ReceiptDetailProps> = ({ match }: ReceiptDetailProps) => {
  const { id } = match.params;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default ReceiptDetail;
