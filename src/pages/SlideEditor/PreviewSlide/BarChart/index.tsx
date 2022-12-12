import {OptionModel} from '@/models/page';

interface Props {
  data?: OptionModel[];
}

export default function BarChart({data = []}: Props) {
  return <div>BarChart</div>;
}
