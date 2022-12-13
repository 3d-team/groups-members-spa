import {OptionModel} from '@/models/page';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Label} from 'recharts';

interface Props {
  data: OptionModel[];
}

const renderCustomizedLabel = (props: any) => {
  const {x, y, width, height, value} = props;
  const radius = 10;

  return (
    <g>
      <text x={x + width / 2} y={y + height / 2 - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle" font-size="1.5em">
        {value}
      </text>
    </g>
  );
};

export default function CustomBarChart({data = []}: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <XAxis dataKey="name" stroke="#fff" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#e8710a" name="Rating">
          <LabelList dataKey="value" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
