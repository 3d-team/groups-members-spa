import {OptionModel} from '@/models/page';
import React from 'react';

interface Props {
  data?: OptionModel[];
}

export default function PieChart({data = []}: Props) {
  return <div>PieChart</div>;
}
